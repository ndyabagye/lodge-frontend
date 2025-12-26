// import type { Accommodation } from "./accomodation";
// import type { Activity } from "./activity";

export interface CartItem {
  id: string;
  type: "accommodation" | "activity";
  item_id: string;
  item: any; // Will be Accommodation or Activity
  // for accommodations
  check_in_date?: string;
  check_out_date?: string;
  // for activities
  date?: string;
  time?: string;
  // common
  quantity: number;
  price: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  service_fee: number;
  total: number;
}
