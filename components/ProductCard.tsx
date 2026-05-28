"use client";

import Link from "next/link";
import { Product } from "@/types";
import AddToCart from "./AddToCart";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-[4/3] bg-gradient-to-br from-warm-accent/5 to-warm-border/20 rounded-2xl flex items-center justify-center mb-4 group-hover:from-warm-accent/10 group-hover:to-warm-accent/5 transition-all duration-500">
          <div className="w-16 h-16 bg-gradient-to-br from-warm-accent/20 to-warm-accent/5 rounded-full group-hover:scale-110 transition-transform duration-500" />
        </div>
      </Link>
      <div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif italic text-lg text-warm-text mb-1 group-hover:text-warm-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-warm-text-dim/60 mb-3">{product.effects[0]}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-warm-text">¥{product.price}</span>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
