import { useEffect, useRef, useState } from "react";
import { useChat } from "./useChat";
import { PERSONALITY_ORDER, META } from "./personalities";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { EmptyState } from "./components/EmptyState";
import { ChatMessage, TypingIndicator } from "./components/ChatMessage";
import { Composer } from "./components/Composer";
import "./App.css";

export default function App() {
  const chat = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [chat.items, chat.waitingForFirstToken]);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    await chat.sendMessage(text);
  }

  if (!chat.personalities) {
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

        <div className="messages" ref={scrollRef}>
          {chat.items.length === 0 && (
            <EmptyState
              personalities={chat.personalities}
              active={chat.active}
              onSuggest={(s) => setInput(s)}
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
