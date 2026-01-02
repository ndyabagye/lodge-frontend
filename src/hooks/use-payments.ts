import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";
import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "sonner";

// Get available payment gateways
export function usePaymentGateways() {
  return useQuery({
    queryKey: [QUERY_KEYS.PAYMENT_GATEWAYS],
    queryFn: () => paymentService.getGateways(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

// Initialize payment for authenticated user
export function useInitializePayment() {
  return useMutation({
    mutationFn: ({
      bookingId,
      gateway,
    }: {
      bookingId: string;
      gateway: "stripe" | "flutterwave" | "pesapal" | "iotec";
    }) => paymentService.initialize(bookingId, gateway),
    onSuccess: (data) => {
      // Redirect to payment gateway
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to initialize payment",
      );
    },
  });
}

// Initialize payment for guest
export function useInitializeGuestPayment() {
  return useMutation({
    mutationFn: ({
      bookingNumber,
      email,
      gateway,
    }: {
      bookingNumber: string;
      email: string;
      gateway: "stripe" | "flutterwave" | "pesapal" | "iotec";
    }) => paymentService.initializeGuest(bookingNumber, email, gateway),
    onSuccess: (data) => {
      // Redirect to payment gateway
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to initialize payment",
      );
    },
  });
}

// Verify payment (after redirect from gateway)
export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reference,
      gateway,
    }: {
      reference: string;
      gateway: string;
    }) => paymentService.verify(reference, gateway),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKINGS] });
      toast.success("Payment verified successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Payment verification failed",
      );
    },
  });
}

// Download receipt
export function useDownloadReceipt() {
  return useMutation({
    mutationFn: (paymentId: string) =>
      paymentService.downloadReceipt(paymentId),
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Receipt downloaded!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to download receipt",
      );
    },
  });
}

// Download guest receipt
export function useDownloadGuestReceipt() {
  return useMutation({
    mutationFn: ({
      bookingNumber,
      email,
    }: {
      bookingNumber: string;
      email: string;
    }) => paymentService.downloadGuestReceipt(bookingNumber, email),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Receipt downloaded!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to download receipt",
      );
    },
  });
}

// Request refund (admin/staff)
export function useRefundPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      amount,
      reason,
    }: {
      paymentId: string;
      amount?: number;
      reason?: string;
    }) => paymentService.refund(paymentId, amount, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKINGS] });
      toast.success("Refund processed successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to process refund");
    },
  });
}

// Get payment statistics (admin)
export function usePaymentStatistics(from: string, to: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PAYMENT_STATS, from, to],
    queryFn: () => paymentService.getStatistics(from, to),
    enabled: !!from && !!to,
  });
}
