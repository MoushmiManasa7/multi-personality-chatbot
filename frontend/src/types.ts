export type PersonalityKey =
  | "mentor"
  | "friend"
  | "expert"
  | "interviewer"
  | "therapist"
  | "debater"
  | "philosopher"
  | "storyteller"
  | "cheerleader"
  | "roaster";

export type Personality = { name: string };

export type Message = {
  role: "user" | "assistant";
  content: string;
  personality?: PersonalityKey;
};

export type SystemNote = {
  role: "system";
  content: string;
};

export type ChatItem = Message | SystemNote;
