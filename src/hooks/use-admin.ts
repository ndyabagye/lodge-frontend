import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { toast } from "sonner";
import type { PaginationParams } from "@/types";
import { QUERY_KEYS } from "@/lib/constants";
import { accommodationService } from "@/services/accommodation.service";

// Dashboard hooks
export function useDashboardStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.DASHBOARD, QUERY_KEYS.STATS],
    queryFn: () => adminService.getDashboardStats(),
  });
}

export function useRevenueData(from: string, to: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.REVENUE, from, to],
    queryFn: () => adminService.getRevenueData({ from, to }),
    enabled: !!from && !!to,
  });
}

// Accommodations hooks
export function useAdminAccommodations(params?: PaginationParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACCOMMODATIONS, params],
    queryFn: () => accommodationService.getAllAccommodations(params),
  });
}

// export function useCreateAccommodation() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: adminService.createAccommodation,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACCOMMODATIONS] });
//       toast.success("Accommodation created successfully");
//     },
//     onError: (error: any) => {
//       toast.error(
//         error.response?.data?.message || "Failed to create accommodation",
//       );
//     },
//   });
// }

// export function useUpdateAccommodation() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) =>
//       adminService.updateAccommodation(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACCOMMODATIONS] });
//       toast.success("Accommodation updated successfully");
//     },
//     onError: (error: any) => {
//       toast.error(
//         error.response?.data?.message || "Failed to update accommodation",
//       );
//     },
//   });
// }

// export function useDeleteAccommodation() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: adminService.deleteAccommodation,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACCOMMODATIONS] });
//       toast.success("Accommodation deleted successfully");
//     },
//     onError: (error: any) => {
//       toast.error(
//         error.response?.data?.message || "Failed to delete accommodation",
//       );
//     },
//   });
// }

export function useTopAccomodations() {
  return useQuery({
    queryKey: [
      QUERY_KEYS.ADMIN,
      QUERY_KEYS.DASHBOARD,
      QUERY_KEYS.ACCOMMODATIONS,
    ],
    queryFn: () => adminService.getTopAccommodations(),
  });
}

// Activities hooks
export function useAdminActivities(params?: PaginationParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACTIVITIES, params],
    queryFn: () => adminService.getAllActivities(params),
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACTIVITIES],
      });
      toast.success("Activity created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create activity");
    },
  });
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      adminService.updateActivity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACTIVITIES],
      });
      toast.success("Activity updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update activity");
    },
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACTIVITIES],
      });
      toast.success("Activity deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete activity");
    },
  });
}

// Bookings hooks
export function useAdminBookings(
  params?: PaginationParams & { status?: string; search?: string },
) {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.BOOKINGS, params],
    queryFn: () => adminService.getAllBookings(params),
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminService.updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.BOOKINGS],
      });
      toast.success("Booking status updated");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update booking status",
      );
    },
  });
}

// Users hooks
export function useAdminUsers(
  params?: PaginationParams & { role?: string; search?: string },
) {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.USERS, params],
    queryFn: () => adminService.getAllUsers(params),
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      adminService.updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.USERS],
      });
      toast.success("User role updated");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update user role",
      );
    },
  });
}

export function useSuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.suspendUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.USERS],
      });
      toast.success("User suspended");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to suspend user");
    },
  });
}

export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.activateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.USERS],
      });
      toast.success("User activated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to activate user");
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.USERS],
      });
      toast.success("User deleted");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
    },
  });
}
