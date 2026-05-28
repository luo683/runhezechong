"use client";

import { useParams } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import AddToCart from "@/components/AddToCart";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-10 py-32 text-center">
        <h1 className="text-2xl text-warm-text mb-4">产品未找到</h1>
        <Link href="/products" className="text-warm-accent text-sm">← 返回产品列表</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-10 py-16">
      <Link href="/products" className="text-xs text-warm-text-dim hover:text-warm-accent transition-colors">
        ← 返回产品列表
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-8">
        <div className="h-64 lg:h-96 bg-warm-card border border-warm-border rounded-2xl flex items-center justify-center text-7xl">
          🐾
        </div>

        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">
            {product.tags.join(" · ")}
          </span>
          <h1 className="font-serif italic text-2xl lg:text-4xl text-warm-text mt-3 mb-4">{product.name}</h1>
          <p className="text-2xl font-medium text-warm-accent mb-6">¥{product.price}</p>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-warm-text mb-2">适用场景</h3>
            <div className="flex flex-wrap gap-2">
              {product.effects.map((e) => (
                <span key={e} className="text-xs px-3 py-1 bg-warm-border/30 rounded-full text-warm-text-dim">{e}</span>
              ))}
            </div>
          </div>

          <p className="text-sm text-warm-text-dim leading-relaxed mb-6">{product.description}</p>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-warm-text mb-2">喂食建议</h3>
            <ul className="text-xs text-warm-text-dim space-y-1">
              <li>小型犬/猫（&lt;5kg）：每日 {product.feedingGuide.small}</li>
              <li>中型犬（5-15kg）：每日 {product.feedingGuide.medium}</li>
              <li>大型犬（15-30kg）：每日 {product.feedingGuide.large}</li>
            </ul>
          </div>

          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
