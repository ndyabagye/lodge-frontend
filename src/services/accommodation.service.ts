import { api } from "@/lib/api-client";
import type {
  Accommodation,
  AccommodationFilters,
  PaginatedResponse,
  PaginationParams,
} from "@/types";

export const accommodationService = {
  // GET /api/v1/accommodations
  getAll: async (
    filters?: AccommodationFilters & PaginationParams,
  ): Promise<PaginatedResponse<Accommodation>> => {
    const { data } = await api.get("/accommodations", { params: filters });
    return data;
  },

  // GET /api/v1/accommodations/:id
  getById: async (id: string): Promise<Accommodation> => {
    const { data } = await api.get(`/accommodations/${id}`);
    return data.data;
  },

  // GET /api/v1/accommodations/slug/:slug
  getBySlug: async (slug: string): Promise<Accommodation> => {
    const { data } = await api.get(`/accommodations/slug/${slug}`);
    return data.data;
  },

  // GET /api/v1/accommodations/:id/availability
  checkAvailability: async (
    id: string,
    params: { start_date: string; end_date: string },
  ) => {
    const { data } = await api.get(`/accommodations/${id}/availability`, {
      params,
    });
    return data.data;
  },

  // GET /api/v1/accommodations/:id/reviews
  getReviews: async (id: string) => {
    const { data } = await api.get(`/accommodations/${id}/reviews`);
    return data;
  },
};
