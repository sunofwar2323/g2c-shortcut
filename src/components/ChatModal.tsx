"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { generateAIResponse } from "@/lib/data";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function ChatModal({ open, onClose, initialQuery }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello! I'm your G2C AI Assistant. Ask me about any Bhutan government service and I'll guide you step by step.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && open) {
      handleSend(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery, open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (text?: string) => {
    const query = (text ?? input).trim();
    if (!query) return;

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(query).replace(/\*\*/g, "");
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setTyping(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-[min(600px,85vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            role="dialog"
            aria-label="AI Chat Assistant"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-bhutan-blue to-bhutan-teal text-white">
                  <Bot className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">G2C AI Assistant</p>
                  <p className="text-xs text-bhutan-teal">Ready to help</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "ai" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-bhutan-blue/10 text-bhutan-blue">
                      <Bot className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-bhutan-blue text-white"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-bhutan-blue/10">
                    <Bot className="h-3.5 w-3.5 text-bhutan-blue" strokeWidth={1.75} />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="h-1.5 w-1.5 rounded-full bg-slate-400"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-slate-200 p-4 dark:border-slate-700"
            >
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any government service..."
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-bhutan-blue text-white transition-colors hover:bg-bhutan-blue-dark disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
