import axios from "axios";

// Ensure your FastAPI backend is running on this port
const API_URL = "http://127.0.0.1:8000";

export const sendMessageToPatient = async (message, patientType, history) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      user_message: message,
      patient_type: patientType,
      history: history, // Passing history context to backend
    });
    return response.data.response;
  } catch (error) {
    console.error("API Error:", error);
    return "Error: Could not connect to the patient simulator.";
  }
};
