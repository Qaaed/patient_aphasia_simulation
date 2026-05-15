# Aphasia Patient Simulator

An interactive clinical training simulator for practicing communication with patients who have Broca's or Wernicke's aphasia.

## What It Does

The app gives healthcare learners a guided conversation session:

- choose an aphasia profile
- choose a clinical scenario
- chat with a simulated patient
- receive a short communication tip and clinical note after each exchange

This makes the project more than an AI chat demo: it behaves like a lightweight educational tool for communication training.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: FastAPI, Pydantic, LangChain Groq
- Model: Groq-hosted Llama 3.3 70B

## Project Structure

```text
patient_aphasia_simulation/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
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
