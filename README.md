# Aphasia Patient Simulator

A web-based clinical communication training simulator for practicing conversations with patients who have Broca's or Wernicke's aphasia.

The project combines a React training interface with a FastAPI backend and Groq-hosted Llama model calls. Learners select a patient profile, choose a practice scenario, chat with a simulated patient, receive real-time coaching notes, and generate a post-session evaluation report.

## Highlights

- Scenario-based aphasia conversation practice
- Broca's and Wernicke's aphasia patient profiles
- Real-time simulated patient responses
- Communication tips after each exchange
- Clinical notes explaining aphasia-related behavior
- Post-session evaluation report with score, strengths, improvement areas, missed opportunities, and recommended next steps
- FastAPI request validation with Pydantic models
- Configurable frontend/backend connection through environment variables

## Why This Project Matters

Aphasia can affect speech, comprehension, and conversational confidence after stroke, brain injury, or neurological disease. This simulator gives healthcare learners a safe environment to practice supportive communication strategies before working with real patients.

This is an educational prototype, not a diagnostic or treatment tool.

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, Axios |
| Backend | FastAPI, Pydantic, Groq SDK |
| AI Model | Groq-hosted Llama 3.3 70B |
| Runtime | Python, Node.js |

## Core Workflow

1. Select an aphasia profile: Broca's or Wernicke's.
2. Select a scenario: hospital intake, family conversation, or therapy practice.
3. Send learner messages through the chat interface.
4. Receive simulated patient replies with communication tips and clinical notes.
5. Generate a session evaluation report from the transcript.

## Project Structure

```text
patient_aphasia_simulation/
|-- docker-compose.yml
|-- .dockerignore
|-- backend/
|   |-- Dockerfile
|   |-- main.py
|   |-- requirements.txt
|   |-- .env.example
|   `-- .env
|-- frontend/
|   |-- Dockerfile
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

### Option A: Run With Docker

Docker is the easiest way to run the full app because it starts the React frontend and FastAPI backend together.

Create `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
FRONTEND_ORIGIN=http://localhost:5173
```

Start both services:

```bash
docker compose up --build
```

Open the app:

```text
Frontend: http://localhost:5173
Backend: http://localhost:8000
Health check: http://localhost:8000/health
```

Stop the app:

```bash
docker compose down
```

Run in the background:

```bash
docker compose up -d --build
```

View logs:

```bash
docker compose logs
```

Do not commit `backend/.env`; it contains your Groq API key.

### Option B: Run Without Docker

#### 1. Backend

```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
FRONTEND_ORIGIN=http://localhost:5173
```

Start the backend:

```bash
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend URL:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/health
```

#### 2. Frontend

```bash
cd frontend
npm install
npm.cmd run dev
```

Frontend URL:

```text
http://127.0.0.1:5173
```

Optional frontend environment override:

```env
VITE_API_URL=http://127.0.0.1:8000
```

On Windows PowerShell, use `npm.cmd run dev` if `npm run dev` is blocked by execution policy.

## API Reference

### `GET /health`

Returns backend status.

Example response:

```json
{
  "status": "ok",
  "model": "llama-3.3-70b-versatile"
}
```

### `POST /chat`

Sends a learner message to the simulated patient.

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

Response:

```json
{
  "response": "Feel... tired. Head... hurt.",
  "communication_tip": "Use short yes/no follow-up questions and give the patient time to answer.",
  "clinical_note": "This exchange demonstrates effortful, telegraphic speech associated with Broca's aphasia."
}
```

### `POST /session-report`

Generates a learner evaluation report from the session transcript.

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

## Development Checks

Frontend:

```bash
cd frontend
npm.cmd run lint
npm.cmd run build
```

Backend:

```bash
cd backend
python -m py_compile main.py
python -c "import main; print('imported')"
```

## Resume Bullet

Built an AI-powered aphasia communication simulator with scenario-based patient roleplay, real-time learner coaching, and post-session performance reports using React, FastAPI, Pydantic, and Groq LLM APIs.

## Limitations

- The report score is generated by the LLM from the transcript and is not a deterministic clinical measurement.
- The simulator is intended for education and prototyping only.
- It should not replace evaluation or therapy from a qualified speech-language pathologist or clinician.
