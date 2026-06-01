export type Category = 'dog-food' | 'cat-food' | 'snacks' | 'supplies';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  ingredients?: string;
  specs: { label: string; options: string[] }[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  tags: string[];
}

export interface CartItem {
  productId: string;
  spec: string;
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
}

export type OrderStatus = 'placed' | 'shipped' | 'completed';

export interface Order {
  id: string;
  items: (CartItem & { name: string; price: number; image: string })[];
  total: number;
  status: OrderStatus;
  address: Address;
  createdAt: string;
}

export const CATEGORIES: Record<Category, string> = {
  'dog-food': '狗粮',
  'cat-food': '猫粮',
  'snacks': '零食',
  'supplies': '用品',
};
