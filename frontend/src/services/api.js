import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export const sendMessageToPatient = async (
  message,
  patientType,
  scenario,
  history
) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      user_message: message,
      patient_type: patientType,
      scenario,
      history,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return {
      response: "Error: Could not connect to the patient simulator.",
      communication_tip:
        "Check that the backend is running before continuing the session.",
      clinical_note:
        "The simulator could not provide clinical feedback for this exchange.",
    };
  }
};

export const generateSessionReport = async (patientType, scenario, history) => {
  try {
    const response = await axios.post(`${API_URL}/session-report`, {
      patient_type: patientType,
      scenario,
      history,
    });
    return response.data;
  } catch (error) {
    console.error("Report API Error:", error);
    return {
      score: 0,
      summary: "The session report could not be generated.",
      strengths: [],
      improvement_areas: [
        "Check that the backend is running and the Groq API key is valid.",
      ],
      missed_opportunities: [],
      recommended_next_steps: ["Try generating the report again."],
      clinical_feedback:
        "No clinical feedback is available because the report request failed.",
    };
  }
};
