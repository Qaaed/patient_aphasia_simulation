import { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { sendMessageToPatient } from "../services/api";

export default function ChatInterface({ patientType, onReset }) {
  const [messages, setMessages] = useState([
    { sender: "patient", text: "*looks at you waiting*" }, // Initial state
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text) => {
    // 1. Add User Message immediately
    const newHistory = [...messages, { sender: "user", text }];
    setMessages(newHistory);
    setIsLoading(true);

    // 2. Call Backend
    // We send only the text history for context if your backend needs it
    const historyText = newHistory.map((m) => m.text);
    const responseText = await sendMessageToPatient(
      text,
      patientType,
      historyText
    );

    // 3. Add AI Response
    setMessages((prev) => [...prev, { sender: "patient", text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Bar for Chat */}
      <div className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
        <span className="font-bold text-slate-700">
          Current Session:{" "}
          {patientType === "1" ? "Broca's Aphasia" : "Wernicke's Aphasia"}
        </span>
        <button
          onClick={onReset}
          className="text-red-500 hover:text-red-700 text-sm font-semibold hover:underline"
        >
          End Simulation
        </button>
      </div>

      {/* Messages Area */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Input Area */}
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
