"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useRef, useState } from "react";
import { HERO_EXAMPLES, searchServices } from "@/lib/data";
import type { Service } from "@/types";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onSelectService: (service: Service) => void;
}

export function HeroSection({ onSearch, onSelectService }: HeroSectionProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Service[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (value: string) => {
    setQuery(value);
    setSuggestions(value.trim() ? searchServices(value) : []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <section id="search" className="gradient-hero relative overflow-hidden section-padding pt-10 sm:pt-16 lg:pt-20">
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl dark:text-white">
            Smarter G2C Station
          </h1>
          <p className="mt-3 text-lg font-medium text-slate-700 sm:text-xl lg:text-2xl dark:text-slate-300">
            Find Any Bhutan Government Service in Seconds
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500 sm:mt-4 sm:text-base lg:text-lg dark:text-slate-400">
            Search and browse all government services. Filter by category and open official portals.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="relative mx-auto mt-8 max-w-2xl sm:mt-10"
        >
          <div className="glass group relative rounded-2xl p-2 shadow-xl shadow-slate-200/60 transition-shadow focus-within:shadow-2xl focus-within:shadow-bhutan-blue/10 dark:shadow-slate-950/60">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400 sm:ml-3" strokeWidth={1.75} />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => handleInput(e.target.value)}
                  placeholder="What service are you looking for?"
                  className="min-w-0 flex-1 bg-transparent py-3.5 pr-1 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none sm:py-4 sm:pr-2 dark:text-white"
                  aria-label="Search government services"
                />
              </div>
              <button
                type="submit"
                className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-bhutan-blue px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-bhutan-blue-dark hover:shadow-lg hover:shadow-bhutan-blue/25 sm:w-auto sm:py-3"
              >
                Search
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
          className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6"
        >
          <span className="w-full text-center text-sm text-slate-500 sm:w-auto dark:text-slate-400">Try:</span>
          {HERO_EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setQuery(example);
                handleInput(example);
                onSearch(example);
              }}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 transition-all hover:border-bhutan-blue/30 hover:bg-bhutan-blue-light/30 hover:text-bhutan-blue sm:py-1.5 sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-bhutan-blue/40 dark:hover:bg-bhutan-blue/10"
            >
              {example}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
