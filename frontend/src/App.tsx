import { useEffect, useRef, useState } from "react";
import { useChat } from "./useChat";
import { PERSONALITY_ORDER, META } from "./personalities";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { EmptyState } from "./components/EmptyState";
import { ChatMessage, TypingIndicator } from "./components/ChatMessage";
import { Composer, type ComposerHandle } from "./components/Composer";
import "./App.css";

export default function App() {
  const chat = useChat();
  const [input, setInput] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<ComposerHandle>(null);

  useEffect(() => {
    if (!autoScroll) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: chat.streaming ? "auto" : "smooth",
    });
  }, [chat.items, chat.waitingForFirstToken, chat.streaming, autoScroll]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setAutoScroll(distanceFromBottom < 80);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    const saved = input;
    setInput("");
    setAutoScroll(true);
    const ok = await chat.sendMessage(text);
    if (!ok) setInput(saved);
  }

  if (!chat.personalities) {
    const errorNote = chat.items.find((i) => i.role === "system");
    if (errorNote) {
      return (
        <div className="loading">
          <div className="loading-error">
            <div className="loading-error-icon">!</div>
            <h2>Backend unreachable</h2>
            <p>{errorNote.content}</p>
            <button onClick={() => location.reload()}>Reload</button>
          </div>
        </div>
      );
    }
    return <div className="loading"><div className="loading-spinner" /></div>;
  }

  const availableOrder = PERSONALITY_ORDER.filter((k) => k in chat.personalities!);
  const activeName = chat.personalities[chat.active]?.name ?? META[chat.active].tagline;

  return (
    <div className={`app theme-${chat.active}`}>
      <Sidebar
        personalities={chat.personalities}
        availableOrder={availableOrder}
        active={chat.active}
        streaming={chat.streaming}
        itemCount={chat.items.length}
        onPick={chat.setActive}
        onClear={chat.clearChat}
      />

      <main className="main">
        <Header personalities={chat.personalities} active={chat.active} />

        <div className="messages" ref={scrollRef} onScroll={handleScroll}>
          {chat.items.length === 0 && (
            <EmptyState
              personalities={chat.personalities}
              active={chat.active}
              onSuggest={(s) => {
                setInput(s);
                composerRef.current?.focus();
              }}
            />
          )}

          {chat.items.map((item, idx) => (
            <ChatMessage key={idx} item={item} personalities={chat.personalities!} />
          ))}

          {chat.waitingForFirstToken && (
            <TypingIndicator active={chat.active} activeName={activeName} />
          )}
        </div>

        <Composer
          ref={composerRef}
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={chat.streaming}
          placeholder={`Message ${activeName}...`}
        />
      </main>
    </div>
  );
}
