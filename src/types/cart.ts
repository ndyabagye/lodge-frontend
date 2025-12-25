export interface CartItem {
  id: string;
  type: "accommodation" | "activity";
  item_id: string;
  item: unknown; // Will be Accommodation or Activity
  check_in_date?: string;
  check_out_date?: string;
  date?: string;
  time?: string;
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
