import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Users, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";
import type { Accommodation } from "@/types";
import type { DateRange } from "react-day-picker";

interface BookingWidgetProps {
  accommodation: Accommodation;
}

export function BookingWidget({ accommodation }: BookingWidgetProps) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);

  const totalGuests = numAdults + numChildren;
  const canIncrease = totalGuests < accommodation.max_guests;

  const handleIncrease = (type: "adults" | "children") => {
    if (!canIncrease) return;
    if (type === "adults") {
      setNumAdults((prev) => prev + 1);
    } else {
      setNumChildren((prev) => prev + 1);
    }
  };

  const handleDecrease = (type: "adults" | "children") => {
    if (type === "adults" && numAdults > 1) {
      setNumAdults((prev) => prev - 1);
    } else if (type === "children" && numChildren > 0) {
      setNumChildren((prev) => prev - 1);
    }
  };

  const calculateNights = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    const diffTime = dateRange.to.getTime() - dateRange.from.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    if (nights === 0) return 0;

    const basePrice = accommodation.base_price * nights;
    const cleaningFee = accommodation.cleaning_fee || 0;
    return basePrice + cleaningFee;
  };

  const nights = calculateNights();
  const subtotal = accommodation.base_price * nights;
  const total = calculateTotal();

  const handleAddToCart = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    addItem({
      id: `${accommodation.id}-${dateRange.from.toISOString()}`,
      type: "accommodation",
      item_id: accommodation.id,
      item: accommodation,
      check_in_date: format(dateRange.from, "yyyy-MM-dd"),
      check_out_date: format(dateRange.to, "yyyy-MM-dd"),
      quantity: 1,
      price: total,
      total: total,
    });

    toast.success("Added to cart!");
  };

  const handleBookNow = () => {
    handleAddToCart();
    navigate({ to: "/checkout" });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold">
              {formatPrice(accommodation.base_price)}
            </span>
            <span className="text-muted-foreground ml-2">/ night</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="space-y-2">
          <Label>Check-in & Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} -{" "}
                      {format(dateRange.to, "LLL dd, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, yyyy")
                  )
                ) : (
                  <span>Pick dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests Selection */}
        <div className="space-y-3">
          <Label>Guests</Label>

          {/* Adults */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Adults</p>
              <p className="text-sm text-muted-foreground">Ages 13+</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrease("adults")}
                disabled={numAdults <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{numAdults}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrease("adults")}
                disabled={!canIncrease}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Children</p>
              <p className="text-sm text-muted-foreground">Ages 2-12</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrease("children")}
                disabled={numChildren <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{numChildren}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrease("children")}
                disabled={!canIncrease}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Maximum {accommodation.max_guests} guests
          </p>
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span>
                {formatPrice(accommodation.base_price)} x {nights} night
                {nights !== 1 ? "s" : ""}
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {accommodation.cleaning_fee > 0 && (
              <div className="flex justify-between text-sm">
                <span>Cleaning fee</span>
                <span>{formatPrice(accommodation.cleaning_fee)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" size="lg" onClick={handleBookNow}>
          Book Now
        </Button>
        <Button variant="outline" className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
