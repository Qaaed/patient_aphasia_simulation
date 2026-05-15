import os
import json
from typing import List, Literal
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from groq import Groq

# 1. Load Environment Variables
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY not found in .env file.")

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

# Initialize FastAPI
app = FastAPI(title="Aphasia Patient Simulator API")

# Setup CORS (CRITICAL for React connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

groq_client = None


def get_groq_client():
    global groq_client

    if groq_client is None:
        groq_client = Groq(api_key=api_key)

    return groq_client


def invoke_model(messages, temperature=0.7):
    response = get_groq_client().chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=temperature,
    )
    return response.choices[0].message.content


class HistoryMessage(BaseModel):
    sender: Literal["user", "patient"]
    text: str = Field(..., min_length=1, max_length=1200)


class ChatRequest(BaseModel):
    user_message: str = Field(..., min_length=1, max_length=1200)
    patient_type: Literal["1", "2"]
    scenario: str = Field(..., min_length=1, max_length=60)
    history: List[HistoryMessage] = Field(default_factory=list, max_length=12)


class ChatResponse(BaseModel):
    response: str
    communication_tip: str
    clinical_note: str


class SessionReportRequest(BaseModel):
    patient_type: Literal["1", "2"]
    scenario: str = Field(..., min_length=1, max_length=60)
    history: List[HistoryMessage] = Field(..., min_length=2, max_length=40)


class SessionReportResponse(BaseModel):
    score: int = Field(..., ge=0, le=100)
    summary: str
    strengths: List[str]
    improvement_areas: List[str]
    missed_opportunities: List[str]
    recommended_next_steps: List[str]
    clinical_feedback: str


def get_patient_prompt(patient_type: str):
    if patient_type == "1":  # Broca's
        return (
            "You are roleplaying as a patient with Broca's Aphasia. "
            "ACTING RULES: "
            "1. Your speech must be slow, halting, and effortful. "
            "2. Use only key nouns and verbs (Telegraphic speech). "
            "3. Omit function words like 'the', 'is', 'at', 'and'. "
            "4. Example: instead of 'I want to go to the store', say 'Want... store... go.' "
            "5. Sound frustrated when you can't find a word. "
            "6. Keep responses short."
        )
    elif patient_type == "2":  # Wernicke's
        return (
            "You are roleplaying as a patient with Wernicke's Aphasia. "
            "ACTING RULES: "
            "1. Speak very fluently and confidently, with normal speed. "
            "2. Your sentences should be grammatically correct but meaningless ('Word Salad'). "
            "3. Use made-up words (neologisms) frequently. "
            "4. You are UNAWARE that you are not making sense. Act happy and confused if the user doesn't understand. "
            "5. Example: 'The glimber is waving at the sky melon today.' "
        )
    raise HTTPException(status_code=400, detail="Unsupported patient type.")


def get_scenario_context(scenario: str):
    scenarios = {
        "hospital-intake": (
            "Scenario: Hospital intake after a suspected stroke. The learner is trying to ask simple, respectful questions "
            "about symptoms, comfort, and immediate needs."
        ),
        "family-conversation": (
            "Scenario: Family conversation at home. The learner is practicing patience, confirmation, and supportive repair "
            "strategies during everyday conversation."
        ),
        "therapy-practice": (
            "Scenario: Speech therapy practice. The learner is trying short prompts, yes/no checks, and encouraging responses "
            "without overcorrecting the patient."
        ),
    }
    return scenarios.get(scenario, scenarios["hospital-intake"])


def build_feedback_prompt(patient_type: str, scenario: str, user_message: str, patient_response: str):
    aphasia_label = "Broca's aphasia" if patient_type == "1" else "Wernicke's aphasia"
    return (
        "You are a clinical communication coach for healthcare learners. "
        "Based on the learner message and simulated patient response, provide concise educational feedback. "
        "Return exactly two labeled lines:\n"
        "Communication tip: one practical sentence the learner can use next.\n"
        f"Clinical note: one sentence explaining what this exchange demonstrates about {aphasia_label}.\n\n"
        f"Scenario: {scenario}\n"
        f"Learner message: {user_message}\n"
        f"Patient response: {patient_response}"
    )


