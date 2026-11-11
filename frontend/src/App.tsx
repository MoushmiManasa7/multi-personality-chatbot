import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Trash2 } from "lucide-react";
import { useChat } from "./useChat";
import { PERSONALITY_ORDER, META } from "./personalities";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { EmptyState } from "./components/EmptyState";
import { ChatMessage, TypingIndicator } from "./components/ChatMessage";
import { Composer, type ComposerHandle } from "./components/Composer";
import type { PersonalityKey } from "./types";
import "./App.css";

export default function App() {
  const chat = useChat();
  const [input, setInput] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
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

  function handlePickPersonality(key: PersonalityKey) {
    chat.setActive(key);
    setSheetOpen(false);
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
  const activeMeta = META[chat.active];
  const activeName = chat.personalities[chat.active]?.name ?? activeMeta.tagline;

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
        {/* Desktop header */}
        <Header personalities={chat.personalities} active={chat.active} />

        {/* Mobile header */}
        <div className="mobile-topbar">
          <button
            className="mobile-persona-btn"
            onClick={() => setSheetOpen(true)}
            disabled={chat.streaming}
          >
            <span className="mobile-persona-emoji">{activeMeta.emoji}</span>
            <div className="mobile-persona-info">
              <span className="mobile-persona-name">{activeName}</span>
              <span className="mobile-persona-tag">{activeMeta.tagline}</span>
            </div>
            <ChevronDown size={16} className="mobile-chevron" />
          </button>
          <button
            className="mobile-clear-btn"
            onClick={chat.clearChat}
            disabled={chat.streaming || chat.items.length === 0}
            aria-label="Clear conversation"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="messages" ref={scrollRef} onScroll={handleScroll}>
          <AnimatePresence mode="wait">
            {chat.items.length === 0 && (
              <EmptyState
                key={chat.active}
                personalities={chat.personalities}
                active={chat.active}
                onSuggest={(s) => {
                  setInput(s);
                  composerRef.current?.focus();
                }}
              />
            )}
          </AnimatePresence>

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

      {/* Mobile personality sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              className="mobile-sheet-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              className="mobile-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="mobile-sheet-handle" />
              <div className="mobile-sheet-content">
                <div className="mobile-sheet-grid">
                  {availableOrder.map((key) => {
                    const meta = META[key];
                    const isActive = chat.active === key;
                    return (
                      <motion.button
                        key={key}
                        className={`mobile-card ${isActive ? "mobile-card-active" : ""}`}
                        onClick={() => handlePickPersonality(key)}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mobile-card-icon">{meta.emoji}</span>
                        <span className="mobile-card-name">{chat.personalities![key].name}</span>
                        <span className="mobile-card-tag">{meta.tagline}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
