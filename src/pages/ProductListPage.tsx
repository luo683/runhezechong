import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, type Category } from '../types';
import { getProductsByCategory, products } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { EmptyState } from '../components/ui/EmptyState';

const sortOptions = [
  { value: 'default', label: '推荐排序' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
  { value: 'newest', label: '最新上架' },
];

export function ProductListPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'all';
  const sort = params.get('sort') || 'default';
  const q = params.get('q') || '';

  let filtered = getProductsByCategory(category);

  if (q) {
    filtered = filtered.filter(
      (p) => p.name.includes(q) || p.tags.some((t) => t.includes(q))
    );
  }

  switch (sort) {
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'newest': filtered.reverse(); break;
  }

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all' && value !== 'default') next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-6">全部产品</h1>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[{ value: 'all', label: '全部' }, ...Object.entries(CATEGORIES).map(([k, v]) => ({ value: k, label: v }))].map(
          (tab) => (
            <button
              key={tab.value}
              onClick={() => updateParam('category', tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === tab.value
                  ? 'bg-[#4A6741] text-white'
                  : 'bg-white text-[#2D2D2D] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          )
        )}
      </div>

      {/* Sort + count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#64748B]">{filtered.length} 件产品</p>
        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#4A6741] bg-white"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="没有找到产品"
          description={q ? `未找到与「${q}」相关的产品，换个关键词试试` : '该分类暂无产品'}
          actionLabel="查看全部产品"
          actionTo="/products"
        />
      )}
    </div>
  );
}
