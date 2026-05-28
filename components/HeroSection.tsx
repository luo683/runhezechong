"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, fadeIn } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="relative grid grid-cols-2 min-h-[550px] bg-gradient-to-br from-[#ede6d9] to-[#e0d4be] overflow-hidden">
      {/* Decorative circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.06 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-warm-accent"
      />

      <div className="flex flex-col justify-center px-16 py-20 relative z-10">
        <motion.span
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-xs tracking-[0.3em] uppercase text-warm-accent mb-6 border border-warm-accent-light/40 rounded-full px-4 py-1.5 w-fit"
        >
          药食同源 · 日常养护
        </motion.span>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-brush text-7xl leading-tight text-warm-text mb-4 tracking-[0.05em]"
        >
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="block"
          >
            润养本草
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="block"
          >
            恩泽爱宠
          </motion.span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-serif italic text-2xl text-warm-text-dim mb-6"
        >
          Herbal nutrition, honest love.
        </motion.p>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="text-base leading-relaxed text-warm-text-dim mb-8 max-w-md"
        >
          以传统本草智慧为根基，用现代营养科学为每一只毛孩子打造真正健康的日常饮食。
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-warm-text border-b-2 border-warm-accent pb-1.5 w-fit hover:text-warm-accent transition-colors"
          >
            探索产品 →
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        className="flex items-center justify-center relative"
      >
        <div className="w-80 h-80 bg-warm-card rounded-3xl flex items-center justify-center text-7xl shadow-2xl shadow-warm-accent/5 rotate-1">
          🐾
        </div>
      </motion.div>
    </section>
  );
}
