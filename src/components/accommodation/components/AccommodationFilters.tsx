import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { AccommodationFilters } from "@/types";
import { Button } from "@/components/ui/button";

interface AccommodationFiltersProps {
  filters: AccommodationFilters;
  onFilterChange: (filters: AccommodationFilters) => void;
}

export function AccommodationFilters({
  filters,
  onFilterChange,
}: AccommodationFiltersProps) {
  const handleReset = () => {
    onFilterChange({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search accommodations..."
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Price Range (UGX)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.min_price || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  min_price: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.max_price || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  max_price: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <Label htmlFor="guests">Minimum Guests</Label>
          <Input
            id="guests"
            type="number"
            min="1"
            placeholder="Number of guests"
            value={filters.min_guests || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                min_guests: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </div>
        {/* Reset Button */}
        <Button variant="outline" className="w-full" onClick={handleReset}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
