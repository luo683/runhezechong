"use client";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart";

export default function AddToCart({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <button
      onClick={() => addItem(product)}
      className="text-xs px-3 py-1.5 bg-warm-accent text-white rounded-full hover:bg-warm-accent/80 transition-colors"
    >
      加入购物车
    </button>
  );
}
