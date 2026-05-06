import { useEffect, useRef } from "react";
import { SendIcon } from "../icons";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
  placeholder: string;
};

export function Composer({ value, onChange, onSend, disabled, placeholder }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = `${Math.min(ref.current.scrollHeight, 160)}px`;
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="composer">
      <div className="composer-inner">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
        />
        <button
          className="send-btn"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          aria-label="Send"
        >
          <SendIcon />
        </button>
      </div>
      <p className="composer-hint">Enter to send &middot; Shift + Enter for newline</p>
    </div>
  );
}
