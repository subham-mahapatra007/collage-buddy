"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(59, 130, 246, 0.15)"
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.02)",
  hoverEffect = true,
}: GlassCardProps) {
  const cardContent = (
    <div
      className={`glass-card rounded-2xl p-5 border border-zinc-800/60 shadow-xl overflow-hidden relative ${className}`}
      style={{
        boxShadow: `0 10px 30px -10px ${glowColor}`,
      }}
    >
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-white/[0.04] pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}
