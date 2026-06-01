import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useAuthStore } from '../stores/useAuthStore';
import { products } from '../data/products';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { EmptyState } from '../components/ui/EmptyState';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';

export function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const cartWithProducts = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  })).filter((x) => x.product);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <EmptyState title="购物车是空的" description="去看看有什么好东西吧" actionLabel="去逛逛" actionTo="/products" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '购物车' }]} />
      <h1 className="text-2xl font-serif font-bold text-[#2D2D2D] mt-4 mb-8">购物车</h1>

      <div className="space-y-4">
        {cartWithProducts.map((item, i) => (
          <div key={`${item.productId}-${item.spec}`} className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100">
            <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 rounded-xl object-cover bg-[#F5F7F2]" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-[#2D2D2D] line-clamp-1">{item.product.name}</h3>
              <p className="text-xs text-[#64748B] mt-1">{item.spec}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-[#2D2D2D]">¥{item.product.price}</span>
                <div className="flex items-center gap-4">
                  <QuantitySelector value={item.quantity} onChange={(v) => updateQuantity(i, v)} />
                  <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mt-8 bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[#64748B]">共 {items.length} 件商品</span>
          <div className="text-right">
            <span className="text-sm text-[#64748B] mr-2">合计</span>
            <span className="text-2xl font-bold text-[#2D2D2D]">¥{totalPrice()}</span>
          </div>
        </div>
        <Button
          onClick={() => navigate(user ? '/checkout' : '/login?redirect=/checkout')}
          className="w-full"
        >
          去结算
        </Button>
      </div>
    </div>
  );
}
