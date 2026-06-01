import { Search, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate(`/products?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <form onSubmit={submit} className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="搜索产品..."
        className="w-full rounded-full border border-gray-200 bg-white pl-4 pr-10 py-2 text-sm outline-none focus:border-[#4A6741] transition-colors"
      />
      {q && (
        <button type="button" onClick={() => setQ('')} className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <X size={14} />
        </button>
      )}
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4A6741]">
        <Search size={16} />
      </button>
    </form>
  );
}
