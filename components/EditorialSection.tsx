import Link from "next/link";

export default function EditorialSection() {
  return (
    <section className="border-t border-warm-border mx-10 max-w-6xl xl:mx-auto">
      <div className="grid grid-cols-2 gap-14 py-20 items-center">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">Our Philosophy</span>
          <h2 className="font-serif italic text-3xl text-warm-text mt-3 mb-4 leading-snug">
            如果配料表上有你不认识的词，<br />你的宠物也不应该认识。
          </h2>
          <p className="text-sm text-warm-text-dim leading-relaxed mb-6">
            全部使用药食同源目录品种——山药、茯苓、枸杞、山楂……这些你厨房里就有的食材。
            我们不做宠物爱吃的垃圾食品，只做它们身体真正需要的日常养护。
          </p>
          <Link href="/about" className="text-xs tracking-[0.15em] uppercase text-warm-accent border-b border-warm-accent pb-1">
            了解我们的故事 →
          </Link>
        </div>
        <div className="h-80 bg-warm-border/40 rounded-2xl flex items-center justify-center text-5xl">🌿</div>
      </div>
    </section>
  );
}
