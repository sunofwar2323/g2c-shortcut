"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, ExternalLink, FileText, X } from "lucide-react";
import type { Service } from "@/types";

interface ServiceGuideModalProps {
  service: Service | null;
  onClose: () => void;
}

export function ServiceGuideModal({ service, onClose }: ServiceGuideModalProps) {
  if (!service) return null;

  const steps = [
    `Visit the official portal for ${service.agency}`,
    `Locate "${service.name}" in the services menu`,
    "Prepare required documents (CID and supporting forms as applicable)",
    "Complete the online application and submit",
    "Track your application status on the portal",
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-sm sm:items-center sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          onClick={(e) => e.stopPropagation()}
          className="safe-bottom max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:max-h-[85vh] sm:rounded-2xl sm:p-6 dark:bg-slate-900"
          role="dialog"
          aria-labelledby="service-guide-title"
        >
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-bhutan-blue">{service.category}</p>
              <h3 id="service-guide-title" className="mt-1 text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                {service.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{service.agency}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{service.description}</p>

          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" strokeWidth={1.75} />
              {service.estimatedTime ?? "Processing time varies"}
            </span>
          </div>

          <div className="mt-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <FileText className="h-4 w-4 text-bhutan-blue" strokeWidth={1.75} />
              Step-by-Step Guide
            </h4>
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bhutan-blue text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6">
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bhutan-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-bhutan-blue-dark"
            >
              Open Official Portal
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
            </a>
            {/* AI help button — disabled
            <button type="button" onClick={() => onAskAI(...)}>Ask AI for Help</button>
            */}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
