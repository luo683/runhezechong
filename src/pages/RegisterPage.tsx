import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../stores/useAuthStore';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('两次密码不一致'); return; }
    if (!register(name, email, password)) { setError('该邮箱已注册'); return; }
    navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-serif font-bold text-center text-[#2D2D2D] mb-2">创建账号</h1>
        <p className="text-sm text-[#64748B] text-center mb-8">加入润禾泽宠，给毛孩子最好的宠爱</p>

        <form onSubmit={submit} className="space-y-4">
          <Input label="姓名" value={name} onChange={(e) => setName(e.target.value)} required placeholder="你的名字" />
          <Input label="邮箱" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="hello@example.com" />
          <Input label="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="至少6位" />
          <Input label="确认密码" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-[#4A6741] text-white rounded-full py-3 font-medium hover:bg-[#3d5535] transition-colors">
            注册
          </button>
        </form>

        <p className="text-sm text-center text-[#64748B] mt-6">
          已有账号？<Link to="/login" className="text-[#4A6741] font-medium hover:underline">立即登录</Link>
        </p>
      </div>
    </div>
  );
}
