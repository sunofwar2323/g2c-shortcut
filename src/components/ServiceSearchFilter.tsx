"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ServiceCard } from "@/components/MostUsedServices";
import { CATEGORIES, CATEGORY_SHORT_LABELS, filterServices } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceSearchFilterProps {
  isBookmarked: (id: number) => boolean;
  onBookmark: (id: number) => void;
  onView: (service: Service) => void;
  externalQuery?: string;
  onQueryChange?: (query: string) => void;
}

export function ServiceSearchFilter({
  isBookmarked,
  onBookmark,
  onView,
  externalQuery,
  onQueryChange,
}: ServiceSearchFilterProps) {
  const [query, setQuery] = useState(externalQuery ?? "");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (externalQuery !== undefined) {
      setQuery(externalQuery);
    }
  }, [externalQuery]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    onQueryChange?.(value);
  };

  const filtered = useMemo(
    () => filterServices(query, activeCategory),
    [query, activeCategory]
  );

  const chips = useMemo(
    () => [
      { label: "All", value: "all" },
      ...CATEGORIES.map((c) => ({ label: CATEGORY_SHORT_LABELS[c] ?? c, value: c })),
    ],
    []
  );

  const clearFilters = () => {
    handleQueryChange("");
    setActiveCategory("all");
  };

  return (
    <section id="directory" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-bhutan-blue">
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
            Search & Filter
          </div>
          <h2 className="section-title">
            Browse All Government Services
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:mt-3 sm:text-base dark:text-slate-400">
            Search by name, agency, or description. Filter by Identity, Marriage, Business, Tax, and more.
          </p>
        </motion.div>

        <div className="glass-card mb-6 p-4 sm:p-5">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search services, categories, agencies..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-base text-slate-900 placeholder:text-slate-400 focus:border-bhutan-blue focus:outline-none focus:ring-2 focus:ring-bhutan-blue/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              aria-label="Search all government services"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            )}
          </div>

          <div className="mt-4 overflow-x-auto pb-1 hide-scrollbar">
            <div className="flex w-max min-w-full gap-2 sm:flex-wrap sm:w-auto" role="group" aria-label="Filter by category">
              {chips.map((chip) => (
                <button
                  key={chip.value}
                  type="button"
                  onClick={() => setActiveCategory(chip.value)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === chip.value
                      ? "border-bhutan-blue bg-bhutan-blue text-white shadow-sm shadow-bhutan-blue/20"
                      : "border-slate-200 bg-white text-slate-600 hover:border-bhutan-blue/30 hover:text-bhutan-blue dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                  )}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "result" : "results"}
            {activeCategory !== "all" && (
              <span>
                {" "}
                in <span className="font-medium text-bhutan-blue">{CATEGORY_SHORT_LABELS[activeCategory] ?? activeCategory}</span>
              </span>
            )}
          </p>
          {(query || activeCategory !== "all") && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-bhutan-blue hover:text-bhutan-blue-dark"
            >
              Clear all filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card py-16 text-center">
            <Search className="mx-auto mb-4 h-10 w-10 text-slate-300" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No services found</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try adjusting your search or selecting a different category.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-bhutan-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-bhutan-blue-dark"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
              >
                <ServiceCard
                  service={service}
                  isBookmarked={isBookmarked(service.id)}
                  onBookmark={onBookmark}
                  onView={onView}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
