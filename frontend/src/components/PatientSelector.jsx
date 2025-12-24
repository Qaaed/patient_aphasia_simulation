export default function PatientSelector({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-slate-50">
      {/* Title Section */}
      <div className="text-center max-w-2xl mb-10">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Patient <span className="text-blue-600">Simulator</span>
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Select a clinical profile below to begin your communication training
          session.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Card 1: Broca's (Non-Fluent) */}
        <button
          onClick={() => onSelect("1")}
          className="group relative bg-white p-8 rounded-3xl shadow-md border border-slate-200 
                     hover:shadow-2xl hover:border-blue-500 hover:-translate-y-1 
                     transition-all duration-300 text-left overflow-hidden"
        >
          {/* Decorative Gradient Background on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl">🧠</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Non-Fluent
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
              Broca's Aphasia
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Patient struggles to form sentences. Speech is slow, halting, and
              limited to key nouns/verbs.
              <span className="block mt-2 text-sm text-slate-400 italic">
                Example: "Walk... dog... park."
              </span>
            </p>
          </div>
        </button>

        {/* Card 2: Wernicke's (Fluent) */}
        <button
          onClick={() => onSelect("2")}
          className="group relative bg-white p-8 rounded-3xl shadow-md border border-slate-200 
                     hover:shadow-2xl hover:border-purple-500 hover:-translate-y-1 
                     transition-all duration-300 text-left overflow-hidden"
        >
          {/* Decorative Gradient Background on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl">🗣️</span>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Fluent
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">
              Wernicke's Aphasia
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Speech is smooth and rhythmic but meaningless ("Word Salad").
              Patient is often unaware of errors.
              <span className="block mt-2 text-sm text-slate-400 italic">
                Example: "The glimber is waving at the sky."
              </span>
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