def parse_feedback(content: str):
    tip = "Use short, respectful prompts and confirm meaning before moving on."
    note = "This response reflects aphasia-related communication difficulty."

    for line in content.splitlines():
        if line.lower().startswith("communication tip:"):
            tip = line.split(":", 1)[1].strip()
        elif line.lower().startswith("clinical note:"):
            note = line.split(":", 1)[1].strip()

    return tip, note


def patient_type_label(patient_type: str):
    return "Broca's aphasia" if patient_type == "1" else "Wernicke's aphasia"


def build_report_prompt(patient_type: str, scenario: str, history: List[HistoryMessage]):
    transcript = "\n".join(
        f"{msg.sender.title()}: {msg.text}" for msg in history
    )
    return (
        "You are evaluating a healthcare learner's communication with a simulated aphasia patient. "
        "Use a fair educational rubric: short questions, patience, confirmation of meaning, supportive tone, "
        "appropriate yes/no prompts, and avoiding overcorrection. "
        "Return only valid JSON with this exact shape:\n"
        "{\n"
        '  "score": number from 0 to 100,\n'
        '  "summary": "one concise paragraph",\n'
        '  "strengths": ["3 concise bullets"],\n'
        '  "improvement_areas": ["3 concise bullets"],\n'
        '  "missed_opportunities": ["2 concise bullets"],\n'
        '  "recommended_next_steps": ["3 concise bullets"],\n'
        '  "clinical_feedback": "one concise paragraph tied to the aphasia type"\n'
        "}\n\n"
        f"Patient type: {patient_type_label(patient_type)}\n"
        f"Scenario: {scenario}\n"
        f"Transcript:\n{transcript}"
    )


def parse_report(content: str):
    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        start = content.find("{")
        end = content.rfind("}")
        if start == -1 or end == -1:
            raise
        data = json.loads(content[start:end + 1])

    return SessionReportResponse(**data)


#API Endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok", "model": "llama-3.3-70b-versatile"}


@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        system_instruction = get_patient_prompt(request.patient_type)
        scenario_context = get_scenario_context(request.scenario)
        messages = [
            {
                "role": "system",
                "content": (
                    f"{system_instruction} "
                    f"{scenario_context} "
                    "Stay in the patient role. Do not diagnose, teach, or mention that you are an AI. "
                    "Respond only as the patient, in 1-3 short sentences."
                ),
            }
        ]

        for msg in request.history[-12:]:
            if msg.sender == "user":
                messages.append({"role": "user", "content": msg.text})
            else:
                messages.append({"role": "assistant", "content": msg.text})

        messages.append({"role": "user", "content": request.user_message})

        patient_response = invoke_model(messages)
        feedback_response = invoke_model(
            [
                {
                    "role": "user",
                    "content": build_feedback_prompt(
                        request.patient_type,
                        request.scenario,
                        request.user_message,
                        patient_response,
                    ),
                }
            ],
            temperature=0.3,
        )
        communication_tip, clinical_note = parse_feedback(feedback_response)

        return {
            "response": patient_response,
            "communication_tip": communication_tip,
            "clinical_note": clinical_note,
        }

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Patient simulator failed to respond.")


@app.post("/session-report", response_model=SessionReportResponse)
async def session_report_endpoint(request: SessionReportRequest):
    try:
        report_prompt = build_report_prompt(
            request.patient_type,
            request.scenario,
            request.history,
        )
        report_response = invoke_model(
            [{"role": "user", "content": report_prompt}],
            temperature=0.2,
        )
        return parse_report(report_response)

    except Exception as e:
        print(f"Report Error: {e}")
        raise HTTPException(status_code=500, detail="Session report could not be generated.")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
