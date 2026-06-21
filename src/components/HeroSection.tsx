"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mic, Search, Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { HERO_EXAMPLES, searchServices } from "@/lib/data";
import { getSpeechRecognition } from "@/lib/speech";
import { cn } from "@/lib/utils";
import type { SpeechRecognitionEvent } from "@/lib/speech";
import type { Service } from "@/types";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onSelectService: (service: Service) => void;
}

export function HeroSection({ onSearch, onSelectService }: HeroSectionProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Service[]>([]);
  const [listening, setListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (value: string) => {
    setQuery(value);
    setSuggestions(value.trim() ? searchServices(value) : []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const startVoiceSearch = useCallback(() => {
    const SpeechRecognition = getSpeechRecognition();

    if (!SpeechRecognition) {
      inputRef.current?.focus();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setSuggestions(searchServices(transcript));
      onSearch(transcript);
    };

    recognition.start();
  }, [onSearch]);

  return (
    <section id="search" className="gradient-hero relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-bhutan-blue/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-bhutan-teal/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-bhutan-blue/20 bg-bhutan-blue-light/50 px-4 py-1.5 text-sm font-medium text-bhutan-blue dark:border-bhutan-blue/30 dark:bg-bhutan-blue/10 dark:text-bhutan-blue-light">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
            AI-Powered Government Services
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Smarter G2C Station
          </h1>
          <p className="mt-3 text-xl font-medium text-slate-700 sm:text-2xl dark:text-slate-300">
            Find Any Bhutan Government Service in Seconds
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg dark:text-slate-400">
            Search, ask questions, and get step-by-step guidance for Bhutan government services powered by AI.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="relative mx-auto mt-10 max-w-2xl"
        >
          <div className="glass group relative rounded-2xl p-2 shadow-xl shadow-slate-200/60 transition-shadow focus-within:shadow-2xl focus-within:shadow-bhutan-blue/10 dark:shadow-slate-950/60">
            <div className="flex items-center gap-2">
              <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" strokeWidth={1.75} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => handleInput(e.target.value)}
                placeholder="What government service are you looking for today?"
                className="flex-1 bg-transparent py-4 pr-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                aria-label="Search government services"
              />
              <button
                type="button"
                onClick={startVoiceSearch}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                  listening
                    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    : "text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                )}
                aria-label="Voice search"
              >
                <Mic className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 rounded-xl bg-bhutan-blue px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-bhutan-blue-dark hover:shadow-lg hover:shadow-bhutan-blue/25"
              >
                Ask AI
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {suggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              {suggestions.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectService(service);
                      setQuery(service.name);
                      setSuggestions([]);
                    }}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{service.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{service.agency}</p>
                    </div>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-sm text-slate-500 dark:text-slate-400">Try:</span>
          {HERO_EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setQuery(example);
                handleInput(example);
                onSearch(example);
              }}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-all hover:border-bhutan-blue/30 hover:bg-bhutan-blue-light/30 hover:text-bhutan-blue dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-bhutan-blue/40 dark:hover:bg-bhutan-blue/10"
            >
              {example}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
