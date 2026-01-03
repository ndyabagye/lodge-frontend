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
  minimum_stay: number | null;
  maximum_stay: number | null;
  check_in_time: string | null;
  check_out_time: string | null;
  status: "available" | "maintenance" | "coming_soon" | "archived";
  featured: boolean;
  rating: number;
  views: number | null;
  bookings: number | null;
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
  order: number;
  active: boolean;
}

export interface AccommodationFilters {
  type?: string;
  min_price?: number;
  max_price?: number;
  min_guests?: number;
  amenities?: string[];
  search?: string;
  featured?: boolean;
}

export interface TopAccommodation extends Record<string, string | number> {
  name: string;
  value: number;
}

export interface CreateAccommodationInput {
  name: string;
  slug?: string;
  type: string;
  description: string;
  short_description: string;
  max_guests: number;
  num_bedrooms: number;
  num_bathrooms: number;
  num_beds: number;
  size_sqft?: number;
  base_price: number;
  weekend_price: number;
  cleaning_fee: number;
  minimum_stay: number;
  maximum_stay?: number;
  check_in_time: string;
  check_out_time: string;
  status?: "available" | "maintenance" | "coming_soon" | "archived";
  featured?: boolean;
  amenities?: string[]; // Array of amenity IDs
}

export interface UpdateAccommodationInput extends Partial<CreateAccommodationInput> {}
