"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

const links = [
  { href: "/products", label: "产品" },
  { href: "/consult", label: "AI 问诊" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 bg-warm-card/80 backdrop-blur-xl border-b border-warm-border/50 shadow-[0_1px_20px_rgba(0,0,0,0.03)]">
      <Link href="/" className="text-lg font-semibold tracking-wide text-warm-accent hover:text-warm-accent/80 transition-colors">
        润禾泽宠
      </Link>

      <ul className="flex gap-8 text-xs tracking-[0.15em] uppercase text-warm-text-dim">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-warm-text transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-warm-accent hover:after:w-full after:transition-all">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-5 text-xs text-warm-text-dim">
        <Link href="/cart" className="hover:text-warm-text transition-colors">
          购物车{mounted && totalItems() > 0 && ` (${totalItems()})`}
        </Link>
        <Link href="/account" className="hover:text-warm-text transition-colors">
          登录
        </Link>
      </div>
    </nav>
  );
}
