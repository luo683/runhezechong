import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

const featured = ["digestion", "immunity", "skincoat", "calming"];

export default function ProductShowcase() {
  const featuredProducts = featured.map((slug) => products.find((p) => p.slug === slug)!);

  return (
    <section className="px-10 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">热门单品</span>
        <h2 className="font-serif italic text-3xl text-warm-text mt-3 mb-2">精心研制的每一款</h2>
        <p className="text-sm text-warm-text-dim">找到最适合你家毛孩子的那一份</p>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {featuredProducts.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link href="/products" className="text-xs tracking-[0.15em] uppercase text-warm-accent border-b border-warm-accent pb-1">
          查看全部 7 款产品 →
        </Link>
      </div>
    </section>
  );
}
