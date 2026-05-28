"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SocialStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-10 pb-24 max-w-6xl mx-auto">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-serif italic text-2xl text-warm-text mb-8 flex items-center gap-3"
      >
        关注我们的小红书
        <span className="flex-1 h-px bg-warm-border" />
      </motion.h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-6 gap-2"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gradient-to-br from-warm-border/40 to-warm-border/10 rounded-xl flex items-center justify-center text-xs text-warm-text-dim/50 hover:scale-105 transition-transform" />
        ))}
      </motion.div>
    </section>
  );
}
