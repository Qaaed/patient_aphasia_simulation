# Aphasia Patient Simulator

An interactive educational tool that simulates conversations with patients experiencing Broca's and Wernicke's aphasia.

## Overview

This application allows healthcare students, professionals, and aphasia patients to practice and develop communication skills. The simulator uses AI to generate realistic speech patterns characteristic of different aphasia types, providing immediate, realistic feedback that helps users understand and adapt to various communication challenges.

### Why This Matters

Aphasia affects millions of people worldwide, often resulting from stroke, brain injury, or neurological conditions. Traditional therapy requires access to trained specialists and repeated practice sessions. This simulator enables:

- **Self-directed practice** for patients between therapy sessions
- **Training environment** for healthcare professionals
- **Safe experimentation** with communication strategies
- **Scalable access** to aphasia conversation practice

## Features

- **Two Aphasia Types**: Broca's (telegraphic speech) and Wernicke's (fluent but nonsensical)
- **Real-time Conversation**: Interactive chat interface with instant responses
- **Educational Focus**: Learn how aphasia affects communication
- **Web-based Interface**: Easy-to-use React frontend with Tailwind CSS styling
- **Robot-Ready**: Designed to integrate with therapeutic robots for patient care

## Use Cases

- **Patient Therapy**: Extended practice between therapy sessions
- **Caregiver Training**: Help family members understand communication challenges
- **Professional Education**: Train speech-language pathologists and healthcare students
- **Robot Integration**: AI backbone for aphasia therapy robots
- **Research**: Study communication patterns and recovery strategies

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: FastAPI, Python 3.14+
- **AI Model**: Groq (Llama 3.3-70B)

## Prerequisites

- Python 3.14+
- Node.js & npm
- GROQ API Key ([Get one free here](https://console.groq.com))

## Setup

### 1. Clone and Navigate

```bash
cd patient_aphasia_simulation
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create `.env` file in `backend/` with your API key (no spaces around `=`):

```
GROQ_API_KEY=your_api_key_here
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

You need **2 terminals open simultaneously**:

**Terminal 1 - Backend Server:**

```bash
cd backend
uvicorn main:app --reload
```

Runs on: `http://localhost:8000`

**Terminal 2 - Frontend Server:**

```bash
cd frontend
npm run dev
```

Runs on: `http://localhost:5173`

The frontend will open automatically in your browser. You can now start chatting with the simulated patient.

## Project Structure

```
patient_aphasia_simulation/
├── backend/
│   ├── main.py              # FastAPI server & LLM integration
│   ├── requirements.txt      # Python dependencies
│   └── .env                 # API keys (create this file)
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ChatInterface.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── Header.jsx
│   │   │   └── PatientSelector.jsx
│   │   ├── services/
│   │   │   └── api.js       # Axios API client
│   │   ├── App.jsx          # Main app component
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── README.md                # This file
└── requirements.txt         # Python dependencies (root)
```

## How It Works

1. **User sends a message** in the chat interface
2. **Frontend sends request** to FastAPI backend via axios
3. **Backend constructs a prompt** based on the selected aphasia type:
   - **Broca's Aphasia**: Telegraphic speech (nouns/verbs only, halting)
   - **Wernicke's Aphasia**: Fluent but nonsensical (word salad, neologisms)
4. **Groq API generates response** using Llama 3.3-70B model
5. **Response displayed** in real-time chat

## Aphasia Types Simulated

### Broca's Aphasia

- Slow, effortful speech
- Telegraphic (only essential words)
- Omits function words (the, is, and)
- Frustrated tone when searching for words
- Example: "Want... store... go."

### Wernicke's Aphasia

- Fluent, confident, normal speed
- Grammatically correct but meaningless
- Made-up words (neologisms)
- Patient unaware of errors
- Example: "The glimber is waving at the sky melon today."

## Troubleshooting

**"Error: Could not connect to the patient simulator"**

- Ensure backend is running on port 8000
- Check `.env` file is in `backend/` folder with correct API key
- Verify no spaces around `=` in `.env`

**Backend crashes on startup**

- Verify GROQ_API_KEY is valid
- Check all dependencies installed: `pip install -r requirements.txt`
- Try deleting and recreating the `.env` file

**Frontend won't load**

- Ensure you're in the `frontend/` folder
- Run `npm install` if not already done
- Check that port 5173 is available

**No response from simulated patient**

- Verify GROQ API key is valid and has credits
- Check backend terminal for error messages
- Try restarting both servers

## API Endpoints

### POST /chat

Send a message to the patient simulator

**Request:**

```json
{
  "user_message": "How are you feeling today?",
  "patient_type": "1",
  "history": ["Hello", "Hi there"]
}
```

**Response:**

```json
{
  "response": "Feel... okay. Thanks... ask."
}
```

**Parameters:**

- `user_message` (string): The message to send
- `patient_type` (string): "1" for Broca's, "2" for Wernicke's
- `history` (array): Previous messages for context

## Development

### Frontend Development

- Edit components in `frontend/src/components/`
- Tailwind CSS is configured for styling
- Hot reload enabled with Vite

### Backend Development

- Edit `backend/main.py` for API changes
- Auto-reload enabled with `--reload` flag
- CORS enabled for React frontend

## Project & Authors

Developed as part of the **AQTASY Robotics** aphasia therapy robot initiative. This simulator provides the conversational AI backbone for therapeutic robots designed to improve patient outcomes in aphasia rehabilitation.

For more information about the broader project and robot development, visit: [aqtasyrobotics.com](https://aqtasyrobotics.com/)
