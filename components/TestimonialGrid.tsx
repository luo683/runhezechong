"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TestimonialGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-10 py-24 max-w-6xl mx-auto">
      <div className="grid grid-cols-[1fr_2fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 grid-rows-2 gap-2 h-80"
        >
          <div className="row-span-2 bg-gradient-to-b from-warm-border/50 to-warm-border/20 rounded-2xl flex items-center justify-center text-sm text-warm-text-dim/50">宠物照片</div>
          <div className="bg-gradient-to-b from-warm-border/40 to-warm-border/10 rounded-2xl flex items-center justify-center text-sm text-warm-text-dim/50">宠物照片</div>
          <div className="bg-gradient-to-b from-warm-border/40 to-warm-border/10 rounded-2xl flex items-center justify-center text-sm text-warm-text-dim/50">宠物照片</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-warm-accent mb-6">They Said</span>
          <blockquote className="font-serif italic text-3xl leading-relaxed text-warm-text border-none p-0 m-0">
            "换了润禾泽宠之后，我家猫的毛掉了少了一半。"
          </blockquote>
          <p className="text-sm text-warm-text-dim mt-5">@catmom_lily · 小红书</p>
        </motion.div>
      </div>
    </section>
  );
}
