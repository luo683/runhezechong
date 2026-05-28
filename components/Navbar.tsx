"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { Sprout, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/products", label: "产品" },
  { href: "/consult", label: "AI 问诊" },
  { href: "/membership", label: "会员" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <header
        className={cn(
          "sticky top-4 z-50 mx-auto w-full max-w-3xl",
          "rounded-2xl border border-warm-border/50",
          "bg-warm-card/80 backdrop-blur-xl",
          "shadow-[0_4px_24px_rgba(0,0,0,0.04)]",
        )}
      >
        <nav className="flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-warm-border/30 transition-colors"
          >
            <Sprout className="size-5 text-warm-accent" />
            <span className="font-semibold text-base text-warm-text tracking-wide">
              润禾泽宠
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm text-warm-text-dim hover:text-warm-text hover:bg-warm-border/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="px-3 py-1.5 rounded-lg text-sm text-warm-text-dim hover:text-warm-text hover:bg-warm-border/30 transition-colors"
            >
              购物车
              {mounted && totalItems() > 0 && (
                <span className="ml-1 text-warm-accent font-medium">({totalItems()})</span>
              )}
            </Link>

            <Link
              href="/account"
              className="px-4 py-1.5 rounded-lg text-sm bg-warm-accent text-white hover:bg-warm-accent/80 transition-colors"
            >
              登录
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg border border-warm-border text-warm-text-dim hover:bg-warm-border/30 transition-colors"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slideout */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            />

            {/* Sheet */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-warm-card/95 backdrop-blur-xl border-r border-warm-border md:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-warm-border">
                <span className="font-semibold text-warm-text">润禾泽宠</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg hover:bg-warm-border/30 transition-colors"
                >
                  <X className="size-5 text-warm-text-dim" />
                </button>
              </div>

              <div className="grid gap-1 px-3 pt-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-base text-warm-text-dim hover:text-warm-text hover:bg-warm-border/20 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-warm-border flex gap-2">
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2 rounded-lg text-center text-sm border border-warm-border text-warm-text-dim hover:bg-warm-border/20 transition-colors"
                >
                  购物车
                </Link>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2 rounded-lg text-center text-sm bg-warm-accent text-white hover:bg-warm-accent/80 transition-colors"
                >
                  登录
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
