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
    // Ensure dates are in ISO 8601 format
    const formattedData = {
      ...data,
      check_in_date: new Date(data.check_in_date).toISOString(),
      check_out_date: new Date(data.check_out_date).toISOString(),
      num_guests: data.num_adults + data.num_children, // Calculate total guests
    };

    const response = await api.post("/bookings", formattedData);
    return response.data.data;
  },

  // GET /api/v1/bookings - authenticated users
  getAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Booking>> => {
    const { data } = await api.get("/bookings", { params });
    return data;
  },

  // GET /api/v1/bookings/:id - authenticated users
  getById: async (id: string): Promise<Booking> => {
    const { data } = await api.get(`/bookings/${id}`);
    return data.data;
  },

  // Get guest booking by booking number - guest
  getGuestBooking: async (
    bookingNumber: string,
    email: string,
  ): Promise<Booking> => {
    const { data } = await api.get(`/bookings/guest/${bookingNumber}`, {
      params: { email },
    });
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

  // GET /api/v1/bookings/:id/invoice/preview (Authenticated)
  previewInvoice: async (id: string): Promise<any> => {
    const response = await api.get(`/bookings/${id}/invoice/preview`);
    return response.data;
  },

  // GET /api/v1/bookings/:id/invoice (Authenticated - Download PDF)
  downloadInvoice: async (id: string): Promise<Blob> => {
    const response = await api.get(`/bookings/${id}/invoice`, {
      responseType: "blob",
    });
    return response.data;
  },

  // Guest invoice preview
  previewGuestInvoice: async (
    bookingNumber: string,
    email: string,
  ): Promise<any> => {
    const response = await api.get(
      `/bookings/guest/${bookingNumber}/invoice/preview`,
      {
        params: { email },
      },
    );
    return response.data;
  },

  // Guest invoice download
  downloadGuestInvoice: async (
    bookingNumber: string,
    email: string,
  ): Promise<Blob> => {
    const response = await api.get(`/bookings/guest/${bookingNumber}/invoice`, {
      params: { email },
      responseType: "blob",
    });
    return response.data;
  },
};
