import type { Personality, PersonalityKey } from "../types";
import { META } from "../personalities";
import { ICONS } from "../icons";

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
        <span className={`topbar-avatar avatar-${active}`}>{ICONS[active]}</span>
        <div className="topbar-meta">
          <span className="topbar-label">Talking to</span>
          <span className="topbar-name">{name}</span>
        </div>
      </div>
      <div className="topbar-tag">{meta.tagline}</div>
    </header>
  );
}
