import { api } from "@/lib/api-client";
import type {
  Accommodation,
  AccommodationFilters,
  CreateAccommodationInput,
  PaginatedResponse,
  PaginationParams,
  UpdateAccommodationInput,
  AccommodationImage,
} from "@/types";

export const accommodationService = {
  // GET /api/v1/accommodations
  getAll: async (
    filters?: AccommodationFilters & PaginationParams,
  ): Promise<PaginatedResponse<Accommodation>> => {
    const { data } = await api.get("/accommodations", { params: filters });
    return data;
  },

  // Accommodations Management
  getAllAccommodations: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Accommodation>> => {
    const { data } = await api.get("/admin/accommodations", { params });
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
    return data.data;
  },

  // POST /api/v1/admin/accommodations
  create: async (data: CreateAccommodationInput): Promise<Accommodation> => {
    const response = await api.post("/admin/accommodations", data);
    return response.data.data;
  },

  // PUT /api/v1/admin/accommodations/:id
  update: async (
    id: string,
    data: UpdateAccommodationInput,
  ): Promise<Accommodation> => {
    const response = await api.put(`/admin/accommodations/${id}`, data);
    return response.data.data;
  },

  // DELETE /api/v1/admin/accommodations/:id
  delete: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`/admin/accommodations/${id}`);
    return data;
  },

  // POST /api/v1/admin/accommodations/:id/images
  uploadImages: async (
    id: string,
    formData: FormData,
  ): Promise<AccommodationImage[]> => {
    const response = await api.post(
      `/admin/accommodations/${id}/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data;
  },

  // DELETE /api/v1/admin/accommodations/:id/images/:imageId
  deleteImage: async (id: string, imageId: string): Promise<void> => {
    await api.delete(`/admin/accommodations/${id}/images/${imageId}`);
  },
};
