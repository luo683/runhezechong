"use client";

import { useCartStore } from "@/store/cart";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-2xl mx-auto px-10 py-32 text-center">
        <p className="text-warm-text-dim mb-4">购物车是空的</p>
        <Link href="/products" className="text-warm-accent text-sm">去逛逛</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-10 py-32 text-center">
        <div className="text-5xl mb-6">✅</div>
        <h1 className="font-serif italic text-3xl text-warm-text mb-4">下单成功！</h1>
        <p className="text-warm-text-dim mb-2">订单号：RHZC{Date.now().toString(36).toUpperCase()}</p>
        <p className="text-warm-text-dim mb-8">预计 2-3 个工作日送达</p>
        <Link href="/products" className="text-sm text-warm-accent border-b border-warm-accent pb-1">
          继续购物 →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-10 py-16">
      <h1 className="font-serif italic text-3xl text-warm-text mb-10">结算</h1>

      <div className="grid grid-cols-[1fr_300px] gap-12">
        <div>
          <h2 className="text-sm font-medium text-warm-text mb-4">收货信息</h2>
          <div className="space-y-3">
            <input className="w-full px-4 py-2.5 bg-warm-card border border-warm-border rounded-lg text-sm" placeholder="收货人姓名" />
            <input className="w-full px-4 py-2.5 bg-warm-card border border-warm-border rounded-lg text-sm" placeholder="手机号码" />
            <input className="w-full px-4 py-2.5 bg-warm-card border border-warm-border rounded-lg text-sm" placeholder="省 / 市 / 区" />
            <input className="w-full px-4 py-2.5 bg-warm-card border border-warm-border rounded-lg text-sm" placeholder="详细地址" />
          </div>

          <h2 className="text-sm font-medium text-warm-text mt-8 mb-4">支付方式</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="payment" defaultChecked className="accent-warm-accent" /> 微信支付
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="payment" className="accent-warm-accent" /> 支付宝
            </label>
          </div>
        </div>

        <div className="bg-warm-card border border-warm-border rounded-xl p-5 h-fit">
          <h2 className="text-sm font-medium text-warm-text mb-4">订单摘要</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.product.slug} className="flex justify-between text-xs text-warm-text-dim">
                <span>{item.product.name} × {item.quantity}</span>
                <span>¥{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-warm-border pt-3 flex justify-between font-medium text-warm-text">
            <span>合计</span>
            <span>¥{totalPrice()}</span>
          </div>
          <button
            onClick={() => { clearCart(); setSubmitted(true); }}
            className="w-full mt-5 py-3 bg-warm-accent text-white rounded-full text-sm hover:bg-warm-accent/80 transition-colors"
          >
            提交订单
          </button>
        </div>
      </div>
    </div>
  );
}
