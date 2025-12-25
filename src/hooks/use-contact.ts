import { contactUsService } from "@/services/contact.service";
import type { ContactUsData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useContactUs() {
  const contactUsMutation = useMutation({
    mutationFn: (data: ContactUsData) => contactUsService.contactUs(data),
    onSuccess: () => {
      toast.success("Thank you for contacting us! We'll get back to you soon.");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
    },
  });

  return {
    mutate: contactUsMutation.mutate,
    isPending: contactUsMutation.isPending,
    isSuccess: contactUsMutation.isSuccess,
    isError: contactUsMutation.isError,
    error: contactUsMutation.error,
  };
}
