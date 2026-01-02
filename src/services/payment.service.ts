import { api } from "@/lib/api-client";
import type {
  Payment,
  PaymentGateway,
  InitializePaymentResponse,
} from "@/types";

export const paymentService = {
  // GET /api/v1/payments/gateways
  getGateways: async (): Promise<PaymentGateway[]> => {
    const response = await api.get("/payments/gateways");
    const rawGateways = response.data.data ?? [];

    return rawGateways.map((g: any) => ({
      name: g.name,
      label: g.label,
      enabled: g.supports_card || g.supports_mobile_money,
      currencies: [
        ...(g.supports_card ? ["Card"] : []),
        ...(g.supports_mobile_money ? ["Mobile Money"] : []),
      ],
    }));
  },

  // POST /api/v1/payments/bookings/{booking}/initialize (Authenticated)
  initialize: async (
    bookingId: string,
    gateway: "stripe" | "flutterwave" | "pesapal" | "iotec",
  ): Promise<InitializePaymentResponse> => {
    const response = await api.post(
      `/payments/bookings/${bookingId}/initialize`,
      {
        gateway,
      },
    );
    return response.data.data;
  },

  // Initialize payment for guest booking
  initializeGuest: async (
    bookingNumber: string,
    email: string,
    gateway: "stripe" | "flutterwave" | "pesapal" | "iotec",
  ): Promise<InitializePaymentResponse> => {
    const response = await api.post(
      `/payments/guest/${bookingNumber}/initialize`,
      {
        gateway,
      },
      {
        params: { email },
      },
    );
    return response.data.data;
  },

  // POST /api/v1/payments/verify
  verify: async (reference: string, gateway: string): Promise<Payment> => {
    const response = await api.post("/payments/verify", {
      reference,
      gateway,
    });
    return response.data.data;
  },

  // GET /api/v1/payments/{payment}/receipt (Authenticated - Download PDF)
  downloadReceipt: async (paymentId: string): Promise<Blob> => {
    const response = await api.get(`/payments/${paymentId}/receipt`, {
      responseType: "blob",
    });
    return response.data;
  },

  // Download guest receipt
  downloadGuestReceipt: async (
    bookingNumber: string,
    email: string,
  ): Promise<Blob> => {
    const response = await api.get(`/payments/guest/${bookingNumber}/receipt`, {
      params: { email },
      responseType: "blob",
    });
    return response.data;
  },

  // POST /api/v1/payments/{payment}/refund (Staff only)
  refund: async (
    paymentId: string,
    amount?: number,
    reason?: string,
  ): Promise<Payment> => {
    const response = await api.post(`/payments/${paymentId}/refund`, {
      amount,
      reason,
    });
    return response.data.data;
  },

  // GET /api/v1/admin/payments/statistics (Admin only)
  getStatistics: async (from: string, to: string): Promise<any> => {
    const response = await api.get("/admin/payments/statistics", {
      params: { from, to },
    });
    return response.data.data;
  },
};
