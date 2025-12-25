import { api } from "@/lib/api-client";
import type { Activity, PaginatedResponse, PaginationParams } from "@/types";

export const activityService = {
  // GET /api/v1/activities
  getAll: async (
    params?: PaginationParams & { category?: string; featured?: boolean },
  ): Promise<PaginatedResponse<Activity>> => {
    const { data } = await api.get("/activities", { params });
    return data;
  },

  // GET /api/v1/activities/:id
  getById: async (id: string): Promise<Activity> => {
    const { data } = await api.get(`/activities/${id}`);
    return data.data;
  },

  // GET /api/v1/activities/:id/availability
  checkAvailability: async (id: string, date: string) => {
    const { data } = await api.get(`/activities/${id}/availability`, {
      params: { date },
    });
    return data.data;
  },
};
