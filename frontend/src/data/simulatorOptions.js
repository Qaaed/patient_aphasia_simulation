export const PATIENT_TYPES = [
  {
    id: "1",
    name: "Broca's Aphasia",
    label: "Non-fluent",
    summary:
      "Slow, effortful speech with short phrases and omitted function words.",
    example: "Want... water... please.",
    accentClass: "border-teal-500",
  },
  {
    id: "2",
    name: "Wernicke's Aphasia",
    label: "Fluent",
    summary:
      "Smooth, confident speech that may be hard to understand or off topic.",
    example: "The calendar is swimming through the window.",
    accentClass: "border-amber-500",
  },
];

export const SCENARIOS = [
  {
    id: "hospital-intake",
    name: "Hospital Intake",
    goal: "Ask simple questions about symptoms, comfort, and immediate needs.",
  },
  {
    id: "family-conversation",
    name: "Family Conversation",
    goal: "Practice patience, confirmation, and supportive repair strategies.",
  },
  {
    id: "therapy-practice",
    name: "Therapy Practice",
    goal: "Use short prompts, yes/no checks, and encouraging responses.",
  },
];
