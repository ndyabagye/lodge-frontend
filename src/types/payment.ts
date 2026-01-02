import type { Booking } from "./booking";

export interface Payment {
  id: string;
  booking_id: string;
  transaction_id: string | null;
  reference: string | null;
  amount: number;
  currency: string;
  payment_method: string | null;
  payment_gateway: {
    name: string | null;
    label: string | null;
  };
  status: {
    value: string;
    label:
      | "Pending"
      | "Paid"
      | "Partially Paid"
      | "Refunded"
      | "Failed"
      | "Completed";
  };
  booking?: Booking;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface PaymentGateway {
  name: "stripe" | "flutterwave" | "pesapal" | "iotec";
  label: string;
  enabled: boolean;
  currencies: string[];
}

export interface InitializePaymentResponse {
  payment: Payment;
  authorization_url: string;
  reference: string;
}
