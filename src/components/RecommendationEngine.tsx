"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";
import { SCENARIO_PROMPTS, getServicesByIds } from "@/lib/data";
import { getServiceIcon } from "@/lib/utils";
import type { Service } from "@/types";

interface RecommendationEngineProps {
  onViewService: (service: Service) => void;
  onAskAI: (query: string) => void;
}

export function RecommendationEngine({ onViewService, onAskAI }: RecommendationEngineProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = SCENARIO_PROMPTS.find((s) => s.id === activeId);
  const recommendations = active ? getServicesByIds(active.serviceIds) : [];

  return (
    <section className="bg-gradient-to-b from-bhutan-blue-light/30 to-transparent px-4 py-16 dark:from-bhutan-blue/5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-bhutan-blue shadow-sm dark:bg-slate-900">
            <Lightbulb className="h-3.5 w-3.5" strokeWidth={1.75} />
            Smart Recommendations
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Not Sure What Service You Need?
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Let AI help you find the right government services</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {SCENARIO_PROMPTS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => {
                setActiveId(scenario.id);
                onAskAI(scenario.query);
              }}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                activeId === scenario.id
                  ? "border-bhutan-blue bg-bhutan-blue text-white shadow-md shadow-bhutan-blue/25"
                  : "border-slate-200 bg-white text-slate-700 hover:border-bhutan-blue/30 hover:text-bhutan-blue dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>

        {active && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10"
          >
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-bhutan-blue">
              <Sparkles className="h-4 w-4" strokeWidth={1.75} />
              AI recommends these services for you
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recommendations.map((service) => {
                const Icon = getServiceIcon(service);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onViewService(service)}
                    className="glass-card flex items-start gap-3 p-4 text-left transition-all hover:border-bhutan-blue/30 hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bhutan-blue-light text-bhutan-blue dark:bg-bhutan-blue/10">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{service.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{service.estimatedTime}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
