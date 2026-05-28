export interface Product {
  slug: string;
  name: string;
  category: "all";
  price: number;
  effects: string[];
  description: string;
  suitableFor: string;
  tags: string[];
  feedingGuide: {
    small: string;
    medium: string;
    large: string;
  };
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ConsultMessage {
  role: "user" | "assistant";
  content: string;
}
