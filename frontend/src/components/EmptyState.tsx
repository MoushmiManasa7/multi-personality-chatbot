import type { Personality, PersonalityKey } from "../types";
import { META } from "../personalities";
import { ICONS } from "../icons";

type Props = {
  personalities: Record<PersonalityKey, Personality>;
  active: PersonalityKey;
  onSuggest: (text: string) => void;
};

const SUGGESTIONS: Record<PersonalityKey, string[]> = {
  mentor: ["Critique my project plan", "Why am I procrastinating?", "What should I focus on this week?"],
  friend: ["I had a rough day", "Tell me a fun fact", "What should I do this weekend?"],
  expert: ["Explain TCP congestion control", "When should I use a hash map vs a tree?", "Async/await vs threading"],
  interviewer: ["Interview me for a backend role", "Behavioral interview practice", "Mock system design round"],
  therapist: ["I'm overwhelmed at work", "I'm not sure what I want", "Help me untangle a feeling"],
  debater: ["Remote work is better than in-office", "Tabs over spaces", "AI will replace junior developers"],
  philosopher: ["What does success mean?", "Is free will real?", "Why do we work?"],
  storyteller: ["Tell me about a fork in the road", "How does recursion work — as a story", "A myth about ambition"],
  cheerleader: ["I learned a new framework today", "I shipped my first PR", "I worked out 3 days in a row"],
  roaster: ["Roast my codebase", "Critique my Tinder bio: '...'", "Roast my New Year resolutions"],
};

export function EmptyState({ personalities, active, onSuggest }: Props) {
  const name = personalities[active]?.name ?? active;
  const meta = META[active];
  const suggestions = SUGGESTIONS[active];

  return (
    <div className="empty">
      <div className={`empty-hero hero-${active}`}>
        <div className="empty-icon">{ICONS[active]}</div>
        <h2>Talking to <span className="empty-name">{name}</span></h2>
        <p className="empty-sub">{meta.description}</p>
      </div>

      <div className="empty-suggestions">
        <div className="empty-suggestions-label">Try one of these</div>
        <div className="empty-suggestions-grid">
          {suggestions.map((s) => (
            <button key={s} className="suggestion" onClick={() => onSuggest(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="empty-hint">
        Switch personalities anytime from the sidebar, or by typing "talk like an interviewer".
      </p>
    </div>
  );
}
