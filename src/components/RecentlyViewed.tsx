"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp } from "lucide-react";
import { getServiceById, getTopServices } from "@/lib/data";
import { getServiceIcon } from "@/lib/utils";
import type { Service } from "@/types";

interface RecentlyViewedProps {
  recentIds: number[];
  onView: (service: Service) => void;
}

export function RecentlyViewed({ recentIds, onView }: RecentlyViewedProps) {
  const services = recentIds.map((id) => getServiceById(id)).filter((s): s is Service => Boolean(s));
  if (services.length === 0) return null;

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recently Viewed</h2>
        </div>
        <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {services.map((service) => {
            const Icon = getServiceIcon(service);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onView(service)}
                className="glass-card flex shrink-0 items-center gap-3 px-4 py-3 transition-all hover:border-bhutan-blue/30"
              >
                <Icon className="h-4 w-4 text-bhutan-blue" strokeWidth={1.75} />
                <span className="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PopularTrends({ onView }: { onView: (service: Service) => void }) {
  const topServices = getTopServices().slice(0, 6);

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-bhutan-teal" strokeWidth={1.75} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Popular Services Trending</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topServices.map((service, i) => (
            <motion.button
              key={service.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onView(service)}
              className="glass-card flex items-center gap-4 p-4 text-left transition-all hover:border-bhutan-blue/30"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bhutan-blue text-sm font-bold text-white">
                {service.topRank}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{service.name}</p>
                <p className="text-xs text-slate-500">{service.agency}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
