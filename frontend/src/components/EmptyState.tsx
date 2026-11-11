import { motion } from "framer-motion";
import type { Personality, PersonalityKey } from "../types";
import { META } from "../personalities";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

export function EmptyState({ personalities, active, onSuggest }: Props) {
  const name = personalities[active]?.name ?? active;
  const meta = META[active];
  const suggestions = SUGGESTIONS[active];

  return (
    <motion.div
      className="empty"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={active}
    >
      <motion.div className="empty-hero" variants={itemVariants}>
        <motion.div
          className="empty-icon"
          initial={{ scale: 0.5, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        >
          {meta.emoji}
        </motion.div>
        <h2>
          Talk to <span className="empty-name">{name}</span>
        </h2>
        <p className="empty-sub">{meta.description}</p>
      </motion.div>

      <motion.div className="empty-suggestions" variants={itemVariants}>
        <div className="empty-suggestions-label">Try one of these</div>
        <div className="empty-suggestions-grid">
          {suggestions.map((s, i) => (
            <motion.button
              key={s}
              className="suggestion"
              onClick={() => onSuggest(s)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.p className="empty-hint" variants={itemVariants}>
        Switch personalities from the sidebar, or type "talk like a mentor"
      </motion.p>
    </motion.div>
  );
}
