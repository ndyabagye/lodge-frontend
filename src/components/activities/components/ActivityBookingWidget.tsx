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
import { Calendar as CalendarIcon, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";
import type { Activity } from "@/types/activity";

interface ActivityBookingWidgetProps {
  activity: Activity;
}

export function ActivityBookingWidget({
  activity,
}: ActivityBookingWidgetProps) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);

  const totalParticipants = numAdults + numChildren;
  const canIncrease = totalParticipants < activity.max_participants;

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

  const calculateTotal = () => {
    const adultPrice = activity.adult_price || activity.price;
    const childPrice = activity.child_price || activity.price;
    return numAdults * adultPrice + numChildren * childPrice;
  };

  const total = calculateTotal();

  // Generate available time slots (example)
  const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  const handleAddToCart = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }

    addItem({
      id: `${activity.id}-${selectedDate.toISOString()}-${selectedTime}`,
      type: "activity",
      item_id: activity.id,
      item: activity,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      quantity: totalParticipants,
      price: total / totalParticipants,
      total: total,
    });

    toast.success("Added to cart!");
  };

  const handleBookNow = () => {
    handleAddToCart();
    navigate({ to: "/checkout" });
  };

  const isAvailable = activity.status === "available";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold">
              {formatPrice(activity.price)}
            </span>
            <span className="text-muted-foreground ml-2">/ person</span>
          </div>
        </div>
        {activity.child_price && activity.child_price !== activity.price && (
          <p className="text-sm text-muted-foreground mt-1">
            Children: {formatPrice(activity.child_price)}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {!isAvailable && (
          <div className="bg-destructive/10 dark:bg-destructive/20 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
            This activity is currently unavailable
          </div>
        )}

        {/* Date Selection */}
        <div className="space-y-2">
          <Label>Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                )}
                disabled={!isAvailable}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div className="space-y-2">
            <Label>Select Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Participants Selection */}
        <div className="space-y-3">
          <Label>Participants</Label>

          {/* Adults */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Adults</p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(activity.adult_price || activity.price)} each
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrease("adults")}
                disabled={numAdults <= 1 || !isAvailable}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{numAdults}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrease("adults")}
                disabled={!canIncrease || !isAvailable}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Children */}
          {activity.child_price && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Children</p>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(activity.child_price)} each
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrease("children")}
                  disabled={numChildren <= 0 || !isAvailable}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">
                  {numChildren}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleIncrease("children")}
                  disabled={!canIncrease || !isAvailable}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Maximum {activity.max_participants} participants
          </p>
        </div>

        {/* Price Breakdown */}
        {(numAdults > 0 || numChildren > 0) && (
          <div className="space-y-2 pt-4 border-t">
            {numAdults > 0 && (
              <div className="flex justify-between text-sm">
                <span>Adults ({numAdults})</span>
                <span>
                  {formatPrice(
                    numAdults * (activity.adult_price || activity.price),
                  )}
                </span>
              </div>
            )}
            {numChildren > 0 && activity.child_price && (
              <div className="flex justify-between text-sm">
                <span>Children ({numChildren})</span>
                <span>{formatPrice(numChildren * activity.child_price)}</span>
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
        <Button
          className="w-full"
          size="lg"
          onClick={handleBookNow}
          disabled={!isAvailable || !selectedDate || !selectedTime}
        >
          Book Now
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddToCart}
          disabled={!isAvailable || !selectedDate || !selectedTime}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
