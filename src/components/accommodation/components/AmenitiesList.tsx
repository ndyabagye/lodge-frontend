import { Check } from "lucide-react";
import type { Amenity } from "@/types";

interface AmenitiesListProps {
  amenities: Amenity[];
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) {
    return (
      <p className="text-muted-foreground">
        No amenities information available
      </p>
    );
  }

  // Group amenities by category
  const groupedAmenities = amenities.reduce(
    (acc, amenity) => {
      const category = amenity.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(amenity);
      return acc;
    },
    {} as Record<string, Amenity[]>,
  );

  return (
    <div className="space-y-6">
      {Object.entries(groupedAmenities).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-3">{category}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {items.map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
