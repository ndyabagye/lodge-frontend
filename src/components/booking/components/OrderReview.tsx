import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { Calendar, Users, Mail, Phone } from "lucide-react";
import { format } from "date-fns";

interface OrderReviewProps {
  guestInfo: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    special_requests?: string;
  };
  onConfirm: () => void;
  onBack: () => void;
}

export function OrderReview({
  guestInfo,
  onConfirm,
  onBack,
}: OrderReviewProps) {
  const { items, getSubtotal, getTax, getTotal } = useCartStore();

  return (
    <div className="space-y-6">
      {/* Guest Information */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-semibold">
              {guestInfo.first_name} {guestInfo.last_name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{guestInfo.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{guestInfo.phone}</span>
          </div>
          {guestInfo.special_requests && (
            <div className="pt-2 border-t">
              <p className="text-sm font-medium mb-1">Special Requests:</p>
              <p className="text-sm text-muted-foreground">
                {guestInfo.special_requests}
              </p>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={onBack} className="mt-2">
            Edit Information
          </Button>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                {item.item?.images?.[0] ? (
                  <img
                    src={
                      item.item.images[0].thumbnail_url ||
                      item.item.images[0].url
                    }
                    alt={item.item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold mb-2">{item.item?.name}</h3>

                {item.type === "accommodation" && (
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {item.check_in_date && item.check_out_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {format(new Date(item.check_in_date), "MMM dd")} -{" "}
                          {format(
                            new Date(item.check_out_date),
                            "MMM dd, yyyy",
                          )}
                        </span>
                      </div>
                    )}
                    {item.item?.max_guests && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Up to {item.item.max_guests} guests</span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-lg font-bold mt-2">
                  {formatPrice(item.total)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(getSubtotal())}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18%)</span>
            <span>{formatPrice(getTax())}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>{formatPrice(getTotal())}</span>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onConfirm} size="lg" className="flex-1">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}
