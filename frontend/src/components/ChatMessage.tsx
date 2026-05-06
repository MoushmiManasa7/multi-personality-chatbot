import ReactMarkdown from "react-markdown";
import type { ChatItem, Personality, PersonalityKey } from "../types";
import { ICONS } from "../icons";

type Props = {
  item: ChatItem;
  personalities: Record<PersonalityKey, Personality>;
};

export function ChatMessage({ item, personalities }: Props) {
  if (item.role === "system") {
    return (
      <div className="system-note">
        <span className="system-dot" />
        {item.content}
      </div>
    );
  }

  if (item.role === "user") {
    return (
      <div className="row row-user">
        <div className="bubble bubble-user">{item.content}</div>
      </div>
    );
  }

  const personality = item.personality ?? "friend";
  return (
    <div className={`row row-assistant assistant-${personality}`}>
      <div className="avatar">{ICONS[personality]}</div>
      <div className="msg-body">
        <div className="msg-name">{personalities[personality]?.name ?? personality}</div>
        <div className="bubble bubble-assistant">
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

type TypingProps = {
  active: PersonalityKey;
  activeName: string;
};

export function TypingIndicator({ active, activeName }: TypingProps) {
  return (
    <div className={`row row-assistant assistant-${active}`}>
      <div className="avatar">{ICONS[active]}</div>
      <div className="msg-body">
        <div className="msg-name">{activeName}</div>
        <div className="bubble bubble-assistant typing">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
