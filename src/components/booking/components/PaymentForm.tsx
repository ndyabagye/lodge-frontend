import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useCreateBooking } from "@/hooks/use-bookings";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "card" | "mobile_money";

interface PaymentFormProps {
  guestInfo: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    special_requests?: string;
  };
  onSuccess: (bookingId: string) => void;
  onBack: () => void;
}

export function PaymentForm({
  guestInfo,
  onSuccess,
  onBack,
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, getTotal } = useCartStore();
  const { mutateAsync: createBooking } = useCreateBooking();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // For now, we'll create the booking directly
      // In production, you'd integrate with actual payment gateways

      const accommodationItem = items.find(
        (item) => item.type === "accommodation",
      );

      if (!accommodationItem) {
        toast.error("No accommodation found in cart");
        return;
      }

      const bookingData = {
        accommodation_id: accommodationItem.item_id,
        check_in_date: accommodationItem.check_in_date!,
        check_out_date: accommodationItem.check_out_date!,
        num_adults: 2, // You can get this from the booking widget state
        num_children: 0,
        guest_first_name: guestInfo.first_name,
        guest_last_name: guestInfo.last_name,
        guest_email: guestInfo.email,
        guest_phone: guestInfo.phone,
        special_requests: guestInfo.special_requests,
      };

      const booking = await createBooking(bookingData);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In production, you'd:
      // 1. Call payment gateway API (Stripe/Flutterwave)
      // 2. Handle payment confirmation
      // 3. Update booking payment status
      // 4. Send confirmation email

      onSuccess(booking.id);
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
              <RadioGroupItem value="card" id="card" />
              <Label
                htmlFor="card"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <CreditCard className="h-5 w-5" />
                <div>
                  <p className="font-medium">Credit / Debit Card</p>
                  <p className="text-sm text-muted-foreground">
                    Visa, Mastercard
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
              <RadioGroupItem value="mobile_money" id="mobile_money" />
              <Label
                htmlFor="mobile_money"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Smartphone className="h-5 w-5" />
                <div>
                  <p className="font-medium">Mobile Money</p>
                  <p className="text-sm text-muted-foreground">MTN, Airtel</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Details - Card */}
      {paymentMethod === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 border border-dashed rounded-lg p-8 text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Stripe integration will be added here
              </p>
              <p className="text-xs text-muted-foreground">
                For demo purposes, clicking "Pay Now" will simulate a successful
                payment
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Details - Mobile Money */}
      {paymentMethod === "mobile_money" && (
        <Card>
          <CardHeader>
            <CardTitle>Mobile Money Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 border border-dashed rounded-lg p-8 text-center">
              <Smartphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Flutterwave/Paystack integration will be added here
              </p>
              <p className="text-xs text-muted-foreground">
                For demo purposes, clicking "Pay Now" will simulate a successful
                payment
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Total Amount */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-2xl font-bold">
            <span>Total to Pay</span>
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
          disabled={isProcessing}
          size="lg"
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </Button>
      </div>
    </div>
  );
}
