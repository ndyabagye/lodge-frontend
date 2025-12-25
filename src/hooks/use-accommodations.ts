import { useQuery } from "@tanstack/react-query";
import { accommodationService } from "@/services/accommodation.service";
import { QUERY_KEYS } from "@/lib/constants";
import type { AccommodationFilters, PaginationParams } from "@/types";

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
