import type { Personality, PersonalityKey } from "../types";
import { META } from "../personalities";
import { ICONS, SparkIcon, TrashIcon } from "../icons";

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
        <div className="sidebar-logo"><SparkIcon /></div>
        <div>
          <div className="sidebar-title">Personalities</div>
          <div className="sidebar-subtitle">{availableOrder.length} available</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {availableOrder.map((key) => (
          <button
            key={key}
            className={`nav-item nav-${key} ${active === key ? "nav-active" : ""}`}
            onClick={() => onPick(key)}
            disabled={streaming}
          >
            <span className="nav-icon">{ICONS[key]}</span>
            <span className="nav-text">
              <span className="nav-name">{personalities[key].name}</span>
              <span className="nav-tag">{META[key].tagline}</span>
            </span>
            {active === key && <span className="nav-dot" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-clear"
          onClick={onClear}
          disabled={streaming || itemCount === 0}
        >
          <TrashIcon />
          <span>Clear conversation</span>
        </button>
      </div>
    </aside>
  );
}
