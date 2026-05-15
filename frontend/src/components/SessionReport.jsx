export default function SessionReport({ report, patientName, scenarioName }) {
  const sections = [
    ["Strengths", report.strengths],
    ["Needs Improvement", report.improvement_areas],
    ["Missed Opportunities", report.missed_opportunities],
    ["Recommended Next Steps", report.recommended_next_steps],
  ];

  return (
    <section className="border-t border-slate-200 bg-white px-5 py-5">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
              Session evaluation report
            </p>
            <h3 className="mt-1 text-2xl font-bold text-slate-950">
              {patientName} / {scenarioName}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {report.summary}
            </p>
          </div>
          <div className="min-w-28 rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Score
            </p>
            <p className="mt-1 text-3xl font-black text-slate-950">
              {report.score}
            </p>
            <p className="text-sm font-semibold text-slate-500">/ 100</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {sections.map(([title, items]) => (
            <div key={title} className="rounded-lg border border-slate-200 p-4">
              <h4 className="font-bold text-slate-950">{title}</h4>
              {items.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  No items returned for this section.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-teal-200 bg-teal-50 p-4">
          <h4 className="font-bold text-teal-950">Clinical Feedback</h4>
          <p className="mt-2 text-sm leading-6 text-teal-950">
            {report.clinical_feedback}
          </p>
        </div>
      </div>
    </section>
  );
}
