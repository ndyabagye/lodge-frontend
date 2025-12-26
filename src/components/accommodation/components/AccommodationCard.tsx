import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BedDouble, Star, Heart } from "lucide-react";
import type { Accommodation } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(accommodation.id);

  const featuredImage =
    accommodation.images?.find((img) => img.is_featured) ||
    accommodation.images?.[0];

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite(accommodation.id);
    } else {
      addFavorite(accommodation.id);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to="/accommodations/$slug" params={{ slug: accommodation.slug }}>
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          {featuredImage ? (
            <img
              src={featuredImage.url}
              alt={featuredImage.alt_text || accommodation.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              "absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all",
              "bg-white/90 dark:bg-black/50 backdrop-blur-sm",
              "hover:bg-white dark:hover:bg-black/70 hover:scale-110",
              "border border-border",
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground",
              )}
            />
          </button>
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link
            to="/accommodations/$slug"
            params={{ slug: accommodation.slug }}
            className="hover:underline"
          >
            <h3 className="font-semibold text-lg line-clamp-1">
              {accommodation.name}
            </h3>
          </Link>
          {accommodation.featured && (
            <Badge variant="secondary" className="ml-2">
              Featured
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {accommodation.short_description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{accommodation.max_guests} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            <span>{accommodation.num_bedrooms} beds</span>
          </div>
          {accommodation.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span>{accommodation.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            {formatPrice(accommodation.base_price)}
          </span>
          <span className="text-sm text-muted-foreground">/ night</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link
          to="/accommodations/$slug"
          params={{ slug: accommodation.slug }}
          className="w-full"
        >
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
