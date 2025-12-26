import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { activityService } from "@/services/activity.service";
import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "sonner";
import type { ActivityFilters, PaginationParams } from "@/types";

export function useActivities(filters?: ActivityFilters & PaginationParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITIES, filters],
    queryFn: () => activityService.getAll(filters),
  });
}

export function useActivity(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITY, id],
    queryFn: () => activityService.getById(id),
    enabled: !!id,
  });
}

export function useActivityBySlug(slug: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITY, slug],
    queryFn: () => activityService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useActivityAvailability(id: string, date?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITY, id, "availability", date],
    queryFn: () => activityService.checkAvailability(id, date!),
    enabled: !!id && !!date,
  });
}

export function useBookActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      activityService.bookActivity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ACTIVITIES] });
      toast.success("Activity booked successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to book activity");
    },
  });
}
