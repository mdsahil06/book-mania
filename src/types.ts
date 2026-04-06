export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  reviews: number;
  cover: string;
  category: string;
  description: string;
  featured?: boolean;
}

export interface CartItem extends Book {
  quantity: number;
}
