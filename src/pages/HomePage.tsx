import { Link } from 'react-router-dom';
import { ArrowRight, Dog, Cat, Bone, ToyBone } from 'lucide-react';
import { getFeaturedProducts, products } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { CATEGORIES } from '../types';
import type { Category } from '../types';

const categoryIcons: Record<Category, typeof Dog> = {
  'dog-food': Dog,
  'cat-food': Cat,
  'snacks': Bone,
  'supplies': ToyBone,
};

export function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#F5F7F2] via-[#D4E0C8] to-[#8CA87C] py-20 md:py-32 text-center px-4">
        <p className="text-xs md:text-sm tracking-[0.3em] text-[#4A6741] mb-4 uppercase font-sans">Run He Ze Chong</p>
        <h1 className="text-3xl md:text-5xl leading-tight mb-4">
          <span className="font-serif font-bold text-[#2D2D2D]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            润养本草
          </span>
          <br />
          <span className="text-[#4A6741]" style={{ fontFamily: "'Ma Shan Zheng', 'KaiTi', cursive", fontSize: '1.2em' }}>
            恩泽爱宠
          </span>
        </h1>
        <p className="text-sm md:text-base text-[#4A6741] mb-3 font-medium">
          传承草本智慧 · 滋养每一只毛孩子
        </p>
        <div className="w-10 h-px bg-[#4A6741] mx-auto mb-4" />
        <p className="text-sm md:text-base text-[#4A6741] max-w-lg mx-auto mb-8 leading-relaxed font-light">
          以本草之力调和体质，以仁爱之心善待生命。<br />在大自然中寻找答案，让每一份宠爱都有回响。
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 border border-[#4A6741] text-[#4A6741] rounded-full px-8 py-3 text-sm font-medium hover:bg-[#4A6741] hover:text-white transition-all duration-300"
        >
          探索产品 <ArrowRight size={16} />
        </Link>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.entries(CATEGORIES) as [Category, string][]).map(([key, label]) => {
            const Icon = categoryIcons[key];
            return (
              <Link
                key={key}
                to={`/products?category=${key}`}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#F5F7F2] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-[#4A6741]" />
                </div>
                <h3 className="font-medium text-[#2D2D2D]">{label}</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  {products.filter((p) => p.category === key).length} 款产品
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-2">精选好物</h2>
          <p className="text-sm text-[#64748B]">用心甄选，只为每一份宠爱</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-[#4A6741] font-medium text-sm hover:underline">
            查看全部产品 <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="mt-20 bg-[#2D2D2D] text-white py-20 px-4 text-center">
        <p className="text-xs tracking-[0.3em] text-[#8CA87C] mb-4 uppercase">Our Philosophy</p>
        <h2 className="text-2xl md:text-3xl mb-4">
          <span className="font-serif font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            润养本草
          </span>
          <span className="mx-2 text-[#8CA87C]">·</span>
          <span style={{ fontFamily: "'Ma Shan Zheng', 'KaiTi', cursive", fontSize: '1.1em' }}>
            恩泽爱宠
          </span>
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto leading-relaxed font-light">
          我们相信大自然是最好的药房。每一款产品都凝聚着对中草药智慧的敬畏，对宠物健康的承诺。润禾泽宠，为爱宠带来天性之养。
        </p>
      </section>
    </div>
  );
}
