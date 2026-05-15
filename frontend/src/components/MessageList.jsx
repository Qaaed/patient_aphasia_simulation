import { useEffect, useRef } from "react";

export default function MessageList({ messages, isLoading }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="bg-slate-50 px-4 py-5">
      <div className="mx-auto max-w-5xl space-y-4">
        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={`${msg.sender}-${index}`}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <article
                className={`max-w-[88%] rounded-lg border p-4 shadow-sm md:max-w-[72%] ${
                  isUser
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-800"
                }`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-wide ${
                    isUser ? "text-slate-300" : "text-teal-700"
                  }`}
                >
                  {isUser ? "Learner" : "Patient"}
                </p>
                <p className="mt-2 whitespace-pre-wrap leading-7">{msg.text}</p>

                {!isUser && (msg.communicationTip || msg.clinicalNote) && (
                  <div className="mt-4 space-y-2 border-t border-slate-200 pt-3 text-sm leading-6">
                    {msg.communicationTip && (
                      <p>
                        <span className="font-semibold text-slate-950">
                          Communication tip:
                        </span>{" "}
                        {msg.communicationTip}
                      </p>
                    )}
                    {msg.clinicalNote && (
                      <p>
                        <span className="font-semibold text-slate-950">
                          Clinical note:
                        </span>{" "}
                        {msg.clinicalNote}
                      </p>
                    )}
                  </div>
                )}
              </article>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
              Patient is responding...
            </div>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
}
