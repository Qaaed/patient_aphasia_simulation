import { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import SessionReport from "./SessionReport";
import { generateSessionReport, sendMessageToPatient } from "../services/api";
import { PATIENT_TYPES, SCENARIOS } from "../data/simulatorOptions";

export default function ChatInterface({ patientType, scenario, onReset }) {
  const patient = PATIENT_TYPES.find((item) => item.id === patientType);
  const scenarioDetails = SCENARIOS.find((item) => item.id === scenario);
  const [messages, setMessages] = useState([
    {
      sender: "patient",
      text: "Hello... I am ready.",
      clinicalNote:
        "Begin with one short prompt and give the patient time to respond.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState(null);
  const reportRef = useRef(null);

  const hasLearnerMessages = messages.some((msg) => msg.sender === "user");

  useEffect(() => {
    if (report) {
      reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [report]);

  const handleSendMessage = async (text) => {
    const newHistory = [...messages, { sender: "user", text }];
    setMessages(newHistory);
    setIsLoading(true);

    const response = await sendMessageToPatient(
      text,
      patientType,
      scenario,
      newHistory.map(({ sender, text }) => ({ sender, text }))
    );

    setMessages((prev) => [
      ...prev,
      {
        sender: "patient",
        text: response.response,
        communicationTip: response.communication_tip,
        clinicalNote: response.clinical_note,
      },
    ]);
    setIsLoading(false);
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    const sessionReport = await generateSessionReport(
      patientType,
      scenario,
      messages.map(({ sender, text }) => ({ sender, text }))
    );
    setReport(sessionReport);
    setIsGeneratingReport(false);
  };

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Current session
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-950">
              {patient.name} / {scenarioDetails.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {scenarioDetails.goal}
            </p>
          </div>
          <button
            onClick={onReset}
            className="self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-700 md:self-center"
          >
            End Simulation
          </button>
        </div>
      </div>

      <div className="border-b border-teal-100 bg-teal-50 px-5 py-3">
        <p className="mx-auto max-w-5xl text-sm leading-6 text-teal-950">
          Learner focus: use short questions, confirm meaning, and avoid
          correcting every language error.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} isLoading={isLoading} />
        {report && (
          <div ref={reportRef}>
            <SessionReport
              report={report}
              patientName={patient.name}
              scenarioName={scenarioDetails.name}
            />
          </div>
        )}
      </div>
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-600">
            Generate a report after a few learner turns to evaluate
            communication strategy.
          </p>
          <button
            type="button"
            onClick={handleGenerateReport}
            disabled={!hasLearnerMessages || isLoading || isGeneratingReport}
            className="rounded-lg border border-teal-700 px-4 py-2 text-sm font-bold text-teal-800 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400"
          >
            {isGeneratingReport ? "Generating Report..." : "Generate Report"}
          </button>
        </div>
      </div>
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
