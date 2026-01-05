import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { CheckoutSteps } from "../components/CheckoutSteps";
import { GuestInfoForm } from "../components/GuestInfoForm";
import { OrderSummarySidebar } from "../components/OrderSummarySidebar";
import { OrderReview } from "../components/OrderReview";
import { PaymentForm } from "../components/PaymentForm";

type CheckoutStep = "guest-info" | "review" | "payment";

export function CheckoutPageTemplate() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("guest-info");
  const [guestInfo, setGuestInfo] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    special_requests: "",
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && currentStep === "payment") {
      navigate({ to: "/cart" });
    }
  }, [items, navigate, currentStep]);

  const handleGuestInfoSubmit = (data: any) => {
    setGuestInfo(data);
    setCurrentStep("review");
  };

  const handleReviewConfirm = () => {
    setCurrentStep("payment");
  };

  // const handlePaymentSuccess = (bookingId: string) => {
  //   clearCart();
  //   toast.success("Booking confirmed!");
  //   navigate({ to: "/booking/confirmation/$id", params: { id: bookingId } });
  // };

  const handlePaymentSuccess = async (booking: {
    id: string;
    booking_number: string;
    guest_email: string;
  }) => {
    toast.success("Booking confirmed!");

    if (isAuthenticated) {
      await navigate({
        to: "/booking/confirmation/$id",
        params: { id: booking.id },
      });
    } else {
      await navigate({
        to: "/booking/confirmation/$bookingNumber",
        params: { bookingNumber: booking.booking_number },
        search: { email: booking.guest_email },
      });
    }
    clearCart();
  };

  const handleBack = () => {
    if (currentStep === "review") {
      setCurrentStep("guest-info");
    } else if (currentStep === "payment") {
      setCurrentStep("review");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/cart" })}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        {/* Steps Indicator */}
        <CheckoutSteps currentStep={currentStep} />

        {/* Step Content */}
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === "guest-info" && (
              <GuestInfoForm
                initialData={guestInfo}
                onSubmit={handleGuestInfoSubmit}
                isAuthenticated={isAuthenticated}
              />
            )}

            {currentStep === "review" && (
              <OrderReview
                guestInfo={guestInfo}
                onConfirm={handleReviewConfirm}
                onBack={handleBack}
              />
            )}

            {currentStep === "payment" && (
              <PaymentForm
                guestInfo={guestInfo}
                onSuccess={handlePaymentSuccess}
                onBack={handleBack}
              />
            )}
          </div>

          {/* Order Summary Sidebar - Always visible */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <OrderSummarySidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
