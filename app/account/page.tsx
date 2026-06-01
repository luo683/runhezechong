"use client";

import { useState } from "react";

export default function AccountPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-10 py-12 lg:py-16">
      <h1 className="font-serif italic text-3xl text-warm-text mb-10">会员中心</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <div className="flex lg:block gap-2 lg:space-y-1 overflow-x-auto">
          {["个人信息", "我的订单", "会员权益"].map((tab) => (
            <button
              key={tab}
              className="block text-left text-sm py-2 px-3 rounded-lg text-warm-text-dim hover:bg-warm-card hover:text-warm-text transition-colors whitespace-nowrap"
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          <div className="bg-warm-card border border-warm-border rounded-xl p-6">
            <h2 className="text-sm font-medium text-warm-text mb-4">个人信息</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-warm-text-dim">昵称</span><span className="text-warm-text">宠友</span></div>
              <div className="flex justify-between"><span className="text-warm-text-dim">会员等级</span><span className="text-warm-accent font-medium">普通会员</span></div>
            </div>
          </div>
          <div className="bg-warm-card border border-warm-border rounded-xl p-6 mt-4">
            <h2 className="text-sm font-medium text-warm-text mb-4">会员权益</h2>
            <ul className="text-sm text-warm-text-dim space-y-2">
              <li>✨ 购物积分（每消费 ¥1 = 1 积分）</li>
              <li>📦 满 ¥299 包邮</li>
              <li>🎁 生日月专属折扣</li>
              <li>💬 润大夫无限次问诊</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
