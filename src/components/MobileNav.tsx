"use client";

import { Grid3X3, Home, List, Search } from "lucide-react";

interface MobileNavProps {
  onSearch: () => void;
}

export function MobileNav({ onSearch }: MobileNavProps) {
  const items = [
    { icon: Home, label: "Home", href: "#" },
    { icon: Search, label: "Search", action: onSearch },
    { icon: List, label: "Top 20", href: "#top-20" },
    { icon: Grid3X3, label: "Services", href: "#directory" },
  ];

  return (
    <nav
      className="safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch justify-around px-1 pt-1">
        {items.map((item) => {
          const Icon = item.icon;
          const className =
            "touch-target flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-2 text-[11px] font-medium text-slate-500 transition-colors active:text-bhutan-blue";

          if (item.action) {
            return (
              <button key={item.label} type="button" onClick={item.action} className={className}>
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          }

          return (
            <a key={item.label} href={item.href} className={className}>
              <Icon className="h-5 w-5" strokeWidth={1.75} />
              <span className="truncate">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
