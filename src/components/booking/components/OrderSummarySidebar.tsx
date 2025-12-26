import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export function OrderSummarySidebar() {
  const { items, getSubtotal, getTax, getTotal } = useCartStore();

  return (
    <div className="bg-background border rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 rounded overflow-hidden bg-muted shrink-0">
              {item.item?.images?.[0] ? (
                <img
                  src={
                    item.item.images[0].thumbnail_url || item.item.images[0].url
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
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.item?.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.check_in_date && item.check_out_date && (
                  <>
                    {new Date(item.check_in_date).toLocaleDateString()} -{" "}
                    {new Date(item.check_out_date).toLocaleDateString()}
                  </>
                )}
              </p>
              <p className="text-sm font-semibold mt-1">
                {formatPrice(item.total)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(getSubtotal())}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (18%)</span>
          <span>{formatPrice(getTax())}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>{formatPrice(getTotal())}</span>
        </div>
      </div>
    </div>
  );
}
