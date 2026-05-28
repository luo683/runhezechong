export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-10 py-12 lg:py-20">
      <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">About</span>
      <h1 className="font-serif italic text-2xl lg:text-4xl text-warm-text mt-3 mb-16">关于润禾泽宠</h1>

      <section className="mb-20">
        <h2 className="font-serif italic text-xl lg:text-2xl text-warm-text mb-4">源于热爱，成于专业</h2>
        <p className="text-sm text-warm-text-dim leading-relaxed">
          润禾泽宠诞生于一个简单信念：宠物是家人，它们值得和我们吃的一样好。
          创始人团队由兽医和营养学研究者组成，我们拒绝让宠物的饭碗里出现任何我们自己都看不懂的成分。
        </p>
      </section>

      <section className="mb-20">
        <h2 className="font-serif italic text-xl lg:text-2xl text-warm-text mb-4">药食同源，就是我们最大的诚意</h2>
        <p className="text-sm text-warm-text-dim leading-relaxed mb-4">
          润禾泽宠所有产品使用的中草药成分，全部来自国家药食同源目录——山药、茯苓、枸杞、山楂、
          黑芝麻、菊花、蒲公英、桑葚、百合、薏苡仁……这些你厨房里就有的食材。
          日常食用级别安全标准，不是药，是最温和的日常养护。
        </p>
        <p className="text-sm text-warm-text-dim leading-relaxed">
          我们相信，真正的营养不应该来自各种化学添加剂，而应该来自大自然已经准备好的东西。
          用传统本草智慧做基础，用现代营养科学做验证——这就是润禾泽宠的方式。
        </p>
      </section>

      <section className="mb-20">
        <h2 className="font-serif italic text-xl lg:text-2xl text-warm-text mb-4">兽医联合研发</h2>
        <p className="text-sm text-warm-text-dim leading-relaxed">
          每一款配方都与执业兽医师联合开发，确保符合猫狗的真实营养需求。
          我们不凭空想象配方，每一个成分的选择都有科学依据和临床验证。
        </p>
      </section>

      <section>
        <h2 className="font-serif italic text-xl lg:text-2xl text-warm-text mb-8">品牌历程</h2>
        <div className="space-y-6">
          {[
            { year: "2023", event: "创始团队组建，启动配方研发" },
            { year: "2024", event: "与多位兽医合作，完成 7 款核心配方" },
            { year: "2025", event: "首批产品上线，服务超过 5000 只猫狗" },
            { year: "2026", event: "润大夫 AI 问诊上线，官网正式运营" },
          ].map((m) => (
            <div key={m.year} className="flex gap-6 items-start">
              <span className="text-warm-accent font-medium text-sm w-12 shrink-0">{m.year}</span>
              <span className="text-sm text-warm-text-dim">{m.event}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
