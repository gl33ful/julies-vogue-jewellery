export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  price: number;
  compare_at_price: number | null;
  short_description: string | null;
  description: string | null;
  image_url: string;
  gallery: string[];
  material: string | null;
  details: string | null;
  rating: number;
  review_count: number;
  stock: number;
  low_stock_threshold: number;
  is_bestseller: boolean;
  is_new: boolean;
  collection: string | null;
  created_at: string;
  categories?: Category | null;
};

export type Review = {
  id: string;
  product_id: string;
  author: string;
  location: string | null;
  rating: number;
  body: string;
  avatar_url: string | null;
  created_at: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
