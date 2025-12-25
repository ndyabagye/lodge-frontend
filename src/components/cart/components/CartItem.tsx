import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Calendar, Users } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem } = useCartStore();

  const featuredImage =
    item.item?.images?.find((img: any) => img.is_featured) ||
    item.item?.images?.[0];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Image */}
          <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            {featuredImage ? (
              <img
                src={featuredImage.thumbnail_url || featuredImage.url}
                alt={item.item?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No image</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg">{item.item?.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {item.type}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Accommodation Details */}
            {item.type === "accommodation" &&
              item.check_in_date &&
              item.check_out_date && (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(item.check_in_date), "MMM dd")} -{" "}
                      {format(new Date(item.check_out_date), "MMM dd, yyyy")}
                    </span>
                  </div>
                  {item.item?.max_guests && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Up to {item.item.max_guests} guests</span>
                    </div>
                  )}
                </div>
              )}

            {/* Activity Details */}
            {item.type === "activity" && item.date && (
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(item.date), "MMM dd, yyyy")}
                    {item.time && ` at ${item.time}`}
                  </span>
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mt-4">
              <span className="text-2xl font-bold">
                {formatPrice(item.total)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
