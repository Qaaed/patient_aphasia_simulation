# Aphasia Patient Simulator

An interactive clinical training simulator for practicing communication with patients who have Broca's or Wernicke's aphasia.

## What It Does

The app gives healthcare learners a guided conversation session:

- choose an aphasia profile
- choose a clinical scenario
- chat with a simulated patient
- receive a short communication tip and clinical note after each exchange
- generate a post-session evaluation report with a score and recommendations

This makes the project more than an AI chat demo: it behaves like a lightweight educational tool for communication training.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: FastAPI, Pydantic, Groq SDK
- Model: Groq-hosted Llama 3.3 70B

## Project Structure

```text
patient_aphasia_simulation/
|-- backend/
|   |-- main.py
|   |-- requirements.txt
|   |-- .env.example
|   `-- .env
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- data/
|   |   |-- services/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
`-- README.md
```

## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env` from the example:

```env
GROQ_API_KEY=your_groq_api_key_here
FRONTEND_ORIGIN=http://localhost:5173
```

Run the API:

```bash
uvicorn main:app --reload
```

Backend URL: `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

Optional frontend environment override:

```env
VITE_API_URL=http://127.0.0.1:8000
```

## API

### `GET /health`

Returns basic backend status.

### `POST /chat`

Request:

```json
{
  "user_message": "Can you tell me how you are feeling?",
  "patient_type": "1",
  "scenario": "hospital-intake",
  "history": [
    { "sender": "patient", "text": "Hello... I am ready." }
  ]
}
```

### `POST /session-report`

Generate a learner evaluation report from the session transcript.

Request:

```json
{
  "patient_type": "1",
  "scenario": "hospital-intake",
  "history": [
    { "sender": "patient", "text": "Hello... I am ready." },
    { "sender": "user", "text": "Can you tell me how you are feeling?" },
    { "sender": "patient", "text": "Feel... tired. Head... hurt." }
  ]
}
```

Response:

```json
{
  "score": 78,
  "summary": "The learner used a supportive tone and asked a clear opening question.",
  "strengths": [
    "Used simple language",
    "Focused on the patient's comfort",
    "Avoided correcting the patient's speech"
  ],
  "improvement_areas": [
    "Use more yes/no questions",
    "Confirm meaning before changing topics",
    "Give the patient more time to respond"
  ],
  "missed_opportunities": [
    "Could have checked pain level with a closed question",
    "Could have summarized the patient's message back"
  ],
  "recommended_next_steps": [
    "Practice supported conversation prompts",
    "Use one question at a time",
    "Confirm understanding before moving forward"
  ],
  "clinical_feedback": "The exchange reflects the need for short, structured prompts when communicating with a patient with Broca's aphasia."
}
```

Response:

```json
{
  "response": "Feel... tired. Head... hurt.",
  "communication_tip": "Use short yes/no follow-up questions and give the patient time to answer.",
  "clinical_note": "This exchange demonstrates effortful, telegraphic speech associated with Broca's aphasia."
}
```

## Development Checks

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend:

```bash
cd backend
python -m py_compile main.py
```

## Notes

This simulator is for education and prototyping. It should not be used as a diagnostic tool or as a replacement for care from a qualified speech-language pathologist or clinician.
