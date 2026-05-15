import { useState } from "react";

export default function MessageInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="container mx-auto flex max-w-5xl gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Ask one short, supportive question..."
          className="min-w-0 flex-1 rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-slate-100"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-slate-950 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Send
        </button>
      </div>
    </form>
  );
}
