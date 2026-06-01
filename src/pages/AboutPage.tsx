import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F5F7F2] to-white py-20 text-center px-4">
        <h1 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-4">关于润禾泽宠</h1>
        <p className="text-sm text-[#64748B] max-w-md mx-auto">润养本草，恩泽爱宠 — 以中草药智慧滋养宠物健康</p>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-sm leading-relaxed text-[#2D2D2D]">
        <div>
          <h2 className="text-xl font-serif font-bold mb-4 text-[#4A6741]">我们的初心</h2>
          <p>
            润禾泽宠创立于对宠物的深深热爱。我们相信，每一只毛孩子都值得被温柔以待——不仅是情感上的陪伴，更是身体的健康守护。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-bold mb-4 text-[#4A6741]">本草溯源</h2>
          <p>
            中华本草文化源远流长，数千年的智慧沉淀为我们提供了无数天然养护方案。润禾泽宠的研发团队深入研究中草药典籍，结合现代宠物营养科学，将传统智慧转化为适合现代犬猫的科学配方。
          </p>
          <p className="mt-3">
            每一味药材都经过严格筛选——从道地产区直采，经过第三方实验室检测，确保无农药残留、无重金属超标。我们坚持用食品级标准要求每一批原料。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-bold mb-4 text-[#4A6741]">品质承诺</h2>
          <ul className="space-y-2">
            <li>· 所有产品均通过第三方质量检测</li>
            <li>· 不添加人工色素、香精、防腐剂</li>
            <li>· 原料可溯源，信息公开透明</li>
            <li>· 兽医和宠物营养师联合研发</li>
            <li>· 持续追踪用户反馈，迭代优化</li>
          </ul>
        </div>

        <div className="bg-[#F5F7F2] rounded-2xl p-8 text-center">
          <p className="text-lg font-serif font-bold text-[#4A6741] mb-2">
            <span style={{ fontFamily: "'Noto Serif SC', serif" }}>润养本草</span>
            {' · '}
            <span style={{ fontFamily: "'Ma Shan Zheng', 'KaiTi', cursive" }}>恩泽爱宠</span>
          </p>
          <p className="text-sm text-[#64748B]">以本草之力调和体质，以仁爱之心善待生命</p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <Link to="/products" className="inline-flex items-center gap-2 bg-[#4A6741] text-white rounded-full px-8 py-3 font-medium hover:bg-[#3d5535] transition-colors">
          探索我们的产品 <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
