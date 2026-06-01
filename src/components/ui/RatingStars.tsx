import { Star } from 'lucide-react';

export function RatingStars({ rating, count }: { rating: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-sm">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
        />
      ))}
      <span className="ml-1 text-[#64748B]">{rating}</span>
      {count !== undefined && <span className="text-[#64748B]">({count}评价)</span>}
    </span>
  );
}
