import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../stores/useAuthStore';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate(params.get('redirect') || '/');
    } else {
      setError('账号不存在，请先注册');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-serif font-bold text-center text-[#2D2D2D] mb-2">欢迎回来</h1>
        <p className="text-sm text-[#64748B] text-center mb-8">登录你的润禾泽宠账号</p>

        <form onSubmit={submit} className="space-y-4">
          <Input label="邮箱" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="hello@example.com" />
          <Input label="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="请输入密码" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-[#4A6741] text-white rounded-full py-3 font-medium hover:bg-[#3d5535] transition-colors">
            登录
          </button>
        </form>

        <p className="text-sm text-center text-[#64748B] mt-6">
          还没有账号？<Link to="/register" className="text-[#4A6741] font-medium hover:underline">立即注册</Link>
        </p>
      </div>
    </div>
  );
}
