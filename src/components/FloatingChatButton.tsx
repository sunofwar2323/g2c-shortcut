"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingChatButtonProps {
  onClick: () => void;
}

export function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-bhutan-blue to-bhutan-teal text-white shadow-lg shadow-bhutan-blue/30 sm:bottom-6 sm:right-6"
      aria-label="Open AI chat assistant"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
      <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bhutan-teal opacity-75" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-bhutan-teal" />
      </span>
    </motion.button>
  );
}
