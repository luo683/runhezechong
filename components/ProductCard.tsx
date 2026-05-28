"use client";

import Link from "next/link";
import { Product } from "@/types";
import AddToCart from "./AddToCart";

const emojiMap: Record<string, string> = {
  digestion: "🍚", urinary: "💧", immunity: "🛡️", skincoat: "✨", oral: "🦷", calming: "🌿", teardrop: "👁️",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-warm-card border border-warm-border rounded-2xl overflow-hidden hover:border-warm-accent hover:shadow-xl hover:shadow-warm-accent/5 transition-all duration-500 hover:-translate-y-1">
      <Link href={`/products/${product.slug}`}>
        <div className="h-48 bg-gradient-to-b from-warm-border/20 to-warm-border/40 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
          {emojiMap[product.slug] || "🐾"}
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-warm-text mb-1 group-hover:text-warm-accent transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-warm-text-dim mb-3 line-clamp-2">{product.effects.join(" · ")}</p>
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-warm-accent">¥{product.price}</span>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
