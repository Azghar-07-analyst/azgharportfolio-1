import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { askBot } from "@/lib/chat.functions";
import { track } from "@/lib/analytics";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK = [
  "What are his skills?",
  "Tell me about his projects",
  "Is he available for work?",
  "How can I contact him?",
];

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! 👋 Ask me anything about Azghar — his skills, projects, or availability.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const onFocus = () => {
      setOpen(true);
      track("chatbot_opened");
      setTimeout(() => inputRef.current?.focus(), 120);
    };
    const onClose = () => setOpen(false);
    window.addEventListener("focus-chat", onFocus);
    window.addEventListener("close-overlays", onClose);
    return () => {
      window.removeEventListener("focus-chat", onFocus);
      window.removeEventListener("close-overlays", onClose);
    };
  }, []);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await askBot({
        data: { messages: next.filter((m) => m !== GREETING).slice(-12) },
      });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, I am having trouble connecting. Please email azgharabbas@gmail.com directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() =>
          setOpen((o) => {
            if (!o) track("chatbot_opened");
            return !o;
          })
        }
        aria-label="Open chat"
        className="chat-pulse fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground glow-cyan transition-transform hover:scale-110"
        style={{ background: "var(--gradient-brand)" }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed bottom-24 right-6 z-[90] flex h-[450px] w-[calc(100vw-3rem)] max-w-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div
              className="flex items-center justify-between px-4 py-3 text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-bold">
                <Bot className="h-4 w-4" /> Ask about Azghar 🤖
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="opacity-90 hover:opacity-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm text-primary-foreground"
                        : "rounded-bl-sm bg-secondary text-foreground"
                    }`}
                    style={m.role === "user" ? { background: "var(--gradient-brand)" } : undefined}
                  >
                    {m.content}
                  </span>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <span className="inline-flex items-center gap-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-cyan" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-cyan" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-cyan" />
                  </span>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-cyan/40 bg-secondary px-3 py-1.5 text-xs font-medium text-cyan transition-colors hover:bg-cyan/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border p-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="float-field flex-1 rounded-full border border-border bg-secondary px-4 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-foreground glow-cyan transition-transform hover:scale-105 disabled:opacity-50"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
