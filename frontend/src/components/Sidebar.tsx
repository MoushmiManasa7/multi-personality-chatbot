import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { Personality, PersonalityKey } from "../types";
import { META } from "../personalities";

type Props = {
  personalities: Record<PersonalityKey, Personality>;
  availableOrder: PersonalityKey[];
  active: PersonalityKey;
  streaming: boolean;
  itemCount: number;
  onPick: (key: PersonalityKey) => void;
  onClear: () => void;
};

export function Sidebar({
  personalities,
  availableOrder,
  active,
  streaming,
  itemCount,
  onPick,
  onClear,
}: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <motion.div
          className="sidebar-logo"
          key={active}
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {META[active].emoji}
        </motion.div>
        <div>
          <div className="sidebar-title">Persona</div>
          <div className="sidebar-subtitle">{availableOrder.length} personalities</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {availableOrder.map((key) => {
          const isActive = active === key;
          const meta = META[key];
          
          return (
            <motion.button
              key={key}
              className={`nav-item nav-${key} ${isActive ? "nav-active" : ""}`}
              onClick={() => onPick(key)}
              disabled={streaming}
              whileHover={{ scale: streaming ? 1 : 1.01 }}
              whileTap={{ scale: streaming ? 1 : 0.98 }}
            >
              <motion.span
                className="nav-icon"
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {meta.emoji}
              </motion.span>
              <span className="nav-text">
                <span className="nav-name">{personalities[key].name}</span>
                <span className="nav-tag">{meta.tagline}</span>
              </span>
              {isActive && (
                <motion.span
                  className="nav-dot"
                  layoutId="active-dot"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-clear"
          onClick={onClear}
          disabled={streaming || itemCount === 0}
        >
          <Trash2 size={14} />
          <span>Clear conversation</span>
        </button>
      </div>
    </aside>
  );
}
