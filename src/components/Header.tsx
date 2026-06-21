"use client";

import { Building2, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSearchClick?: () => void;
  onChatClick?: () => void;
}

export function Header({ onSearchClick, onChatClick }: HeaderProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-bhutan-blue to-bhutan-teal text-white shadow-md shadow-bhutan-blue/20">
            <Building2 className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Smarter G2C Station</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your AI Guide to Bhutan Government Services</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {[
            { href: "#search", label: "Search" },
            { href: "#top-20", label: "Top 20" },
            { href: "#directory", label: "All Services" },
            { href: "#assistant", label: "AI Assistant" },
            { href: "#categories", label: "Categories" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchClick}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
            aria-label="Focus search"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
          </button>

          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" strokeWidth={1.75} />
              ) : (
                <Sun className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onChatClick}
            className={cn(
              "hidden rounded-xl bg-bhutan-blue px-4 py-2 text-sm font-medium text-white shadow-md shadow-bhutan-blue/25 transition-all hover:bg-bhutan-blue-dark sm:inline-flex"
            )}
          >
            Ask AI
          </button>
        </div>
      </div>
    </header>
  );
}
