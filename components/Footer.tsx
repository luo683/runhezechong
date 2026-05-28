import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-warm-dark text-warm-text-dim">
      <div className="max-w-6xl mx-auto px-10 py-14 grid grid-cols-3 gap-12">
        <div>
          <h5 className="text-warm-gold text-xs tracking-[0.15em] uppercase mb-4">润禾泽宠</h5>
          <p className="text-sm leading-relaxed">
            润养本草，恩泽爱宠。<br />
            药食同源，日常养护新选择。
          </p>
        </div>
        <div>
          <h5 className="text-warm-gold text-xs tracking-[0.15em] uppercase mb-4">产品</h5>
          <Link href="/products" className="block text-sm mb-2 hover:text-white transition-colors">全部产品</Link>
          <Link href="/consult" className="block text-sm mb-2 hover:text-white transition-colors">AI 问诊</Link>
          <Link href="/membership" className="block text-sm mb-2 hover:text-white transition-colors">加入会员</Link>
          <Link href="/about" className="block text-sm mb-2 hover:text-white transition-colors">关于我们</Link>
          <Link href="/contact" className="block text-sm mb-2 hover:text-white transition-colors">联系我们</Link>
        </div>
        <div>
          <h5 className="text-warm-gold text-xs tracking-[0.15em] uppercase mb-4">关注我们</h5>
          <p className="text-sm mb-2">小红书 @润禾泽宠</p>
          <p className="text-sm mb-2">微信公众号</p>
          <p className="text-sm">hello@runhezechong.cn</p>
        </div>
      </div>
      <div className="border-t border-white/10 max-w-6xl mx-10 py-5 flex justify-between text-xs">
        <span>&copy; 2026 润禾泽宠</span>
        <span>隐私政策 · 服务条款 · 配送说明</span>
      </div>
    </footer>
  );
}
