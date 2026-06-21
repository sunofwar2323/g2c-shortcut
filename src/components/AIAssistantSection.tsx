"use client";

import { motion } from "framer-motion";
import { Bot, Check, MessageSquare, Sparkles } from "lucide-react";
import { AI_FEATURES } from "@/lib/data";

const CONVERSATION = [
  {
    role: "user" as const,
    text: "How do I get a Security Clearance?",
  },
  {
    role: "ai" as const,
    text: "Follow these 4 simple steps:\n1. Open the Bhutan NDI App\n2. Navigate to Security Clearance (NOC)\n3. Submit your application with CID details\n4. Track status online — typically 5-10 business days",
  },
];

export function AIAssistantSection() {
  return (
    <section id="assistant" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-bhutan-teal-light px-3 py-1 text-sm font-medium text-bhutan-teal dark:bg-bhutan-teal/10">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
              AI Assistant
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Meet Your Government AI Assistant
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Get clear, step-by-step guidance for any government service — without navigating complex portals alone.
            </p>

            <ul className="mt-8 space-y-3">
              {AI_FEATURES.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bhutan-teal/15 text-bhutan-teal">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card overflow-hidden p-1"
          >
            <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-6 dark:from-slate-900 dark:to-slate-900/50">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bhutan-blue to-bhutan-teal text-white">
                  <Bot className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">G2C AI Assistant</p>
                  <p className="text-xs text-bhutan-teal">Online — Ready to help</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="h-2 w-2 rounded-full bg-bhutan-teal"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {CONVERSATION.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.2 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                  >
                    {msg.role === "ai" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bhutan-blue/10 text-bhutan-blue">
                        <Bot className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-bhutan-blue text-white"
                          : "bg-white text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    {msg.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        <MessageSquare className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <input
                  type="text"
                  placeholder="Ask about any government service..."
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                  readOnly
                  aria-label="Chat input preview"
                />
                <button
                  type="button"
                  className="rounded-lg bg-bhutan-blue px-3 py-1.5 text-xs font-medium text-white"
                  aria-hidden
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
