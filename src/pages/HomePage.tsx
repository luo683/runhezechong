import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { getFeaturedProducts, products } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { CATEGORIES } from '../types';
import type { Category } from '../types';

/* ───── Scroll reveal hook ───── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

/* ───── Reveal wrapper ───── */
function Reveal({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ───── Category labels ───── */
const catIcons: Record<Category, string> = {
  'dog-food': '🐕',
  'cat-food': '🐈',
  'snacks': '🦴',
  'supplies': '🧴',
};

const catColors: Record<Category, { bg: string; text: string; border: string }> = {
  'dog-food': { bg: '#FAF7F2', text: '#8B6914', border: '#E8DCC8' },
  'cat-food': { bg: '#F7F5F2', text: '#6B5B4F', border: '#E0D8CF' },
  'snacks': { bg: '#FBF8F4', text: '#9B7B4A', border: '#EADDC4' },
  'supplies': { bg: '#F8F6F4', text: '#5A6B4F', border: '#D5DFCE' },
};

export function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* ════════════════════════════════════════════
          HERO — typography as the visual anchor
          ════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden grain-bg">
        {/* Background texture layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F7F2] via-[#EDF2E9] to-[#E2EBD9]" />

        {/* Decorative botanical circles */}
        <div className="botanical-ornament top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full border border-[#8CA87C]/20" />
        <div className="botanical-ornament top-[20%] right-[8%] w-[30vw] h-[30vw] rounded-full border border-[#8CA87C]/15" />
        <div className="botanical-ornament bottom-[-8%] left-[-3%] w-[25vw] h-[25vw] rounded-full border border-[#8CA87C]/10" />

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.6fr] gap-8 lg:gap-16 items-center">
            {/* Left: Typography */}
            <div>
              {/* Vertical accent line + brand name */}
              <div className="flex items-center gap-4 mb-10 md:mb-14">
                <div className="w-px h-12 bg-[#8CA87C]" />
                <div>
                  <p className="text-[10px] md:text-[11px] tracking-[0.35em] text-[#8CA87C] uppercase font-medium mb-1">
                    Run He Ze Chong
                  </p>
                  <p className="text-sm text-[#64748B] font-serif">润禾泽宠</p>
                </div>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-[#2D2D2D]">
                <span className="font-serif font-black" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  润养
                </span>
                <br />
                <span className="font-serif font-black" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  本草
                </span>
              </h1>

              {/* Kai font flourish */}
              <div className="mt-4 md:mt-6 flex items-center gap-4">
                <Sparkles size={16} className="text-[#8CA87C]" />
                <p
                  className="text-2xl md:text-4xl text-[#4A6741] leading-none"
                  style={{ fontFamily: "'Ma Shan Zheng', 'KaiTi', cursive" }}
                >
                  恩泽爱宠
                </p>
              </div>

              {/* Subtitle */}
              <p className="mt-6 md:mt-8 text-sm md:text-base text-[#64748B] max-w-md leading-relaxed">
                传承草本智慧，以自然之力滋养每一只毛孩子的健康与快乐。
              </p>

              {/* CTAs */}
              <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-[#4A6741] text-white rounded-full px-7 py-3.5 text-sm font-medium hover:bg-[#2E4A2A] transition-colors"
                >
                  探索产品 <ArrowRight size={16} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[#4A6741] rounded-full px-7 py-3.5 text-sm font-medium hover:bg-white/60 transition-colors"
                >
                  了解品牌 <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Abstract decorative element */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative">
                {/* Large decorative circle */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#D4E0C8]/50 to-[#8CA87C]/20 flex items-center justify-center">
                  <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border border-[#4A6741]/10 flex items-center justify-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#4A6741]/8 to-[#8CA87C]/20 flex items-center justify-center">
                      {/* Chinese character as decorative center */}
                      <span className="text-6xl md:text-7xl font-serif text-[#4A6741]/30 font-black"
                        style={{ fontFamily: "'Noto Serif SC', serif" }}>
                        宠
                      </span>
                    </div>
                  </div>
                </div>
                {/* Floating tiny accent */}
                <div className="absolute top-0 right-4 w-3 h-3 rounded-full bg-[#8CA87C]/30" />
                <div className="absolute bottom-8 left-0 w-2 h-2 rounded-full bg-[#4A6741]/20" />
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <div className="w-px h-8 bg-[#8CA87C]" />
            <span className="text-[9px] tracking-[0.3em] text-[#8CA87C] uppercase">Scroll</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CATEGORIES — editorial asymmetric layout
          ════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4 mb-14">
            <div className="decorative-line" />
            <p className="text-[10px] tracking-[0.3em] text-[#8CA87C] uppercase font-medium">Shop by Category</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.entries(CATEGORIES) as [Category, string][]).map(([key, label], idx) => {
            const colors = catColors[key];
            return (
              <Reveal key={key} style={{ transitionDelay: `${idx * 100}ms` }}>
                <Link
                  to={`/products?category=${key}`}
                  className="hover-lift group relative block rounded-3xl overflow-hidden border p-6 md:p-8 h-48 md:h-56 flex flex-col justify-between"
                  style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                >
                  <div>
                    <span className="text-3xl">{catIcons[key]}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold mb-1" style={{ color: colors.text }}>
                      {label}
                    </h3>
                    <p className="text-xs opacity-60" style={{ color: colors.text }}>
                      {products.filter((p) => p.category === key).length} 款产品
                    </p>
                  </div>
                  <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full border opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex items-center justify-center"
                    style={{ borderColor: colors.text }}>
                    <ArrowRight size={14} style={{ color: colors.text }} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Category intro text */}
        <Reveal>
          <p className="mt-10 text-sm text-[#64748B] max-w-lg leading-relaxed">
            从主粮到零食，从护理到日用品 — 每一款产品都凝聚着<span className="text-[#4A6741]">本草智慧</span>与<span className="text-[#4A6741]">科学配比</span>的双重守护。
          </p>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════
          FEATURED PRODUCTS — varied rhythm
          ════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <Reveal>
          <div className="flex items-center justify-between mb-14">
            <div className="flex items-center gap-4">
              <div className="decorative-line" />
              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#8CA87C] uppercase font-medium mb-1">Curated Selection</p>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D2D2D]">精选好物</h2>
              </div>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#4A6741] transition-colors group"
            >
              查看全部 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* Hero product + grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-4 md:gap-6">
          {/* Hero product — visually dominant */}
          {featured.slice(0, 1).map((p) => (
            <Reveal key={p.id}>
              <Link
                to={`/products/${p.slug}`}
                className="group block relative rounded-3xl overflow-hidden bg-white border border-gray-100 h-full min-h-[360px] md:min-h-[420px]"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="text-xs text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    {CATEGORIES[p.category]}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white mt-3 mb-2">{p.name}</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-white">¥{p.price}</span>
                    {p.originalPrice && (
                      <span className="text-sm text-white/50 line-through">¥{p.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* Remaining featured products — 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {featured.slice(1, 5).map((p, idx) => (
              <Reveal key={p.id} style={{ transitionDelay: `${idx * 80}ms` }}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BRAND STORY — editorial split layout
          ════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Abstract visual */}
          <Reveal>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8EDE2] to-[#D4E0C8] p-8 md:p-12 flex items-end">
              {/* Abstract botanical shapes */}
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-[#4A6741]/10" />
              <div className="absolute top-20 right-16 w-20 h-20 rounded-full bg-[#4A6741]/5" />
              <div className="absolute bottom-1/3 right-10 w-16 h-16 rounded-full border border-[#8CA87C]/20" />

              {/* Floating herb leaf shapes */}
              <svg className="absolute top-12 right-12 w-24 h-24 text-[#4A6741]/8" viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="50" rx="30" ry="45" transform="rotate(-20 50 50)" />
              </svg>
              <svg className="absolute bottom-20 left-16 w-16 h-16 text-[#8CA87C]/10" viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="50" rx="25" ry="40" transform="rotate(15 50 50)" />
              </svg>

              {/* Content overlay */}
              <div className="relative">
                <span className="text-[10px] tracking-[0.3em] text-[#8CA87C] uppercase font-medium">Philosophy</span>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2D2D2D] mt-4 mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  润养本草
                </h2>
                <p className="text-3xl md:text-4xl text-[#4A6741] leading-relaxed" style={{ fontFamily: "'Ma Shan Zheng', 'KaiTi', cursive" }}>
                  恩泽爱宠
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: Text content */}
          <Reveal>
            <div className="space-y-8">
              <div>
                <h3 className="text-xs tracking-[0.3em] text-[#8CA87C] uppercase font-medium mb-6">Our Story</h3>
                <p className="text-2xl md:text-3xl font-serif text-[#2D2D2D] leading-relaxed" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  大自然是最好的药房。
                </p>
              </div>

              <div className="space-y-6 text-sm md:text-base text-[#64748B] leading-relaxed">
                <p>
                  我们将千年本草智慧融入现代宠物营养科学。每一款产品，都始于对一株草药的敬畏，对一份食材的严选。
                </p>
                <p>
                  我们相信<strong className="text-[#4A6741] font-medium">"调和"胜过"对抗"</strong>，<strong className="text-[#4A6741] font-medium">"滋养"胜过"治疗"</strong>。润禾泽宠，不只是宠物食品 — 它是一种善待生命的方式。
                </p>
              </div>

              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-3xl font-serif font-bold text-[#4A6741]" style={{ fontFamily: "'Noto Serif SC', serif" }}>30+</p>
                  <p className="text-xs text-[#64748B] mt-1">精选产品</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-[#4A6741]" style={{ fontFamily: "'Noto Serif SC', serif" }}>100%</p>
                  <p className="text-xs text-[#64748B] mt-1">天然原料</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-[#4A6741]" style={{ fontFamily: "'Noto Serif SC', serif" }}>4.8</p>
                  <p className="text-xs text-[#64748B] mt-1">用户评分</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CLOSING CTA
          ════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <Reveal>
          <div className="relative rounded-3xl bg-[#2D2D2D] overflow-hidden p-10 md:p-16 text-center">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle, #8CA87C 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative">
              <p className="text-[10px] tracking-[0.3em] text-[#8CA87C] uppercase font-medium mb-6">Start Your Journey</p>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                为你的毛孩子，选择一份<span className="text-[#8CA87C]">本草滋养</span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                润禾泽宠 — 润养本草，恩泽爱宠
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#8CA87C] text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-[#4A6741] transition-colors"
              >
                开始选购 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
