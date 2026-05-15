// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import PatientSelector from "./components/PatientSelector";
import ChatInterface from "./components/ChatInterface";

function App() {
  const [session, setSession] = useState(null);

  return (
    <div className="h-screen flex flex-col bg-slate-100 font-sans text-slate-900">
      <Header />

      <main className="flex-1 overflow-hidden relative">
        {!session ? (
          <PatientSelector onStartSession={setSession} />
        ) : (
          <ChatInterface
            patientType={session.patientType}
            scenario={session.scenario}
            onReset={() => setSession(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
