"use client";

import * as React from "react";

import { motion } from "motion/react";

export function ShiningText({ text, className, delay, duration, icon }) {
  return (
    <motion.h1
      className={`bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text text-base font-regular text-transparent ${className}`}
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "linear",
      }}
    >
      <span className="flex items-center gap-2">
        {icon} {text}
      </span>
    </motion.h1>
  );
}
