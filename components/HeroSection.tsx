import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="grid grid-cols-2 min-h-[520px] bg-gradient-to-br from-[#ede6d9] to-[#e0d4be]">
      <div className="flex flex-col justify-center px-16 py-20">
        <span className="text-xs tracking-[0.3em] uppercase text-warm-accent mb-5 border border-warm-accent-light/40 rounded-full px-4 py-1.5 w-fit">
          药食同源 · 日常养护
        </span>

        <h1 className="font-brush text-7xl leading-tight text-warm-text mb-4 tracking-[0.05em]">
          润养本草<br />恩泽爱宠
        </h1>

        <p className="font-serif italic text-2xl text-warm-text-dim mb-8">
          Herbal nutrition, honest love.
        </p>

        <p className="text-base leading-relaxed text-warm-text-dim mb-8 max-w-md">
          以传统本草智慧为根基，用现代营养科学为每一只毛孩子打造真正健康的日常饮食。全部使用药食同源食材，日常食用级安全标准。
        </p>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-warm-text border-b-2 border-warm-accent pb-1.5 w-fit hover:text-warm-accent transition-colors"
        >
          探索产品 →
        </Link>
      </div>

      <div className="flex items-center justify-center bg-warm-border/30">
        <div className="w-72 h-72 bg-warm-card rounded-3xl flex items-center justify-center text-6xl shadow-lg">
          🐾
        </div>
      </div>
    </section>
  );
}
