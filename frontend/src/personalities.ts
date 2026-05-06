import type { PersonalityKey } from "./types";

export const PERSONALITY_ORDER: PersonalityKey[] = [
  "mentor", "friend", "expert", "interviewer",
  "therapist", "debater", "philosopher", "storyteller", "cheerleader", "roaster",
];

export const META: Record<PersonalityKey, { tagline: string; description: string }> = {
  mentor: { tagline: "Tough love", description: "Direct, demanding, and pushes you to do better." },
  friend: { tagline: "Just vibes", description: "Casual, witty, and ready with a joke." },
  expert: { tagline: "Deep technical", description: "Precise answers with concrete examples." },
  interviewer: { tagline: "Probing questions", description: "One question at a time, follow-ups included." },
  therapist: { tagline: "Holds space", description: "Empathetic listener. No judgment, no rush." },
  debater: { tagline: "Counter-argues", description: "Challenges every claim. Stress-tests your thinking." },
  philosopher: { tagline: "Asks why", description: "First principles. Examines what you take for granted." },
  storyteller: { tagline: "Spins yarns", description: "Answers in vivid narrative. Show, don't tell." },
  cheerleader: { tagline: "Pure hype", description: "Relentlessly positive. Celebrates every win." },
  roaster: { tagline: "Savage wit", description: "Helpful and brutal. Laughs at you, with you." },
};
