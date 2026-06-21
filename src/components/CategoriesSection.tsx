"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { CATEGORY_GRID, getServicesByCategory } from "@/lib/data";
import { getCategoryIcon } from "@/lib/utils";
import type { Service } from "@/types";

interface CategoriesSectionProps {
  onViewService: (service: Service) => void;
}

export function CategoriesSection({ onViewService }: CategoriesSectionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedCategory = CATEGORY_GRID.find((c) => c.id === selected);
  const categoryServices = selectedCategory ? getServicesByCategory(selectedCategory.categoryKey) : [];

  return (
    <section id="categories" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="section-title">Service Categories</h2>
          <p className="mt-2 text-sm text-slate-600 sm:mt-3 sm:text-base dark:text-slate-400">
            Browse by category and find the services you need
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORY_GRID.map((category, i) => {
            const Icon = getCategoryIcon(category.categoryKey);
            const count = getServicesByCategory(category.categoryKey).length;

            return (
              <motion.button
                key={category.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -2 }}
                onClick={() => setSelected(category.id)}
                className="glass-card group flex flex-col items-start p-5 text-left transition-all hover:border-bhutan-blue/30 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-bhutan-blue-light text-bhutan-blue transition-colors group-hover:bg-bhutan-blue group-hover:text-white dark:bg-bhutan-blue/10">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{category.name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
                <span className="mt-3 text-xs font-medium text-bhutan-blue">{count} services</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-sm sm:items-center sm:p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                onClick={(e) => e.stopPropagation()}
                className="safe-bottom max-h-[88dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:max-h-[80vh] sm:rounded-2xl sm:p-6 dark:bg-slate-900"
                role="dialog"
                aria-labelledby="category-dialog-title"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 id="category-dialog-title" className="text-xl font-bold text-slate-900 dark:text-white">
                      {selectedCategory.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Services in this category
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                </div>

                <p className="mb-4 rounded-xl bg-bhutan-blue-light/50 p-4 text-sm leading-relaxed text-slate-700 dark:bg-bhutan-blue/10 dark:text-slate-300">
                  {selectedCategory.description}. Select a service below to view step-by-step guidance and access the official government portal.
                </p>

                <ul className="space-y-2">
                  {categoryServices.map((service) => (
                    <li key={service.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onViewService(service);
                          setSelected(null);
                        }}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-bhutan-blue/30 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{service.name}</p>
                          <p className="text-xs text-slate-500">{service.agency}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
