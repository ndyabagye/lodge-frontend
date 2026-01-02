// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { CreditCard, Smartphone, Loader2 } from "lucide-react";
// import { useCartStore } from "@/stores/cart-store";
// import { useCreateBooking } from "@/hooks/use-bookings";
// import { toast } from "sonner";
// import { formatPrice } from "@/lib/utils";

// type PaymentMethod = "card" | "mobile_money";

// interface PaymentFormProps {
//   guestInfo: {
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone: string;
//     special_requests?: string;
//   };
//   onSuccess: (bookingId: string) => void;
//   onBack: () => void;
// }

// export function PaymentForm({
//   guestInfo,
//   onSuccess,
//   onBack,
// }: PaymentFormProps) {
//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const { items, getTotal } = useCartStore();
//   const { mutateAsync: createBooking } = useCreateBooking();

//   const handlePayment = async () => {
//     setIsProcessing(true);

//     try {
//       // For now, we'll create the booking directly
//       // In production, you'd integrate with actual payment gateways

//       const accommodationItem = items.find(
//         (item) => item.type === "accommodation",
//       );

//       if (!accommodationItem) {
//         toast.error("No accommodation found in cart");
//         return;
//       }

//       const bookingData = {
//         accommodation_id: accommodationItem.item_id,
//         check_in_date: accommodationItem.check_in_date!,
//         check_out_date: accommodationItem.check_out_date!,
//         num_adults: 2, // You can get this from the booking widget state
//         num_children: 0,
//         guest_first_name: guestInfo.first_name,
//         guest_last_name: guestInfo.last_name,
//         guest_email: guestInfo.email,
//         guest_phone: guestInfo.phone,
//         special_requests: guestInfo.special_requests,
//       };

//       const booking = await createBooking(bookingData);

//       // Simulate payment processing
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       // In production, you'd:
//       // 1. Call payment gateway API (Stripe/Flutterwave)
//       // 2. Handle payment confirmation
//       // 3. Update booking payment status
//       // 4. Send confirmation email

//       onSuccess(booking.id);
//     } catch (error: any) {
//       console.error("Payment error:", error);
//       toast.error(error.message || "Payment failed. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Payment Method Selection */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Payment Method</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <RadioGroup
//             value={paymentMethod}
//             onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
//             className="space-y-3"
//           >
//             <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
//               <RadioGroupItem value="card" id="card" />
//               <Label
//                 htmlFor="card"
//                 className="flex items-center gap-3 cursor-pointer flex-1"
//               >
//                 <CreditCard className="h-5 w-5" />
//                 <div>
//                   <p className="font-medium">Credit / Debit Card</p>
//                   <p className="text-sm text-muted-foreground">
//                     Visa, Mastercard
//                   </p>
//                 </div>
//               </Label>
//             </div>

//             <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
//               <RadioGroupItem value="mobile_money" id="mobile_money" />
//               <Label
//                 htmlFor="mobile_money"
//                 className="flex items-center gap-3 cursor-pointer flex-1"
//               >
//                 <Smartphone className="h-5 w-5" />
//                 <div>
//                   <p className="font-medium">Mobile Money</p>
//                   <p className="text-sm text-muted-foreground">MTN, Airtel</p>
//                 </div>
//               </Label>
//             </div>
//           </RadioGroup>
//         </CardContent>
//       </Card>

//       {/* Payment Details - Card */}
//       {paymentMethod === "card" && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Card Details</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="bg-muted/50 border border-dashed rounded-lg p-8 text-center">
//               <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
//               <p className="text-sm text-muted-foreground mb-2">
//                 Stripe integration will be added here
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 For demo purposes, clicking "Pay Now" will simulate a successful
//                 payment
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Payment Details - Mobile Money */}
//       {paymentMethod === "mobile_money" && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Mobile Money Details</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="bg-muted/50 border border-dashed rounded-lg p-8 text-center">
//               <Smartphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
//               <p className="text-sm text-muted-foreground mb-2">
//                 Flutterwave/Paystack integration will be added here
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 For demo purposes, clicking "Pay Now" will simulate a successful
//                 payment
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Total Amount */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex items-center justify-between text-2xl font-bold">
//             <span>Total to Pay</span>
//             <span>{formatPrice(getTotal())}</span>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <Button
//           variant="outline"
//           onClick={onBack}
//           disabled={isProcessing}
//           className="flex-1"
//         >
//           Back
//         </Button>
//         <Button
//           onClick={handlePayment}
//           disabled={isProcessing}
//           size="lg"
//           className="flex-1"
//         >
//           {isProcessing ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Processing...
//             </>
//           ) : (
//             "Pay Now"
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }

// FILE: src/components/checkout/PaymentForm.tsx

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Loader2, AlertCircle } from "lucide-react";
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
  onSuccess: (bookingNumber: string) => void;
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
  const { mutateAsync: initializeGuestPayment } = useInitializeGuestPayment();

  // Auto-select first available gateway
  useEffect(() => {
    if (gateways && gateways.length > 0 && !selectedGateway) {
      const firstEnabled = gateways.find((g) => g.enabled);
      if (firstEnabled) {
        setSelectedGateway(firstEnabled.name);
      }
    }
  }, [gateways, selectedGateway]);

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

      if (!accommodationItem) {
        toast.error("No accommodation found in cart");
        return;
      }

      // Step 2: Create booking
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

      const booking = await createBooking(bookingData);
      setCreatedBooking(booking);

      // Step 3: Initialize payment
      // Check if user is authenticated or guest
      if (user) {
        // Authenticated user - use booking ID
        // You'll need to add useInitializePayment hook
        toast.info("Redirecting to payment gateway...");
        // For now, redirect to success (implement later)
        setTimeout(() => {
          onSuccess(booking.booking_number);
        }, 2000);
      } else {
        // Guest - use booking number + email
        const paymentResult = await initializeGuestPayment({
          bookingNumber: booking.booking_number,
          email: guestInfo.email,
          gateway: selectedGateway as any,
        });

        // The hook will automatically redirect to authorization_url
        // When user returns, they'll be redirected to payment callback page
      }
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
        return <CreditCard className="h-5 w-5" />;
      case "flutterwave":
      case "pesapal":
      case "iotec":
        return <Smartphone className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  // Get gateway description
  const getGatewayDescription = (gatewayName: string) => {
    switch (gatewayName) {
      case "stripe":
        return "Credit/Debit Card";
      case "flutterwave":
        return "Card, Mobile Money, Bank Transfer";
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
            className="space-y-3"
          >
            {gateways
              .filter((gateway) => gateway.enabled)
              .map((gateway) => (
                <div
                  key={gateway.name}
                  className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors"
                >
                  <RadioGroupItem value={gateway.name} id={gateway.name} />
                  <Label
                    htmlFor={gateway.name}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    {getGatewayIcon(gateway.name)}
                    <div className="flex-1">
                      <p className="font-medium capitalize">{gateway.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {getGatewayDescription(gateway.name)}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {gateway.currencies.join(", ")}
                    </div>
                  </Label>
                </div>
              ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  You will be redirected to the payment gateway to complete your
                  payment securely.
                </p>
                <p>
                  After successful payment, you'll receive a booking
                  confirmation via email at{" "}
                  <span className="font-medium text-foreground">
                    {guestInfo.email}
                  </span>
                </p>
                {!user && createdBooking && (
                  <p className="text-primary font-medium">
                    Your booking number:{" "}
                    <span className="font-bold">
                      {createdBooking.booking_number}
                    </span>
                    <br />
                    Save this number to track your booking
                  </p>
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
