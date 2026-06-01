import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb { label: string; to?: string; }

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-[#64748B]">
      <Link to="/" className="hover:text-[#4A6741] transition-colors"><Home size={14} /></Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={12} />
          {item.to
            ? <Link to={item.to} className="hover:text-[#4A6741] transition-colors">{item.label}</Link>
            : <span className="text-[#2D2D2D]">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
