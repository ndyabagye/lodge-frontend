export interface Accommodation {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  short_description: string;
  max_guests: number;
  num_bedrooms: number;
  num_bathrooms: number;
  num_beds: number;
  size_sqft: number;
  base_price: number;
  weekend_price: number;
  cleaning_fee: number;
  status: "available" | "maintenance" | "coming_soon";
  featured: boolean;
  rating: number;
  images: AccommodationImage[];
  amenities: Amenity[];
  created_at: string;
  updated_at: string;
}

export interface AccommodationImage {
  id: string;
  url: string;
  thumbnail_url: string;
  alt_text: string;
  caption: string;
  order: number;
  is_featured: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface AccommodationFilters {
  type?: string;
  min_price?: number;
  max_price?: number;
  min_guests?: number;
  amenities?: string[];
  search?: string;
}
