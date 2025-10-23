export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  parent_id?: string | null;
  display_order: number | null;
  created_at: Date | null;
};

export type Product = {
  id: string;
  category_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  price: string;
  compare_at_price?: string | null;
  stock_quantity: number | null;
  condition: string | null;
  sku?: string | null;
  images: unknown;
  is_featured: boolean | null;
  is_hot_deal: boolean | null;
  is_best_seller: boolean | null;
  rating?: string | null;
  review_count: number | null;
  created_at: Date | null;
  updated_at: Date | null;
};
