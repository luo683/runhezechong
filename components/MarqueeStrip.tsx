"use client";

import { motion } from "framer-motion";

const phrase = "药食同源 · 人类食用级标准 · 兽医联合研发 · 不添加无用填充物";

export default function MarqueeStrip() {
  return (
    <div className="bg-warm-dark text-warm-gold/70 py-4 overflow-hidden border-y border-warm-gold/10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-0 whitespace-nowrap w-max"
      >
        {[0, 1, 2, 3].map((_, i) => (
          <span key={i} className="text-xs tracking-[0.3em] uppercase px-8">
            {phrase}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
