import { useEffect, useRef } from "react";

export default function MessageList({ messages, isLoading }) {
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              msg.sender === "user"
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-white text-slate-800 border border-gray-200 rounded-bl-none"
            }`}
          >
            <p className="text-sm font-semibold mb-1 opacity-75">
              {msg.sender === "user" ? "You" : "Patient"}
            </p>
            <p>{msg.text}</p>
          </div>
        </div>
      ))}

      {/* Loading Bubble */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-slate-600 p-4 rounded-2xl rounded-bl-none animate-pulse">
            Patient is thinking...
          </div>
        </div>
      )}

      <div ref={endOfMessagesRef} />
    </div>
  );
}
