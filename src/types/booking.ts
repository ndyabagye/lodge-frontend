export interface Booking {
  id: string;
  booking_number: string;
  user_id: string | null;
  accommodation_id: string;
  check_in_date: string;
  check_out_date: string;
  num_guests: number;
  num_adults: number;
  num_children: number;
  subtotal: number;
  tax_amount: number;
  service_fee: number;
  cleaning_fee: number;
  discount: number;
  total_amount: number;
  payment_status: "pending" | "paid" | "partially_paid" | "refunded" | "failed";
  status: "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled";
  guest_email: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_phone: string;
  special_requests: string | null;
  accommodation?: any; // AccommodationResource
  user?: any; // UserResource
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  accommodation_id: string;
  check_in_date: string;
  check_out_date: string;
  num_guests: number;
  num_adults: number;
  num_children: number;
  guest_email: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_phone: string;
  special_requests?: string;
  payment_method?: string;
}
