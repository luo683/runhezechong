"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TestimonialGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-10 py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-warm-accent/70 mb-8 block">
          They Said
        </span>

        <blockquote className="font-serif italic text-3xl sm:text-4xl lg:text-6xl leading-[1.2] text-warm-text max-w-full lg:max-w-3xl mb-10 border-none p-0 m-0">
          "换了润禾泽宠之后，
          <br />
          <span className="text-warm-accent">我家猫的毛</span>
          <br />
          掉了少了一半。"
        </blockquote>

        <p className="text-sm text-warm-text-dim flex items-center gap-3">
          <span className="w-8 h-px bg-warm-border" />
          @catmom_lily · 小红书
        </p>
      </motion.div>
    </section>
  );
}
