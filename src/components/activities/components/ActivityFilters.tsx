import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ActivityFilters } from "@/types/activity";

interface ActivityFiltersProps {
  filters: ActivityFilters;
  onFilterChange: (filters: ActivityFilters) => void;
}

const categories = [
  "Adventure",
  "Relaxation",
  "Water Sports",
  "Cultural",
  "Wildlife",
  "Wellness",
];

export function ActivityFilters({
  filters,
  onFilterChange,
}: ActivityFiltersProps) {
  const handleReset = () => {
    onFilterChange({});
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategory = filters.category;
    onFilterChange({
      ...filters,
      category: currentCategory === category ? undefined : category,
    });
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
            placeholder="Search activities..."
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
          />
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <Label>Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.category === category}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label
                  htmlFor={category}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
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

        {/* Duration */}
        <div className="space-y-2">
          <Label>Duration (minutes)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.min_duration || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  min_duration: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.max_duration || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  max_duration: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
        </div>

        {/* Reset Button */}
        <Button variant="outline" className="w-full" onClick={handleReset}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
