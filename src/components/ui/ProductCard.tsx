import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../stores/useCartStore';
import { useFavoriteStore } from '../../stores/useFavoriteStore';
import { useToast } from './Toast';
import { RatingStars } from './RatingStars';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const { isFavorited, toggle } = useFavoriteStore();
  const { toast } = useToast();
  const favorited = isFavorited(product.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-[#D4E0C8] transition-all duration-300">
      <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-[#F5F7F2]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggle(product.id); toast(favorited ? '已取消收藏' : '已加入收藏'); }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart size={16} className={favorited ? 'fill-red-400 text-red-400' : 'text-gray-400'} />
        </button>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-[#2D2D2D] line-clamp-2 mb-2 hover:text-[#4A6741] transition-colors">
            {product.name}
          </h3>
        </Link>
        <RatingStars rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#2D2D2D]">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">¥{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => { addItem(product.id, product.specs[0]?.options[0] ?? ''); toast('已加入购物车'); }}
            className="p-2 rounded-full bg-[#4A6741] text-white hover:bg-[#3d5535] transition-colors opacity-0 group-hover:opacity-100"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
