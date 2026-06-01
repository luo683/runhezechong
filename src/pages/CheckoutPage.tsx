import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useOrderStore } from '../stores/useOrderStore';
import { products } from '../data/products';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';

const emptyAddress = { name: '', phone: '', province: '', city: '', district: '', detail: '' };

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const navigate = useNavigate();
  const [address, setAddress] = useState(emptyAddress);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const id = 'ORD' + Date.now().toString(36).toUpperCase();
    const orderItems = items.map((item) => {
      const p = products.find((p) => p.id === item.productId)!;
      return { ...item, name: p.name, price: p.price, image: p.images[0] };
    });
    placeOrder({
      id,
      items: orderItems,
      total: totalPrice(),
      status: 'placed',
      address: { id: 'addr-' + Date.now(), ...address, isDefault: false },
      createdAt: new Date().toISOString(),
    });
    setOrderId(id);
    setShowSuccess(true);
    clearCart();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '购物车', to: '/cart' }, { label: '结算' }]} />
      <h1 className="text-2xl font-serif font-bold text-[#2D2D2D] mt-4 mb-8">确认订单</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <form onSubmit={submit} className="md:col-span-3 space-y-4">
          <h2 className="font-semibold text-[#2D2D2D]">收货信息</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="姓名" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} required />
            <Input label="手机" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="省" value={address.province} onChange={(e) => setAddress({ ...address, province: e.target.value })} required />
            <Input label="市" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
            <Input label="区" value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} required />
          </div>
          <Input label="详细地址" value={address.detail} onChange={(e) => setAddress({ ...address, detail: e.target.value })} required />
          <button type="submit" className="w-full bg-[#4A6741] text-white rounded-full py-3 font-medium hover:bg-[#3d5535] transition-colors">
            提交订单 ¥{totalPrice()}
          </button>
        </form>

        <div className="md:col-span-2 bg-white rounded-2xl p-4 border border-gray-100 self-start">
          <h3 className="font-semibold text-[#2D2D2D] mb-3">订单商品</h3>
          {items.map((item) => {
            const p = products.find((p) => p.id === item.productId);
            if (!p) return null;
            return (
              <div key={`${item.productId}-${item.spec}`} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-[#F5F7F2]" />
                <div className="flex-1 min-w-0 text-sm">
                  <p className="truncate">{p.name}</p>
                  <p className="text-xs text-[#64748B]">{item.spec} × {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">¥{p.price * item.quantity}</span>
              </div>
            );
          })}
          <div className="border-t border-gray-100 pt-3 mt-3 space-y-1 text-sm">
            <div className="flex justify-between text-[#64748B]"><span>小计</span><span>¥{totalPrice()}</span></div>
            <div className="flex justify-between text-[#64748B]"><span>运费</span><span className="text-green-600">免运费</span></div>
            <div className="flex justify-between font-bold text-[#2D2D2D] text-base pt-2 border-t border-gray-100">
              <span>总计</span><span>¥{totalPrice()}</span>
            </div>
          </div>
        </div>
      </div>

      <Modal open={showSuccess} onClose={() => navigate('/account/orders')} title="下单成功">
        <div className="text-center py-4">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
          <p className="text-lg font-medium text-[#2D2D2D] mb-1">订单已提交</p>
          <p className="text-sm text-[#64748B] mb-1">订单号：{orderId}</p>
          <p className="text-sm text-[#64748B]">我们将尽快为您发货</p>
          <button
            onClick={() => navigate('/account/orders')}
            className="mt-6 w-full bg-[#4A6741] text-white rounded-full py-2.5 font-medium hover:bg-[#3d5535] transition-colors"
          >
            查看订单
          </button>
        </div>
      </Modal>
    </div>
  );
}
