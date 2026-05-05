"use client";
import { motion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  className,
  style,
  as = "div",
  amount = 0.22,
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.65,
        ease: [0.4, 0, 0.2, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </Tag>
  );
}
