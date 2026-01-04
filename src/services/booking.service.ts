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
    // Format dates properly - API expects YYYY-MM-DD HH:MM:SS format
    const formatDateForAPI = (dateString: string): string => {
      // If it's already in YYYY-MM-DD format, append time
      if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return `${dateString} 00:00:00`;
      }
      // If it's ISO format, convert to YYYY-MM-DD HH:MM:SS
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day} 00:00:00`;
    };

    const formattedData = {
      ...data,
      check_in_date: formatDateForAPI(data.check_in_date),
      check_out_date: formatDateForAPI(data.check_out_date),
    };

    // console.log("Sending booking data:", formattedData); // Debug log

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
  }): Promise<{
    available: boolean;
    message?: string;
    pricing?: any;
    availability?: any;
  }> => {
    try {
      // Backend expects start_date and end_date, not check_in_date/check_out_date
      const requestData = {
        accommodation_id: data.accommodation_id,
        start_date: data.check_in_date,
        end_date: data.check_out_date,
      };

      const response = await api.post(
        "/bookings/check-availability",
        requestData,
      );
      return response.data.data;
    } catch (error: any) {
      // If 422 error with availability message, return it
      if (error.response?.status === 422 && error.response?.data) {
        return {
          available: false,
          message: error.response.data.message || "Not available",
          ...error.response.data.data,
        };
      }
      throw error;
    }
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
