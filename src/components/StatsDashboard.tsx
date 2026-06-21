"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { STATS } from "@/lib/data";

export function StatsDashboard() {
  return (
    <section className="section-padding border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="section-title">Platform Overview</h2>
          <p className="mt-2 text-sm text-slate-600 sm:mt-3 sm:text-base dark:text-slate-400">
            Trusted guidance for Bhutan&apos;s digital government services
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-4 text-center sm:p-6"
            >
              <p className="text-2xl font-bold text-bhutan-blue sm:text-3xl lg:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} text={stat.text} />
              </p>
              <p className="mt-1.5 text-xs font-medium text-slate-600 sm:mt-2 sm:text-sm dark:text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
