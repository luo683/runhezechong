"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { reviews, type Review } from "@/lib/reviews";
import { Star, MessageSquare, PawPrint } from "lucide-react";

const col1 = reviews.slice(0, 3);
const col2 = reviews.slice(3, 6);

// A single review card
function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  return (
    <motion.li
      key={`${review.id}-${index}`}
      whileHover={{
        scale: 1.03,
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(139,90,43,0.1)",
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      className="p-6 rounded-2xl border border-warm-border bg-warm-card shadow-sm max-w-xs w-full transition-all duration-300 cursor-default select-none list-none"
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: review.rating }).map((_, j) => (
          <Star key={j} className="size-3.5 text-warm-accent fill-warm-accent" />
        ))}
      </div>

      <p className="text-sm text-warm-text-dim leading-relaxed mb-5">{review.content}</p>

      <div className="flex items-center gap-3">
        {/* Avatar placeholder — gradient circle */}
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-warm-accent/30 to-warm-accent/10 flex items-center justify-center shrink-0">
          <PawPrint className="size-5 text-warm-accent/60" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-sm text-warm-text truncate">{review.name}</span>
          <span className="text-xs text-warm-text-dim/60">
            {review.petType === "猫" ? "🐱" : "🐶"} {review.petName} · {review.product}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

// Scrolling column
function ReviewColumn({
  reviews,
  duration,
  className,
}: {
  reviews: Review[];
  duration: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4 bg-transparent m-0 p-0"
      >
        {[...Array(3)].map((_, dup) =>
          reviews.map((r: Review, i: number) => (
            <ReviewCard key={`${dup}-${i}`} review={r} index={i} />
          ))
        )}
      </motion.ul>
    </div>
  );
}

export default function ReviewsPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-5 sm:px-10 py-32 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="text-5xl mb-6"
        >
          ❤️
        </motion.div>
        <h1 className="font-serif italic text-3xl text-warm-text mb-4">感谢你的评价！</h1>
        <p className="text-warm-text-dim text-sm">你的分享会帮助更多毛孩子找到合适的养护方案</p>
        <button
          onClick={() => { setSubmitted(false); setShowForm(false); }}
          className="mt-8 text-sm text-warm-accent border-b border-warm-accent pb-1"
        >
          ← 返回
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="py-12 lg:py-20 relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="px-5 sm:px-10"
      >
        <div className="flex flex-col items-center mb-14">
          <div className="border border-warm-border py-1 px-4 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase text-warm-accent bg-warm-accent/5">
            用户评价
          </div>
          <h2 className="font-serif italic text-3xl lg:text-4xl text-warm-text mt-5 mb-3">
            毛孩子家长们怎么说
          </h2>
          <p className="text-sm text-warm-text-dim max-w-sm text-center">
            真实用户反馈，每一份体验都是我们前进的动力
          </p>
        </div>
      </motion.div>

      {/* Scroll Columns */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center gap-4 sm:gap-6 px-2 sm:px-5
          [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]
          max-h-[700px] overflow-hidden"
        role="region"
        aria-label="滚动评价"
      >
        <ReviewColumn reviews={col1} duration={25} />
        <ReviewColumn reviews={col2} className="hidden md:block" duration={30} />
        <ReviewColumn reviews={col1.reverse()} className="hidden lg:block" duration={22} />
      </motion.div>

      {/* Write Review */}
      <div className="px-5 sm:px-10 text-center mt-16">
        {!showForm ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-warm-accent text-white rounded-full text-sm hover:bg-warm-accent/80 transition-colors"
          >
            <MessageSquare className="size-4" />
            写评价
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="max-w-lg mx-auto bg-warm-card border border-warm-border rounded-2xl p-6 text-left"
          >
            <h3 className="font-serif italic text-xl text-warm-text mb-5">分享你的体验</h3>
            <div className="space-y-3 mb-5">
              <input className="w-full px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm focus:outline-none focus:border-warm-accent" placeholder="你的昵称" />
              <input className="w-full px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm focus:outline-none focus:border-warm-accent" placeholder="宠物名字" />
              <div className="flex gap-3">
                <select className="flex-1 px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm text-warm-text-dim focus:outline-none focus:border-warm-accent">
                  <option value="">宠物类型</option>
                  <option value="猫">猫 🐱</option>
                  <option value="狗">狗 🐶</option>
                </select>
                <select className="flex-1 px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm text-warm-text-dim focus:outline-none focus:border-warm-accent">
                  <option value="">使用的产品</option>
                  <option>健脾和胃</option><option>利尿通淋</option><option>免疫增强</option>
                  <option>美毛护肤</option><option>口腔健康</option><option>安神舒缓</option>
                  <option>清热去泪痕</option>
                </select>
              </div>
              <textarea
                className="w-full px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm focus:outline-none focus:border-warm-accent min-h-[100px]"
                placeholder="分享你的使用体验..."
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 py-2.5 bg-warm-accent text-white rounded-xl text-sm hover:bg-warm-accent/80 transition-colors"
              >
                提交评价
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 border border-warm-border rounded-xl text-sm text-warm-text-dim hover:bg-warm-border/20 transition-colors"
              >
                取消
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
