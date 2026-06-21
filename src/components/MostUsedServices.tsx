"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bookmark, Clock } from "lucide-react";
import { getFeaturedServices } from "@/lib/data";
import { getServiceIcon } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  isBookmarked: boolean;
  onBookmark: (id: number) => void;
  onView: (service: Service) => void;
}

function ServiceCard({ service, isBookmarked, onBookmark, onView }: ServiceCardProps) {
  const Icon = getServiceIcon(service);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group glass-card flex flex-col p-5 sm:p-6 hover:border-bhutan-blue/30 hover:shadow-lg hover:shadow-bhutan-blue/5"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bhutan-blue-light text-bhutan-blue transition-colors group-hover:bg-bhutan-blue group-hover:text-white dark:bg-bhutan-blue/10">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <button
          type="button"
          onClick={() => onBookmark(service.id)}
          className={`rounded-lg p-2 transition-colors ${
            isBookmarked
              ? "text-bhutan-blue"
              : "text-slate-300 hover:text-bhutan-blue dark:text-slate-600"
          }`}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark service"}
        >
          <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} strokeWidth={1.75} />
        </button>
      </div>

      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {service.description}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
        <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
        <span>{service.estimatedTime ?? "Varies"}</span>
      </div>

      <button
        type="button"
        onClick={() => onView(service)}
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all group-hover:border-bhutan-blue group-hover:bg-bhutan-blue group-hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
      >
        View Guide
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </motion.article>
  );
}

interface MostUsedServicesProps {
  isBookmarked: (id: number) => boolean;
  onBookmark: (id: number) => void;
  onView: (service: Service) => void;
}

export function MostUsedServices({ isBookmarked, onBookmark, onView }: MostUsedServicesProps) {
  const services = getFeaturedServices();

  return (
    <section id="services" className="section-padding bg-slate-50/50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="section-title">
            Most Used Services
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:mt-3 sm:text-base dark:text-slate-400">
            Quick access to the government services Bhutanese citizens use most
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
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
      </div>
    </section>
  );
}

export { ServiceCard };
