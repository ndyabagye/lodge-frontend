export interface Activity {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  short_description: string;
  duration: number; // in minutes
  price: number;
  adult_price: number;
  child_price: number;
  group_price?: number;
  max_participants: number;
  min_age?: number;
  max_age?: number;
  requirements?: string;
  safety_info?: string;
  included?: string;
  excluded?: string;
  status: "available" | "unavailable" | "coming_soon";
  featured: boolean;
  rating: number;
  views: number;
  bookings: number;
  images: ActivityImage[];
  availability?: ActivityAvailability[];
  created_at: string;
  updated_at: string;
}

export interface ActivityImage {
  id: string;
  url: string;
  thumbnail_url: string;
  alt_text: string;
  caption?: string;
  order: number;
  is_featured: boolean;
}

export interface ActivityAvailability {
  id: string;
  activity_id: string;
  date: string;
  time: string;
  available_slots: number;
  booked_slots: number;
}

export interface ActivityCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  active: boolean;
}

export interface ActivityBooking {
  id: string;
  activity_id: string;
  date: string;
  time?: string;
  num_participants: number;
  num_adults: number;
  num_children: number;
  price: number;
  total_amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  special_requests?: string;
}

export interface ActivityFilters {
  category?: string;
  min_price?: number;
  max_price?: number;
  min_duration?: number;
  max_duration?: number;
  min_participants?: number;
  search?: string;
  featured?: boolean;
}
