"use client";

import { motion } from "framer-motion";

const items = [
  "药食同源 · 人类食用级标准",
  "兽医联合研发",
  "不添加无用填充物",
];

export default function MarqueeStrip() {
  return (
    <div className="bg-warm-dark text-warm-gold/80 py-3.5 overflow-hidden text-xs tracking-[0.2em] uppercase border-b border-warm-gold/10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap w-max"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-16">
            {item}
            <span className="text-warm-gold/30">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
