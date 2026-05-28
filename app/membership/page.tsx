"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { membershipPlans } from "@/lib/membership";
import { Check, Sparkles, Crown } from "lucide-react";

export default function MembershipPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-10 py-32 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 150 }}
          className="text-6xl mb-6"
        >
          🎉
        </motion.div>
        <h1 className="font-serif italic text-3xl text-warm-text mb-4">申请已提交！</h1>
        <p className="text-warm-text-dim mb-2">我们会在 1 个工作日内联系你确认会员信息</p>
        <p className="text-warm-text-dim text-sm">如有疑问请联系客服微信</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm text-warm-accent border-b border-warm-accent pb-1"
        >
          ← 返回
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-10 py-20" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">Membership</span>
        <h1 className="font-serif italic text-4xl text-warm-text mt-3 mb-4">加入会员</h1>
        <p className="text-sm text-warm-text-dim max-w-lg mx-auto">
          选一个适合你的方案，享受更多专属权益。后期会员方案可直接在配置文件中修改。
        </p>
      </motion.div>

      {/* Plans */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-20"
      >
        {membershipPlans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
            className={`relative bg-warm-card border-2 ${plan.color} rounded-2xl p-6 flex flex-col ${
              plan.featured ? "shadow-lg shadow-warm-accent/5" : ""
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warm-accent text-white text-xs px-4 py-1 rounded-full flex items-center gap-1">
                <Crown className="size-3" /> 推荐
              </div>
            )}

            <div className="mb-5">
              <h3 className="font-semibold text-warm-text text-lg mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                {plan.price === 0 ? (
                  <span className="text-3xl font-bold text-warm-text">免费</span>
                ) : (
                  <>
                    <span className="text-sm text-warm-text-dim">¥</span>
                    <span className="text-3xl font-bold text-warm-text">{plan.price}</span>
                    <span className="text-sm text-warm-text-dim">/{plan.period}</span>
                  </>
                )}
              </div>
            </div>

            <ul className="space-y-2.5 flex-1 mb-5">
              {plan.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-warm-text-dim">
                  <Check className="size-4 text-warm-accent shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <a
              href="#signup"
              className={`block text-center py-2.5 rounded-xl text-sm font-medium transition-colors ${
                plan.featured
                  ? "bg-warm-accent text-white hover:bg-warm-accent/80"
                  : "bg-warm-border/30 text-warm-text hover:bg-warm-border/50"
              }`}
            >
              {plan.price === 0 ? "免费加入" : "立即加入"}
            </a>
          </motion.div>
        ))}
      </motion.div>

      {/* Signup Form */}
      <motion.div
        id="signup"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-lg mx-auto bg-warm-card border border-warm-border rounded-2xl p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="size-5 text-warm-accent" />
          <h3 className="font-serif italic text-xl text-warm-text">办理会员</h3>
        </div>

        <div className="space-y-3 mb-6">
          <input
            className="w-full px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm focus:outline-none focus:border-warm-accent"
            placeholder="姓名"
          />
          <input
            className="w-full px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm focus:outline-none focus:border-warm-accent"
            placeholder="手机号"
            type="tel"
          />
          <input
            className="w-full px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm focus:outline-none focus:border-warm-accent"
            placeholder="邮箱（选填）"
            type="email"
          />
          <select className="w-full px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm text-warm-text-dim focus:outline-none focus:border-warm-accent">
            {membershipPlans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}{p.price > 0 ? ` — ¥${p.price}/${p.period}` : " — 免费"}
              </option>
            ))}
          </select>
          <input
            className="w-full px-4 py-2.5 bg-warm-bg border border-warm-border rounded-xl text-sm focus:outline-none focus:border-warm-accent"
            placeholder="宠物昵称（选填）"
          />
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="w-full py-3 bg-warm-accent text-white rounded-xl text-sm font-medium hover:bg-warm-accent/80 transition-colors"
        >
          提交申请
        </button>
      </motion.div>
    </div>
  );
}
