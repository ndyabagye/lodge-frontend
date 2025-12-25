import { api } from "@/lib/api-client";
import type {
  Booking,
  CreateBookingData,
  PaginatedResponse,
  PaginationParams,
} from "@/types";

export const bookingService = {
  // POST /api/v1/bookings
  create: async (data: CreateBookingData): Promise<Booking> => {
    const response = await api.post("/bookings", data);
    return response.data.data;
  },

  // GET /api/v1/bookings
  getAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Booking>> => {
    const { data } = await api.get("/bookings", { params });
    return data;
  },

  // GET /api/v1/bookings/:id
  getById: async (id: string): Promise<Booking> => {
    const { data } = await api.get(`/bookings/${id}`);
    return data.data;
  },

  // PUT /api/v1/bookings/:id
  update: async (id: string, data: Partial<Booking>): Promise<Booking> => {
    const response = await api.put(`/bookings/${id}`, data);
    return response.data.data;
  },

  // DELETE /api/v1/bookings/:id (Cancel)
  cancel: async (id: string, reason?: string): Promise<{ message: string }> => {
    const response = await api.delete(`/bookings/${id}`, {
      data: { cancellation_reason: reason },
    });
    return response.data;
  },

  // POST /api/v1/bookings/check-availability
  checkAvailability: async (data: {
    accommodation_id: string;
    check_in_date: string;
    check_out_date: string;
  }): Promise<{ available: boolean; message?: string }> => {
    const response = await api.post("/bookings/check-availability", data);
    return response.data.data;
  },

  // GET /api/v1/bookings/:id/invoice
  getInvoice: async (id: string): Promise<Blob> => {
    const response = await api.get(`/bookings/${id}/invoice`, {
      responseType: "blob",
    });
    return response.data;
  },
};
