import { useState } from "react";
import { PATIENT_TYPES, SCENARIOS } from "../data/simulatorOptions";

export default function PatientSelector({ onStartSession }) {
  const [patientType, setPatientType] = useState(PATIENT_TYPES[0].id);
  const [scenario, setScenario] = useState(SCENARIOS[0].id);

  const selectedPatient = PATIENT_TYPES.find((item) => item.id === patientType);
  const selectedScenario = SCENARIOS.find((item) => item.id === scenario);

  const handleStart = () => {
    onStartSession({ patientType, scenario });
  };

  return (
    <div className="min-h-full overflow-y-auto bg-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8">
        <section className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Clinical communication trainer
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            Build a guided aphasia simulation session
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Select a patient profile and a practice situation. The simulator
            will respond as the patient and add short coaching feedback after
            each exchange.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Patient profile
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {PATIENT_TYPES.map((patient) => {
                const isSelected = patient.id === patientType;

                return (
                  <button
                    key={patient.id}
                    type="button"
                    onClick={() => setPatientType(patient.id)}
                    className={`rounded-lg border-l-4 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      isSelected
                        ? `${patient.accentClass} ring-2 ring-slate-900`
                        : "border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-xl font-bold text-slate-950">
                        {patient.name}
                      </h4>
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                        {patient.label}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {patient.summary}
                    </p>
                    <p className="mt-4 border-t border-slate-200 pt-3 text-sm italic text-slate-500">
                      Example: "{patient.example}"
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Practice scenario
            </h3>
            <div className="space-y-3">
              {SCENARIOS.map((item) => {
                const isSelected = item.id === scenario;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setScenario(item.id)}
                    className={`w-full rounded-lg border bg-white p-4 text-left shadow-sm transition hover:border-teal-500 ${
                      isSelected
                        ? "border-teal-600 ring-2 ring-teal-100"
                        : "border-slate-200"
                    }`}
                  >
                    <span className="font-semibold text-slate-950">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {item.goal}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-slate-300 pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Session preview
            </p>
            <p className="mt-1 text-lg font-bold text-slate-950">
              {selectedPatient.name} / {selectedScenario.name}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Goal: {selectedScenario.goal}
            </p>
          </div>
          <button
            type="button"
            onClick={handleStart}
            className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            Start Simulation
          </button>
        </section>
      </div>
    </div>
  );
}
