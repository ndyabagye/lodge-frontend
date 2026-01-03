import { api } from "@/lib/api-client";
import type {
  PaginatedResponse,
  PaginationParams,
  TopAccommodation,
} from "@/types";
import type { DashboardStats, RevenueData, AdminUser } from "@/types/admin";
import type { Activity } from "@/types/activity";
import type { Booking } from "@/types/booking";

export const adminService = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get("/admin/dashboard");
    return data.data;
  },

  getRevenueData: async (params: {
    from: string;
    to: string;
  }): Promise<RevenueData[]> => {
    const { data } = await api.get("/admin/reports/revenue", { params });
    return data.data;
  },

  // admin reports
  getTopAccommodations: async (): Promise<TopAccommodation[]> => {
    const { data } = await api.get("/admin/reports/top-accommodations");
    return data.data;
  },

  // Activities Management
  getAllActivities: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Activity>> => {
    const { data } = await api.get("/admin/activities", { params });
    return data;
  },

  createActivity: async (
    activityData: Partial<Activity>,
  ): Promise<Activity> => {
    const { data } = await api.post("/admin/activities", activityData);
    return data.data;
  },

  updateActivity: async (
    id: string,
    activityData: Partial<Activity>,
  ): Promise<Activity> => {
    const { data } = await api.put(`/admin/activities/${id}`, activityData);
    return data.data;
  },

  deleteActivity: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`/admin/activities/${id}`);
    return data;
  },

  // Bookings Management
  getAllBookings: async (
    params?: PaginationParams & { status?: string; search?: string },
  ): Promise<PaginatedResponse<Booking>> => {
    const { data } = await api.get("/admin/bookings", { params });
    return data;
  },

  updateBookingStatus: async (id: string, status: string): Promise<Booking> => {
    const { data } = await api.put(`/admin/bookings/${id}/status`, { status });
    return data.data;
  },

  // Users Management
  getAllUsers: async (
    params?: PaginationParams & { role?: string; search?: string },
  ): Promise<PaginatedResponse<AdminUser>> => {
    const { data } = await api.get("/admin/users", { params });
    return data;
  },

  updateUserRole: async (id: string, role: string): Promise<AdminUser> => {
    const { data } = await api.put(`/admin/users/${id}/role`, { role });
    return data.data;
  },

  suspendUser: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.put(`/admin/users/${id}/suspend`);
    return data;
  },

  activateUser: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.put(`/admin/users/${id}/activate`);
    return data;
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  },
};
