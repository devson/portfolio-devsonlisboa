"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function Reveal({ children, delay = 0, className, direction = "up" }: RevealProps) {
  const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <motion.div
      className={cn("w-full", className)}
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // The "crisp" easing from tailwind config
      }}
    >
      {children}
    </motion.div>
  );
}
