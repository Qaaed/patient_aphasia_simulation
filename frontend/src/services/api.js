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
