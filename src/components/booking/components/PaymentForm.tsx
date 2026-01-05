import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  Smartphone,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useCreateBooking } from "@/hooks/use-bookings";
import {
  usePaymentGateways,
  useInitializeGuestPayment,
} from "@/hooks/use-payments";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentFormProps {
  guestInfo: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    special_requests?: string;
  };
  onSuccess: (booking: {
    id: string;
    booking_number: string;
    guest_email: string;
  }) => void;
  onBack: () => void;
}

export function PaymentForm({
  guestInfo,
  onSuccess,
  onBack,
}: PaymentFormProps) {
  const [selectedGateway, setSelectedGateway] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  const { items, getTotal } = useCartStore();
  const { user } = useAuth(); // Get current user
  const { mutateAsync: createBooking } = useCreateBooking();
  const { data: gateways, isLoading: gatewaysLoading } = usePaymentGateways();
  // const { mutateAsync: initializeGuestPayment } = useInitializeGuestPayment();

  // Auto-select first available gateway
  useEffect(() => {
    if (gateways && gateways.length > 0 && !selectedGateway) {
      const firstEnabled = gateways.find((g) => g.enabled);
      if (firstEnabled) {
        setSelectedGateway(firstEnabled.name);
      }
    }
  }, [gateways, selectedGateway]);

  // Simulated payment processing
  const simulatePayment = async (bookingId: string): Promise<boolean> => {
    // Simulate 2-3 second payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // 95% success rate for simulation
    const success = Math.random() > 0.05;

    if (!success) {
      throw new Error("Payment declined. Please try again.");
    }

    return true;
  };

  const handlePayment = async () => {
    if (!selectedGateway) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Find accommodation in cart
      const accommodationItem = items.find(
        (item) => item.type === "accommodation",
      );

      console.log("The items in the cart", items);

      if (!accommodationItem) {
        toast.error("No accommodation found in cart");
        return;
      }

      // Step 2: Create booking with formatted data
      const numAdults = accommodationItem.num_adults ?? 1;
      const numChildren = accommodationItem.num_children ?? 0;

      const bookingData = {
        accommodation_id: accommodationItem.item_id,
        check_in_date: accommodationItem.check_in_date!,
        check_out_date: accommodationItem.check_out_date!,
        num_adults: numAdults,
        num_children: numChildren,
        num_guests: numAdults + numChildren,
        guest_first_name: guestInfo.first_name,
        guest_last_name: guestInfo.last_name,
        guest_email: guestInfo.email,
        guest_phone: guestInfo.phone,
        special_requests: guestInfo.special_requests,
      };

      // console.log("Creating booking with data:", bookingData);

      const booking = await createBooking(bookingData);
      setCreatedBooking(booking);

      // Step 3: Simulate payment (replace with real payment later)
      if (user) {
        await simulatePayment(booking.id);
      } else {
        await simulatePayment(booking.id);
      }

      // Step 4: Success!
      toast.success("Payment successful!");
      onSuccess({
        id: booking.id,
        booking_number: booking.booking_number,
        guest_email: booking.guest_email,
      });

      // // Step 3: Initialize payment
      // // Check if user is authenticated or guest
      // if (user) {
      //   // Authenticated user - use booking ID
      //   // You'll need to add useInitializePayment hook
      //   toast.info("Redirecting to payment gateway...");
      //   // For now, redirect to success (implement later)
      //   setTimeout(() => {
      //     onSuccess(booking.booking_number);
      //   }, 2000);
      // } else {
      //   // Guest - use booking number + email
      //   const paymentResult = await initializeGuestPayment({
      //     bookingNumber: booking.booking_number,
      //     email: guestInfo.email,
      //     gateway: selectedGateway as any,
      //   });

      //   // The hook will automatically redirect to authorization_url
      //   // When user returns, they'll be redirected to payment callback page
      // }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Get gateway icon
  const getGatewayIcon = (gatewayName: string) => {
    switch (gatewayName) {
      case "stripe":
        return <CreditCard className="h-4 w-4" />;
      case "flutterwave":
      case "pesapal":
      case "iotec":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  // Get gateway description
  const getGatewayDescription = (gatewayName: string) => {
    switch (gatewayName) {
      case "stripe":
        return "Credit/Debit Card";
      case "flutterwave":
        return "Card, Mobile Money, Bank";
      case "pesapal":
        return "Mobile Money, Visa, Mastercard";
      case "iotec":
        return "Mobile Money Payment";
      default:
        return "Payment Gateway";
    }
  };

  if (gatewaysLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!gateways || gateways.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No payment gateways are currently available. Please contact support.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Gateway Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedGateway}
            onValueChange={setSelectedGateway}
            className="space-y-2"
          >
            {gateways
              .filter((gateway) => gateway.enabled)
              .map((gateway) => (
                <div
                  key={gateway.name}
                  className={`flex items-center space-x-3 border rounded-md p-3 cursor-pointer transition-colors ${
                    selectedGateway === gateway.name
                      ? "bg-accent border-primary"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <RadioGroupItem value={gateway.name} id={gateway.name} />
                  <Label
                    htmlFor={gateway.name}
                    className="flex items-center gap-2 cursor-pointer flex-1 text-sm"
                  >
                    {getGatewayIcon(gateway.name)}
                    <div className="flex-1">
                      <p className="font-medium capitalize">{gateway.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {getGatewayDescription(gateway.name)}
                      </p>
                    </div>
                    {selectedGateway === gateway.name && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                    <div className="text-xs text-muted-foreground">
                      {gateway.currencies.join(", ")}
                    </div>
                  </Label>
                </div>
              ))}
          </RadioGroup>

          {/* Simulation Notice */}
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Demo Mode:</strong> Payments are simulated. No actual
              charges will be made.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  After successful payment, you'll receive a booking
                  confirmation via email at{" "}
                  <span className="font-medium text-foreground">
                    {guestInfo.email}
                  </span>
                </p>

                {createdBooking && (
                  <div className="bg-primary/10 border border-primary/20 rounded-md p-3">
                    <p className="text-primary font-medium text-sm">
                      Booking Number:{" "}
                      <span className="font-bold text-base">
                        {createdBooking.booking_number}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Save this number to track your booking
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Amount */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-2xl font-bold">
            <span>Total to Pay</span>
            {/*<span className="text-xs font-light">{JSON.stringify(items)}</span>*/}
            <span>{formatPrice(getTotal())}</span>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handlePayment}
          disabled={isProcessing || !selectedGateway}
          size="lg"
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ${formatPrice(getTotal())}`
          )}
        </Button>
      </div>
    </div>
  );
}
