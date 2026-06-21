"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-4 py-12 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bhutan-blue to-bhutan-teal text-white">
            <Building2 className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Built to help every Bhutanese citizen access government services with confidence.
          </p>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-500 dark:text-slate-500">
            Smarter G2C Station is an independent educational platform that guides users to official government services and portals.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-xs text-slate-400"
          >
            &copy; {new Date().getFullYear()} Smarter G2C Station. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
