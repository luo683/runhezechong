import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronLeft } from 'lucide-react';
import { getProductBySlug } from '../data/products';
import { CATEGORIES } from '../types';
import { useCartStore } from '../stores/useCartStore';
import { useFavoriteStore } from '../stores/useFavoriteStore';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { RatingStars } from '../components/ui/RatingStars';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useToast } from '../components/ui/Toast';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug ?? '');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold mb-2">产品不存在</h2>
        <Link to="/products" className="text-[#4A6741] hover:underline text-sm">返回产品列表</Link>
      </div>
    );
  }

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: ReturnType<typeof getProductBySlug> }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSpec, setSelectedSpec] = useState(product!.specs[0]?.options[0] ?? '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients'>('desc');
  const addItem = useCartStore((s) => s.addItem);
  const { isFavorited, toggle } = useFavoriteStore();
  const { toast } = useToast();

  const p = product!;
  const favorited = isFavorited(p.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: '产品', to: '/products' },
        { label: CATEGORIES[p.category], to: `/products?category=${p.category}` },
        { label: p.name },
      ]} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-[#F5F7F2] rounded-2xl overflow-hidden mb-4">
            <img src={p.images[selectedImage]} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2">
            {p.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === selectedImage ? 'border-[#4A6741]' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <span className="text-xs text-[#8CA87C] bg-[#F5F7F2] px-3 py-1 rounded-full">
            {CATEGORIES[p.category]}
          </span>
          <h1 className="text-2xl font-bold text-[#2D2D2D] mt-3 mb-3">{p.name}</h1>

          <RatingStars rating={p.rating} count={p.reviewCount} />

          <div className="flex items-baseline gap-3 mt-4 mb-6">
            <span className="text-3xl font-bold text-[#2D2D2D]">¥{p.price}</span>
            {p.originalPrice && (
              <span className="text-lg text-gray-400 line-through">¥{p.originalPrice}</span>
            )}
          </div>

          {/* Specs */}
          {p.specs.map((spec) => (
            <div key={spec.label} className="mb-4">
              <p className="text-sm font-medium text-[#2D2D2D] mb-2">{spec.label}</p>
              <div className="flex flex-wrap gap-2">
                {spec.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedSpec(opt)}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                      selectedSpec === opt
                        ? 'border-[#4A6741] bg-[#F5F7F2] text-[#4A6741] font-medium'
                        : 'border-gray-200 text-[#2D2D2D] hover:border-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-medium text-[#2D2D2D] mb-2">数量</p>
            <QuantitySelector value={quantity} onChange={setQuantity} max={p.stock} />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => { addItem(p.id, selectedSpec, quantity); toast('已加入购物车'); }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#4A6741] text-white rounded-full py-3 font-medium hover:bg-[#3d5535] transition-colors"
            >
              <ShoppingCart size={18} /> 加入购物车
            </button>
            <button
              onClick={() => { toggle(p.id); toast(favorited ? '已取消收藏' : '已加入收藏'); }}
              className={`p-3 rounded-full border transition-colors ${
                favorited ? 'border-red-300 text-red-400' : 'border-gray-200 text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart size={20} className={favorited ? 'fill-red-400' : ''} />
            </button>
          </div>

          <p className="text-xs text-[#64748B] mt-3">库存：{p.stock} 件</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {[
            { key: 'desc' as const, label: '产品描述' },
            { key: 'ingredients' as const, label: '成分说明' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.key
                  ? 'border-[#4A6741] text-[#4A6741]'
                  : 'border-transparent text-[#64748B] hover:text-[#2D2D2D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="text-sm text-[#2D2D2D] leading-relaxed max-w-3xl">
          {activeTab === 'desc' ? (
            <p>{p.description}</p>
          ) : (
            <p>{p.ingredients || '暂无成分信息'}</p>
          )}
        </div>
      </div>

      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-[#64748B] hover:text-[#4A6741] mt-8 transition-colors">
        <ChevronLeft size={16} /> 返回产品列表
      </Link>
    </div>
  );
}
