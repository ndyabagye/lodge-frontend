import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarIcon, Search, Users } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export function HeroSection() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    const searchParams: Record<string, string> = {};

    if (dateRange?.from) {
      searchParams.check_in = format(dateRange.from, "yyyy-MM-dd");
    }
    if (dateRange?.to) {
      searchParams.check_out = format(dateRange.to, "yyyy-MM-dd");
    }
    if (guests) {
      searchParams.guests = guests;

      navigate({
        to: "/accommodations",
        search: searchParams,
      });
    }
  };

  return (
    <section className="relative h-150 lg:h-175 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Luxury Lodge"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-600 text-white/95">
          Your Perfect Getaway Awaits
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/95 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-600 delay-150">
          Experience luxury and comfort in the heart of nature
        </p>

        {/* Search Bar */}
        {/*<div className="max-w-4xl mx-auto bg-white dark:bg-secondary text-foreground rounded-lg shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-600 delay-300">*/}
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="grid md:grid-cols-[1fr_1fr_auto_auto] gap-4 items-end">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label className="text-sm text-foreground font-medium block text-left">
                Check-in & Check-out
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-10",
                      !dateRange && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd")} -{" "}
                          {format(dateRange.to, "LLL dd")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, yyyy")
                      )
                    ) : (
                      <span>Select dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    autoFocus
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

            {/* Guests */}
            <div className="space-y-2">
              <Label className="text-sm text-foreground font-medium block text-left">
                Guests
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="pl-10 h-10 ring ring-accent text-foreground"
                  placeholder="Number of guests"
                />
              </div>
            </div>

            {/* Search Button */}
            <Button
              size="default"
              className="h-10 md:col-span-2"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-600 delay-500">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate({ to: "/accommodations", search: {} })}
          >
            Browse Accommodations
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white text-white hover:bg-white/20"
            onClick={() => navigate({ to: "/activities", search: {} })}
          >
            Explore Activities
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
