import { Badge } from "@/components/ui/badge";
import { Users, BedDouble, Bath, Maximize, Star, Heart } from "lucide-react";
import type { Accommodation } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface AccommodationInfoProps {
  accommodation: Accommodation;
}

export function AccommodationInfo({ accommodation }: AccommodationInfoProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(accommodation.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(accommodation.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite(accommodation.id);
      toast.success("Added to favorites");
    }
  };

  return (
    <div className="space-y-4">
      {/* Title and Type */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{accommodation.type}</Badge>
            {accommodation.featured && <Badge>Featured</Badge>}
          </div>

          {/* Favorite Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleFavorite}
            className="gap-2"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isFavorite && "fill-red-500 text-red-500",
              )}
            />
            {isFavorite ? "Saved" : "Save"}
          </Button>
        </div>
        <h1 className="text-3xl font-bold">{accommodation.name}</h1>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span>{accommodation.max_guests} guests</span>
        </div>
        <div className="flex items-center gap-2">
          <BedDouble className="h-5 w-5" />
          <span>
            {accommodation.num_bedrooms} bedroom
            {accommodation.num_bedrooms !== 1 ? "s" : ""} ·{" "}
            {accommodation.num_beds} bed
            {accommodation.num_beds !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="h-5 w-5" />
          <span>
            {accommodation.num_bathrooms} bathroom
            {accommodation.num_bathrooms !== 1 ? "s" : ""}
          </span>
        </div>
        {accommodation.size_sqft > 0 && (
          <div className="flex items-center gap-2">
            <Maximize className="h-5 w-5" />
            <span>{accommodation.size_sqft} sq ft</span>
          </div>
        )}
        {accommodation.rating > 0 && (
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-current text-yellow-500" />
            <span>{accommodation.rating.toFixed(1)} rating</span>
          </div>
        )}
      </div>

      {/* Short Description */}
      <p className="text-lg text-muted-foreground">
        {accommodation.short_description}
      </p>

      {/* Pricing */}
      <div className="flex items-baseline gap-2 text-3xl font-bold">
        <span>{formatPrice(accommodation.base_price)}</span>
        <span className="text-base font-normal text-muted-foreground">
          / night
        </span>
      </div>
      {accommodation.weekend_price &&
        accommodation.weekend_price !== accommodation.base_price && (
          <p className="text-sm text-muted-foreground">
            Weekend rate: {formatPrice(accommodation.weekend_price)} / night
          </p>
        )}
    </div>
  );
}
