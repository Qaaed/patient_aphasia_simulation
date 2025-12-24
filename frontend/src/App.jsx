// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import PatientSelector from "./components/PatientSelector";
import ChatInterface from "./components/ChatInterface";

function App() {
  const [patientType, setPatientType] = useState(null); // null = show menu, "1" or "2" = show chat

  return (
    <div className="h-screen flex flex-col bg-gray-100 font-sans">
      <Header />

      <main className="flex-1 overflow-hidden relative">
        {!patientType ? (
          <PatientSelector onSelect={setPatientType} />
        ) : (
          <ChatInterface
            patientType={patientType}
            onReset={() => setPatientType(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
