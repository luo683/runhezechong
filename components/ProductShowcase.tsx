"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/products";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";

const featured = ["digestion", "immunity", "skincoat", "calming"];

export default function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const featuredProducts = featured.map((slug) => products.find((p) => p.slug === slug)!);

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-10 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-warm-accent/70">Products</span>
      </motion.div>

      <div className="space-y-0">
        {featuredProducts.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className={`group border-t border-warm-border py-10 flex items-center gap-8 ${
              i % 2 === 1 ? "flex-row-reverse" : ""
            }`}
          >
            {/* 图形 */}
            <Link href={`/products/${p.slug}`} className="w-32 h-32 shrink-0 bg-gradient-to-br from-warm-accent/5 to-warm-border/20 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-warm-accent/15 to-warm-accent/5 rounded-full" />
            </Link>

            {/* 信息 */}
            <div className="flex-1 min-w-0">
              <Link href={`/products/${p.slug}`}>
                <h3 className="font-serif italic text-2xl text-warm-text mb-1 group-hover:text-warm-accent transition-colors">
                  {p.name}
                </h3>
              </Link>
              <p className="text-sm text-warm-text-dim/70 mb-3">{p.effects.join(" · ")}</p>
              <p className="text-xs text-warm-text-dim/50 leading-relaxed max-w-md">{p.description}</p>
            </div>

            {/* 价格 & 加购 */}
            <div className="text-right shrink-0">
              <p className="text-lg font-medium text-warm-text mb-3">¥{p.price}</p>
              <AddToCart product={p} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="border-t border-warm-border pt-10 mt-0"
      >
        <Link
          href="/products"
          className="text-xs tracking-[0.2em] uppercase text-warm-text-dim/60 hover:text-warm-accent transition-colors"
        >
          查看全部 7 款产品 →
        </Link>
      </motion.div>
    </section>
  );
}
