import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-[#4A6741] text-white hover:bg-[#3d5535]',
    outline: 'border border-[#4A6741] text-[#4A6741] hover:bg-[#4A6741] hover:text-white',
    ghost: 'text-[#4A6741] hover:bg-[#F5F7F2]',
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>;
}
