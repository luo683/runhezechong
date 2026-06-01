import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: Props) {
  return (
    <div className="flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
        className="p-2 hover:bg-gray-50 disabled:opacity-30 transition-colors"
      ><Minus size={14} /></button>
      <span className="w-10 text-center text-sm font-medium select-none">{value}</span>
      <button
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
        className="p-2 hover:bg-gray-50 disabled:opacity-30 transition-colors"
      ><Plus size={14} /></button>
    </div>
  );
}
