"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { getTopServices } from "@/lib/data";
import { getServiceIcon } from "@/lib/utils";
import type { Service } from "@/types";

interface Top20MostUsedProps {
  onView: (service: Service) => void;
}

export function Top20MostUsed({ onView }: Top20MostUsedProps) {
  const services = getTopServices();

  return (
    <section id="top-20" className="bg-slate-50/50 px-4 py-16 dark:bg-slate-900/30 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-bhutan-teal">
              <TrendingUp className="h-4 w-4" strokeWidth={1.75} />
              Popular
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Top 20 Most Used Services
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              The government services Bhutanese citizens access most frequently
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-bhutan-teal-light px-4 py-1.5 text-sm font-semibold text-bhutan-teal dark:bg-bhutan-teal/10">
            Ranked by usage
          </span>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => {
            const Icon = getServiceIcon(service);
            return (
              <motion.button
                key={service.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -2 }}
                onClick={() => onView(service)}
                className="group glass-card flex items-center gap-3 p-4 text-left transition-all hover:border-bhutan-blue/30 hover:shadow-md hover:shadow-bhutan-blue/5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bhutan-blue text-sm font-bold text-white">
                  {service.topRank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-bhutan-blue dark:text-white">
                    {service.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{service.agency}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-bhutan-blue-light text-bhutan-blue group-hover:bg-bhutan-blue group-hover:text-white dark:bg-bhutan-blue/10 sm:flex">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-slate-300 transition-colors group-hover:text-bhutan-blue"
                    strokeWidth={1.75}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
