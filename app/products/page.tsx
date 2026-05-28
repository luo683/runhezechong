"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const filters = ["全部", "肠胃调理", "泌尿护理", "免疫力", "美毛", "口腔", "情绪", "泪痕"];
const filterMap: Record<string, string[]> = {
  "肠胃调理": ["消化不良", "软便拉稀", "食欲不振"],
  "泌尿护理": ["尿路问题", "结石体质", "排尿不畅"],
  "免疫力": ["体质虚弱", "病后恢复", "易生病"],
  "美毛": ["掉毛严重", "毛枯无光", "皮屑瘙痒"],
  "口腔": ["口臭", "牙龈红肿", "牙结石"],
  "情绪": ["焦虑不安", "分离焦虑", "易惊惧"],
  "泪痕": ["泪痕重", "眼分泌物多", "眼周红肿"],
};

export default function ProductsPage() {
  const [filter, setFilter] = useState("全部");

  const filtered = filter === "全部"
    ? products
    : products.filter((p) => p.effects.some((e) => filterMap[filter]?.includes(e)));

  return (
    <div className="max-w-6xl mx-auto px-10 py-16">
      <div className="text-center mb-12">
        <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">All Products</span>
        <h1 className="font-serif italic text-4xl text-warm-text mt-3 mb-2">全部产品</h1>
        <p className="text-sm text-warm-text-dim">药食同源 · 猫狗通用 · 拌粮食用</p>
      </div>

      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-4 py-2 rounded-full border transition-colors ${
              filter === f
                ? "bg-warm-accent text-white border-warm-accent"
                : "border-warm-border text-warm-text-dim hover:border-warm-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-warm-text-dim py-16">该分类暂无产品</p>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
