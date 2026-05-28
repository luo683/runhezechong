"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function EditorialSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="border-t border-warm-border mx-10 max-w-6xl xl:mx-auto">
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-16 py-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">Our Philosophy</span>
          <h2 className="font-serif italic text-4xl text-warm-text mt-3 mb-5 leading-snug">
            如果配料表上有你不认识的词，<br />
            <span className="text-warm-accent">你的宠物也不应该认识。</span>
          </h2>
          <p className="text-sm text-warm-text-dim leading-relaxed mb-6">
            全部使用药食同源目录品种——山药、茯苓、枸杞、山楂……这些你厨房里就有的食材。
            我们不做宠物爱吃的垃圾食品，只做它们身体真正需要的日常养护。
          </p>
          <Link href="/about" className="text-xs tracking-[0.15em] uppercase text-warm-accent border-b border-warm-accent pb-1 hover:text-warm-accent/70 transition-colors">
            了解我们的故事 →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="h-96 bg-gradient-to-br from-warm-border/50 to-warm-border/20 rounded-3xl flex items-center justify-center text-6xl -rotate-1 shadow-lg" />
          {/* Overlap accent */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-warm-accent/5 rounded-2xl -z-10" />
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-warm-accent/8 rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
