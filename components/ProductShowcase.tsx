"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { staggerContainer } from "@/lib/animations";

const featured = ["digestion", "immunity", "skincoat", "calming"];

export default function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const featuredProducts = featured.map((slug) => products.find((p) => p.slug === slug)!);

  return (
    <section className="px-10 py-24 max-w-6xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">热门单品</span>
        <h2 className="font-serif italic text-3xl text-warm-text mt-3 mb-2">精心研制的每一款</h2>
        <p className="text-sm text-warm-text-dim">找到最适合你家毛孩子的那一份</p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-4 gap-5"
      >
        {featuredProducts.map((p, i) => (
          <motion.div
            key={p.slug}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: i * 0.1 },
              },
            }}
            className={i % 2 === 1 ? "mt-8" : ""}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-12"
      >
        <Link href="/products" className="text-xs tracking-[0.15em] uppercase text-warm-accent border-b border-warm-accent pb-1 hover:text-warm-accent/70 transition-colors">
          查看全部 7 款产品 →
        </Link>
      </motion.div>
    </section>
  );
}
