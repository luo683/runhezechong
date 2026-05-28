"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-b from-[#ede6d9] via-[#ede6d9] to-warm-bg overflow-hidden">
      {/* 背景纹理 — 大圆 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-warm-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-warm-accent/8" />

      <div className="max-w-6xl mx-auto px-10 w-full">
        <div className="grid grid-cols-[1.3fr_0.7fr] gap-0 items-center">
          {/* 左 */}
          <div className="relative z-10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-warm-accent/70 mb-8 block">
                药食同源 · 草本养护
              </span>

              <h1 className="font-brush text-8xl leading-[1.05] text-warm-text mb-6 tracking-wide">
                润养本草
                <br />
                <span className="text-warm-accent">恩泽爱宠</span>
              </h1>

              <p className="font-serif italic text-2xl text-warm-text-dim/60 mb-10">
                Herbal nutrition,
                <br />
                honest love.
              </p>

              <p className="text-sm text-warm-text-dim/70 leading-relaxed mb-10 max-w-sm">
                全部使用药食同源食材，日常食用级安全标准。
                不做宠物爱吃的垃圾食品，只做它们身体真正需要的。
              </p>

              <Link
                href="/products"
                className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-warm-text group"
              >
                <span className="w-8 h-px bg-warm-accent/40 group-hover:w-12 transition-all" />
                探索产品
              </Link>
            </motion.div>
          </div>

          {/* 右 — 大图形 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-72 h-72 bg-gradient-to-br from-warm-accent/8 to-warm-accent/3 rounded-full flex items-center justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-warm-accent/15 to-warm-accent/5 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-warm-accent/20 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-warm-bg" />
    </section>
  );
}
