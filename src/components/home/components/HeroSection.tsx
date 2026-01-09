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
import {
  CalendarIcon,
  Search,
  Users,
  ChevronDown,
  Sparkles,
} from "lucide-react";
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
    }

    navigate({
      to: "/accommodations",
      search: searchParams,
    });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden premium-bg-background">
      {/* Background Image with linear Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80&auto=format&fit=crop"
          alt="Luxury lodge in serene wilderness setting"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Darker overlay for better text contrast */}
        {/*<div className="absolute inset-0 bg-linear-to-b from-premium-primary/60 via-premium-primary/40 to-premium-primary/70 dark:from-premium-primary/80 dark:via-premium-primary/60 dark:to-premium-primary/90" />*/}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 dark:from-black/85 dark:via-black/70 dark:to-black/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 premium-container">
        <div className="max-w-3xl">
          {/* Premium Tagline */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-premium-accent" />
              <span className="premium-tagline text-premium-accent">
                Wilderness Luxury Redefined
              </span>
              <Sparkles className="h-4 w-4 text-premium-accent" />
            </div>
          </div>

          {/* Main Heading with Premium Typography */}
          <h1 className="premium-heading text-5xl md:text-6xl lg:text-7xl mb-6 text-premium-primary-foreground leading-tight dark:text-white">
            Discover Your
            <br />
            <span className="premium-heading-serif text-premium-accent">
              Sanctuary
            </span>
          </h1>

          {/* Subtitle - Fixed for contrast */}
          <p className="dark:premium-subtitle font-medium mb-12 max-w-2xl text-white/90">
            Immerse yourself in unparalleled luxury where pristine nature meets
            sophisticated comfort. Your exclusive retreat awaits.
          </p>

          {/* Search Bar  */}
          <div className="bg-white dark:bg-black/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
            <div className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Your Stay
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-14 px-4 group border-gray-300 dark:border-gray-600 hover:border-premium-accent dark:hover:border-premium-accent bg-white dark:bg-gray-800",
                        !dateRange && "text-gray-500 dark:text-gray-400",
                      )}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:premium-text-accent transition-colors" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <span className="text-gray-900 dark:text-gray-100">
                            {format(dateRange.from, "MMMM d")} -{" "}
                            {format(dateRange.to, "d, yyyy")}
                          </span>
                        ) : (
                          <span className="text-gray-900 dark:text-gray-100">
                            {format(dateRange.from, "MMMM d, yyyy")}
                          </span>
                        )
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          Select check-in & check-out dates
                        </span>
                      )}
                      <ChevronDown className="ml-auto h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:premium-text-accent transition-colors" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white dark:bg-gray-800 shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700"
                    align="start"
                  >
                    <Calendar
                      autoFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={(date) => date < new Date()}
                      className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
                      classNames={{
                        day_selected:
                          "bg-premium-accent text-white hover:bg-premium-accent hover:text-white",
                        day_today:
                          "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600",
                        day_disabled:
                          "text-gray-400 dark:text-gray-500 opacity-50",
                        day_range_start: "bg-premium-accent text-white",
                        day_range_end: "bg-premium-accent text-white",
                        day_outside:
                          "text-gray-400 dark:text-gray-500 opacity-50",
                        day_hidden: "invisible",
                        caption: "text-gray-900 dark:text-gray-100",
                        caption_label:
                          "text-gray-900 dark:text-gray-100 font-medium",
                        nav_button:
                          "text-gray-500 dark:text-gray-400 hover:text-premium-accent",
                        head_cell:
                          "text-gray-500 dark:text-gray-400 font-normal text-sm",
                        cell: "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700",
                        day: "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests and Search Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Guests
                  </Label>
                  <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:premium-text-accent transition-colors pointer-events-none" />
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="pl-12 h-14 text-base border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-gray-800"
                      placeholder="Number of guests"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSearch}
                  className="h-14 text-base font-semibold bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 group self-end"
                >
                  <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Explore Retreats
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate({ to: "/accommodations", search: {} })}
              className="border-2 border-white bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white hover:text-gray-900 dark:border-white dark:bg-white/10 dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
            >
              View All Accommodations
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate({ to: "/activities", search: {} })}
              className="border-2 border-white bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white hover:text-gray-900 dark:border-white dark:bg-white/10 dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
            >
              Discover Activities
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center">
          <span className="text-xs premium-tagline text-premium-accent mb-3">
            EXPLORE
          </span>
          <div className="w-px h-16 bg-linear-to-b from-premium-primary-foreground/40 via-premium-primary-foreground/20 to-transparent" />
        </div>
      </div>

      {/* Bottom linear Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-premium-background via-premium-background/50 to-transparent dark:from-premium-background dark:via-premium-background/80 dark:to-transparent" />
    </section>
  );
}
