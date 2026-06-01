import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen } from 'lucide-react';

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionTo }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-gray-300 mb-4">{icon ?? <PackageOpen size={64} />}</div>
      <h3 className="text-lg font-medium text-[#2D2D2D] mb-2">{title}</h3>
      {description && <p className="text-sm text-[#64748B] mb-6 max-w-xs">{description}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="inline-flex items-center gap-2 rounded-full bg-[#4A6741] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#3d5535] transition-colors">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
