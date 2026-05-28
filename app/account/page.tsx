"use client";

import { useState } from "react";

export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <div className="max-w-md mx-auto px-10 py-20">
        <h1 className="font-serif italic text-3xl text-warm-text text-center mb-10">登录</h1>
        <div className="space-y-3">
          <input className="w-full px-4 py-2.5 bg-warm-card border border-warm-border rounded-lg text-sm" placeholder="邮箱地址" type="email" />
          <input className="w-full px-4 py-2.5 bg-warm-card border border-warm-border rounded-lg text-sm" placeholder="密码" type="password" />
          <button
            onClick={() => setLoggedIn(true)}
            className="w-full py-2.5 bg-warm-accent text-white rounded-full text-sm hover:bg-warm-accent/80 transition-colors"
          >
            登录
          </button>
        </div>
        <p className="text-center text-xs text-warm-text-dim mt-4">
          还没有账号？<button className="text-warm-accent hover:underline">注册</button>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-10 py-16">
      <h1 className="font-serif italic text-3xl text-warm-text mb-10">我的账户</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <div className="flex lg:block gap-2 lg:space-y-1 overflow-x-auto">
          {["个人信息", "我的订单", "会员权益", "退出登录"].map((tab) => (
            <button
              key={tab}
              onClick={() => tab === "退出登录" && setLoggedIn(false)}
              className="block w-full text-left text-sm py-2 px-3 rounded-lg text-warm-text-dim hover:bg-warm-card hover:text-warm-text transition-colors"
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          <div className="bg-warm-card border border-warm-border rounded-xl p-6">
            <h2 className="text-sm font-medium text-warm-text mb-4">个人信息</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-warm-text-dim">昵称</span>
                <span className="text-warm-text">毛孩子家长</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm-text-dim">邮箱</span>
                <span className="text-warm-text">petparent@example.com</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm-text-dim">会员等级</span>
                <span className="text-warm-accent font-medium">普通会员</span>
              </div>
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

          <div className="bg-warm-card border border-warm-border rounded-xl p-6 mt-4">
            <h2 className="text-sm font-medium text-warm-text mb-4">收货地址</h2>
            <p className="text-sm text-warm-text-dim">
              北京市朝阳区某某街道 123 号 · 张三 · 138****8888
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
