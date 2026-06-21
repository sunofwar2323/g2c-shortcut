"use client";

import { Bot, Grid3X3, Home, Search } from "lucide-react";

interface MobileNavProps {
  onSearch: () => void;
  onChat: () => void;
}

export function MobileNav({ onSearch, onChat }: MobileNavProps) {
  const items = [
    { icon: Home, label: "Home", href: "#" },
    { icon: Search, label: "Search", action: onSearch },
    { icon: Bot, label: "AI Chat", action: onChat },
    { icon: Grid3X3, label: "Services", href: "#directory" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const className =
            "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-bhutan-blue";

          if (item.action) {
            return (
              <button key={item.label} type="button" onClick={item.action} className={className}>
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                {item.label}
              </button>
            );
          }

          return (
            <a key={item.label} href={item.href} className={className}>
              <Icon className="h-5 w-5" strokeWidth={1.75} />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
