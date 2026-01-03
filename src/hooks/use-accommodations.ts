import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accommodationService } from "@/services/accommodation.service";
import { QUERY_KEYS } from "@/lib/constants";
import type {
  AccommodationFilters,
  CreateAccommodationInput,
  PaginationParams,
  UpdateAccommodationInput,
} from "@/types";
import { toast } from "sonner";

export function useAccommodations(
  filters?: AccommodationFilters & PaginationParams,
) {
  return useQuery({
    queryKey: [QUERY_KEYS.ACCOMMODATIONS, filters],
    queryFn: () => accommodationService.getAll(filters),
  });
}

export function useAccommodation(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ACCOMMODATION, id],
    queryFn: () => accommodationService.getById(id),
    enabled: !!id,
  });
}

export function useAccommodationBySlug(slug: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ACCOMMODATION, slug],
    queryFn: () => accommodationService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useAccommodationAvailability(
  id: string,
  startDate?: string,
  endDate?: string,
) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.ACCOMMODATION,
      id,
      "availability",
      startDate,
      endDate,
    ],
    queryFn: () =>
      accommodationService.checkAvailability(id, {
        start_date: startDate!,
        end_date: endDate!,
      }),
    enabled: !!id && !!startDate && !!endDate,
  });
}

export function useAccommodationReviews(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ACCOMMODATION, id, "reviews"],
    queryFn: () => accommodationService.getReviews(id),
    enabled: !!id,
  });
}

export function useCreateAccommodation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAccommodationInput) =>
      accommodationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACCOMMODATIONS],
      });
      toast.success("Accommodation created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to create accommodation",
      );
    },
  });
}

export function useUpdateAccommodation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateAccommodationInput;
    }) => accommodationService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ACCOMMODATIONS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACCOMMODATION, variables.id],
      });
      toast.success("Accommodation updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update accommodation",
      );
    },
  });
}

export function useDeleteAccommodation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => accommodationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN, QUERY_KEYS.ACCOMMODATIONS],
      });
      toast.success("Accommodation deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete accommodation",
      );
    },
  });
}

export function useUploadAccommodationImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      accommodationService.uploadImages(id, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.ADMIN,
          QUERY_KEYS.ACCOMMODATIONS,
          QUERY_KEYS.ACCOMMODATION,
          variables.id,
        ],
      });
      toast.success("Images uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to upload images");
    },
  });
}

export function useDeleteAccommodationImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageId }: { id: string; imageId: string }) =>
      accommodationService.deleteImage(id, imageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.ADMIN,
          QUERY_KEYS.ACCOMMODATIONS,
          QUERY_KEYS.ACCOMMODATION,
          variables.id,
        ],
      });
      toast.success("Image deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete image");
    },
  });
}
