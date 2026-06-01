import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { User, Package, Heart, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { useOrderStore } from '../stores/useOrderStore';
import { useFavoriteStore } from '../stores/useFavoriteStore';
import { products } from '../data/products';
import { Input } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { ProductCard } from '../components/ui/ProductCard';

const tabs = [
  { key: 'profile', label: '个人信息', icon: User },
  { key: 'orders', label: '我的订单', icon: Package },
  { key: 'favorites', label: '收藏夹', icon: Heart },
] as const;

type Tab = (typeof tabs)[number]['key'];

export function AccountPage() {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return <AccountContent />;
}

function AccountContent() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const { user, logout, updateProfile } = useAuthStore();
  const orders = useOrderStore((s) => s.orders);
  const favoriteIds = useFavoriteStore((s) => s.productIds);
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-8">个人中心</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <nav className="md:w-48 flex-shrink-0 flex md:flex-col gap-1 overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                activeTab === key ? 'bg-[#F5F7F2] text-[#4A6741] font-medium' : 'text-[#64748B] hover:bg-gray-50'
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
          <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={16} /> 退出登录
          </button>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && <ProfileSection user={user!} updateProfile={updateProfile} />}
          {activeTab === 'orders' && <OrdersSection orders={orders} />}
          {activeTab === 'favorites' && <FavoritesSection favIds={favoriteIds} />}
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ user, updateProfile }: { user: ReturnType<typeof useAuthStore.getState>['user']; updateProfile: (d: any) => void }) {
  const [name, setName] = useState(user!.name);
  const [phone, setPhone] = useState(user!.phone || '');

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 className="font-semibold mb-6">个人信息</h2>
      <div className="space-y-4 max-w-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#F5F7F2] flex items-center justify-center text-2xl text-[#8CA87C] font-bold">
            {user!.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{user!.name}</p>
            <p className="text-sm text-[#64748B]">{user!.email}</p>
          </div>
        </div>
        <Input label="姓名" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="手机" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="输入手机号" />
        <button onClick={() => updateProfile({ name, phone })} className="bg-[#4A6741] text-white rounded-full px-8 py-2.5 font-medium hover:bg-[#3d5535] transition-colors">
          保存修改
        </button>
      </div>
    </div>
  );
}

function OrdersSection({ orders }: { orders: ReturnType<typeof useOrderStore.getState>['orders'] }) {
  const statusLabels: Record<string, string> = { placed: '已下单', shipped: '已发货', completed: '已完成' };
  const statusColors: Record<string, string> = { placed: 'bg-blue-100 text-blue-700', shipped: 'bg-amber-100 text-amber-700', completed: 'bg-green-100 text-green-700' };

  if (orders.length === 0) {
    return <EmptyState title="暂无订单" description="快去逛逛，给毛孩子买点好吃的" actionLabel="去购物" actionTo="/products" />;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#64748B]">订单号：{order.id}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
          </div>
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-3 py-2">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-[#F5F7F2]" />
              <div className="flex-1 text-sm">
                <p>{item.name}</p>
                <p className="text-xs text-[#64748B]">{item.spec} × {item.quantity}</p>
              </div>
              <span className="text-sm font-medium">¥{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
            <span className="text-xs text-[#64748B]">{new Date(order.createdAt).toLocaleDateString('zh-CN')}</span>
            <span className="font-bold">合计 ¥{order.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FavoritesSection({ favIds }: { favIds: string[] }) {
  const favProducts = products.filter((p) => favIds.includes(p.id));

  if (favProducts.length === 0) {
    return <EmptyState title="暂无收藏" description="浏览产品时点击心形图标收藏" actionLabel="去逛逛" actionTo="/products" />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {favProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
