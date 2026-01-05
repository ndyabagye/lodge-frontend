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
    <Card className="premium-card bg-white dark:bg-black/60 border border-gray-200 dark:border-black/90">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label
            htmlFor="search"
            className="text-sm font-semibold text-gray-900 dark:text-gray-100"
          >
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search activities..."
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-gray-800"
          />
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Categories
          </Label>
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
          <Label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Price Range (ZMW)
          </Label>
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
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-gray-800"
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
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Duration (minutes)
          </Label>
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
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-gray-800"
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
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-premium-accent hover:text-premium-accent bg-white dark:bg-gray-800 font-semibold"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
