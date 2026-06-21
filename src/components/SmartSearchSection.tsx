"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { SEARCH_EXAMPLES, searchServices } from "@/lib/data";
import type { Service } from "@/types";

interface SmartSearchSectionProps {
  onSelectService: (service: Service) => void;
  onSearch: (query: string) => void;
}

export function SmartSearchSection({ onSelectService, onSearch }: SmartSearchSectionProps) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Smart Search
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Type naturally — AI instantly suggests the right services
          </p>
        </motion.div>

        <div className="mt-10 space-y-3">
          {SEARCH_EXAMPLES.map((example, i) => {
            const results = searchServices(example.query);
            return (
              <motion.button
                key={example.query}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => {
                  onSearch(example.query);
                  if (results[0]) onSelectService(results[0]);
                }}
                className="glass-card group flex w-full items-center gap-4 p-4 text-left transition-all hover:border-bhutan-blue/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-bhutan-blue-light group-hover:text-bhutan-blue dark:bg-slate-800">
                  <Search className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">&ldquo;{example.query}&rdquo;</p>
                  {results[0] && (
                    <p className="mt-0.5 text-xs text-bhutan-teal">
                      Suggested: {results[0].name}
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
