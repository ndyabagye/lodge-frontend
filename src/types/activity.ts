export interface Activity {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  short_description: string;
  duration: number;
  price: number;
  adult_price: number;
  child_price: number;
  max_guests: number;
  min_age: number;
  status: "available" | "unavailable" | "coming_soon";
  featured: boolean;
  images: Array<{
    id: string;
    url: string;
    thumbnail_url: string;
    alt_text: string;
  }>;
  created_at: string;
  updated_at: string;
}
