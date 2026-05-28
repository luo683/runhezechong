"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function EditorialSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-warm-dark text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-10 py-16 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-warm-gold/60 mb-6 block">
              Philosophy
            </span>
            <h2 className="font-serif italic text-3xl lg:text-5xl leading-[1.15] text-white mb-8">
              如果配料表上
              <br />
              有你不认识的词，
              <br />
              <span className="text-warm-gold">你的宠物</span>
              <br />
              <span className="text-warm-gold">也不应该认识。</span>
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-warm-gold/70 hover:text-warm-gold transition-colors"
            >
              <span className="w-8 h-px bg-warm-gold/30" />
              了解我们的故事
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm text-white/50 leading-relaxed space-y-4"
          >
            <p>
              全部使用药食同源目录品种——山药、茯苓、枸杞、山楂……这些你厨房里就有的食材。
              我们不凭空想象配方，每一个成分的选择都有科学依据和临床验证。
            </p>
            <p>
              我们相信，真正的营养不应该来自各种化学添加剂，而应该来自大自然已经准备好的东西。
              用传统本草智慧做基础，用现代营养科学做验证。
            </p>
            {/* 装饰数字 */}
            <div className="pt-6 lg:pt-8 flex gap-8 lg:gap-12">
              <div>
                <span className="font-serif italic text-4xl text-warm-gold">7</span>
                <span className="block text-xs text-white/30 mt-1">款核心配方</span>
              </div>
              <div>
                <span className="font-serif italic text-4xl text-warm-gold">5000+</span>
                <span className="block text-xs text-white/30 mt-1">只猫狗已验证</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
