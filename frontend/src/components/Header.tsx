import { motion, AnimatePresence } from "framer-motion";
import type { Personality, PersonalityKey } from "../types";
import { META } from "../personalities";

type Props = {
  personalities: Record<PersonalityKey, Personality>;
  active: PersonalityKey;
};

export function Header({ personalities, active }: Props) {
  const meta = META[active];
  const name = personalities[active]?.name ?? meta.tagline;

  return (
    <header className="topbar">
      <div className="topbar-current">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            className="topbar-avatar"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {meta.emoji}
          </motion.span>
        </AnimatePresence>
        <div className="topbar-meta">
          <span className="topbar-label">Talking to</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              className="topbar-name"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              {name}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="topbar-tag"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {meta.tagline}
        </motion.div>
      </AnimatePresence>
    </header>
  );
}
