"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-10 py-32 text-center">
        <h1 className="font-serif italic text-3xl text-warm-text mb-4">购物车是空的</h1>
        <p className="text-warm-text-dim mb-8">去给毛孩子挑点好东西吧</p>
        <Link href="/products" className="text-sm px-6 py-2 bg-warm-accent text-white rounded-full hover:bg-warm-accent/80 transition-colors">
          逛逛产品
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-10 py-16">
      <h1 className="font-serif italic text-3xl text-warm-text mb-10">购物车</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.product.slug} className="flex items-center gap-5 bg-warm-card border border-warm-border rounded-xl p-4">
            <div className="w-20 h-20 bg-warm-border/40 rounded-lg flex items-center justify-center text-2xl shrink-0">🐾</div>
            <div className="flex-1">
              <h3 className="font-medium text-warm-text">{item.product.name}</h3>
              <p className="text-sm text-warm-text-dim">¥{item.product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.product.slug, item.quantity - 1)} className="w-7 h-7 rounded-full border border-warm-border text-warm-text-dim hover:border-warm-accent">−</button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product.slug, item.quantity + 1)} className="w-7 h-7 rounded-full border border-warm-border text-warm-text-dim hover:border-warm-accent">+</button>
            </div>
            <div className="text-right">
              <p className="font-medium text-warm-text">¥{item.product.price * item.quantity}</p>
              <button onClick={() => removeItem(item.product.slug)} className="text-xs text-warm-text-dim hover:text-red-500 mt-1">删除</button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-warm-border pt-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-warm-text-dim">合计</p>
          <p className="text-2xl font-medium text-warm-text">¥{totalPrice()}</p>
        </div>
        <Link href="/checkout" className="px-8 py-3 bg-warm-accent text-white rounded-full text-sm hover:bg-warm-accent/80 transition-colors">
          去结算
        </Link>
      </div>
    </div>
  );
}
