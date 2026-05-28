"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) setError("邮箱或密码错误");
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      await signIn("credentials", { email, password, redirect: false });
    } else {
      const data = await res.json();
      setError(data.error || "注册失败");
    }
    setLoading(false);
  };

  if (status === "loading") {
    return <div className="max-w-md mx-auto px-5 py-32 text-center text-warm-text-dim">加载中...</div>;
  }

  if (session?.user) {
    return (
      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-12 lg:py-16">
        <h1 className="font-serif italic text-3xl text-warm-text mb-10">我的账户</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
          <div className="flex lg:block gap-2 lg:space-y-1 overflow-x-auto">
            {["个人信息", "我的订单", "会员权益", "退出登录"].map((tab) => (
              <button
                key={tab}
                onClick={() => { if (tab === "退出登录") signOut({ callbackUrl: "/" }); }}
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
                <div className="flex justify-between"><span className="text-warm-text-dim">昵称</span><span className="text-warm-text">{session.user.name || "未设置"}</span></div>
                <div className="flex justify-between"><span className="text-warm-text-dim">邮箱</span><span className="text-warm-text">{session.user.email}</span></div>
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

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="font-serif italic text-3xl text-warm-text text-center mb-10">
        {isRegister ? "注册" : "登录"}
      </h1>
      <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-3">
        {isRegister && (
          <input className="w-full px-4 py-2.5 bg-warm-card border border-warm-border rounded-lg text-sm focus:outline-none focus:border-warm-accent" placeholder="昵称" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <input className="w-full px-4 py-2.5 bg-warm-card border border-warm-border rounded-lg text-sm focus:outline-none focus:border-warm-accent" placeholder="邮箱地址" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full px-4 py-2.5 bg-warm-card border border-warm-border rounded-lg text-sm focus:outline-none focus:border-warm-accent" placeholder="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button type="submit" disabled={loading} className="w-full py-2.5 bg-warm-accent text-white rounded-full text-sm hover:bg-warm-accent/80 disabled:opacity-50 transition-colors">
          {loading ? "处理中..." : isRegister ? "注册" : "登录"}
        </button>
      </form>
      <p className="text-center text-xs text-warm-text-dim mt-4">
        {isRegister ? "已有账号？" : "还没有账号？"}
        <button onClick={() => { setIsRegister(!isRegister); setError(""); }} className="text-warm-accent hover:underline ml-1">
          {isRegister ? "去登录" : "去注册"}
        </button>
      </p>
    </div>
  );
}
