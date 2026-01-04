import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "@/services/booking.service";
import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "sonner";
import type { CreateBookingData, PaginationParams } from "@/types";

export function useBookings(params?: PaginationParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOKINGS, params],
    queryFn: () => bookingService.getAll(params),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOKINGS, id],
    queryFn: () => bookingService.getById(id),
    enabled: !!id,
  });
}

export function useGuestBooking(bookingNumber?: string, email?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GUEST_BOOKINGS, bookingNumber, email],
    queryFn: () => bookingService.getGuestBooking(bookingNumber!, email!),
    enabled: !!bookingNumber && !!email,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingData) => bookingService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKINGS] });
      toast.success("Booking created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create booking");
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      bookingService.cancel(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKINGS] });
      toast.success("Booking cancelled successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    },
  });
}

export function useCheckAvailability() {
  return useMutation({
    mutationFn: (data: {
      accommodation_id: string;
      check_in_date: string;
      check_out_date: string;
    }) => bookingService.checkAvailability(data),
  });
}
