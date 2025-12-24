import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

# 1. Load Environment Variables
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY not found in .env file.")

# Initialize FastAPI
app = FastAPI()

# Setup CORS (CRITICAL for React connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Initialize LLM
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.7,
    api_key=api_key
)


#(What the Frontend sends)
class ChatRequest(BaseModel):
    user_message: str
    patient_type: str
    history: Optional[List[str]] = []


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
    return "You are a helpful assistant."


#API Endpoint
@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # Start with the System Instruction
        system_instruction = get_patient_prompt(request.patient_type)
        messages = [SystemMessage(content=system_instruction)]

        # Add loose context from history
        for msg in request.history:
            messages.append(HumanMessage(content=f"(Previous Context): {msg}"))

        # Add the CURRENT user message
        messages.append(HumanMessage(content=request.user_message))

        # Get response from Groq
        response = llm.invoke(messages)

        return {"response": response.content}

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)