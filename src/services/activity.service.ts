import { api } from "@/lib/api-client";
import type {
  Activity,
  ActivityFilters,
  PaginatedResponse,
  PaginationParams,
} from "@/types";

export const activityService = {
  // GET /api/v1/activities
  getAll: async (
    params?: ActivityFilters & PaginationParams,
  ): Promise<PaginatedResponse<Activity>> => {
    const { data } = await api.get("/activities", { params });
    return data;
  },

  // GET /api/v1/activities/:id
  getById: async (id: string): Promise<Activity> => {
    const { data } = await api.get(`/activities/${id}`);
    return data.data;
  },

  // GET /api/v1/activities/slug/:slug
  getBySlug: async (slug: string): Promise<Activity> => {
    const { data } = await api.get(`/activities/slug/${slug}`);
    return data.data;
  },

  // GET /api/v1/activities/:id/availability
  checkAvailability: async (id: string, date: string) => {
    const { data } = await api.get(`/activities/${id}/availability`, {
      params: { date },
    });
    return data.data;
  },

  // POST /api/v1/activities/:id/book
  bookActivity: async (
    id: string,
    bookingData: {
      date: string;
      time?: string;
      num_adults: number;
      num_children: number;
      special_requests?: string;
    },
  ) => {
    const { data } = await api.post(`/activities/${id}/book`, bookingData);
    return data.data;
  },
};
