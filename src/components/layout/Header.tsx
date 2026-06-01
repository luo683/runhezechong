import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Heart, Package, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SearchBar } from '../ui/SearchBar';
import { useCartStore } from '../../stores/useCartStore';
import { useAuthStore } from '../../stores/useAuthStore';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const totalCount = useCartStore((s) => s.totalCount);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: '首页' },
    { to: '/products', label: '产品' },
    { to: '/about', label: '关于' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="text-lg font-bold text-[#4A6741] font-serif tracking-wide whitespace-nowrap">
          润禾泽宠
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-[#2D2D2D] hover:text-[#4A6741] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block w-64">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ShoppingCart size={20} className="text-[#2D2D2D]" />
            {totalCount() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#4A6741] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalCount()}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <User size={20} />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">{user.name}</div>
                    <button onClick={() => { navigate('/account'); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50">
                      <User size={16} />个人信息
                    </button>
                    <button onClick={() => { navigate('/account/orders'); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50">
                      <Package size={16} />我的订单
                    </button>
                    <button onClick={() => { navigate('/account/favorites'); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50">
                      <Heart size={16} />收藏夹
                    </button>
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50">
                      <LogOut size={16} />退出登录
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-sm font-medium text-[#4A6741] hover:underline">登录</Link>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <SearchBar />
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-[#2D2D2D] hover:text-[#4A6741]">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
