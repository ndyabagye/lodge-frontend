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
    // <Card className="premium-card overflow-hidden group hover:premium-card-hover transition-shadow">
    <Card className="premium-card bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      <Link to="/accommodations/$slug" params={{ slug: accommodation.slug }}>
        <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
          {featuredImage ? (
            <img
              src={featuredImage.url}
              alt={featuredImage.alt_text || accommodation.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              "absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all",
              "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm",
              "hover:bg-white dark:hover:bg-gray-800 hover:scale-110",
              "border border-gray-200 dark:border-gray-700 shadow-lg",
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600 dark:text-gray-400",
              )}
            />
          </button>
        </div>
      </Link>

      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            to="/accommodations/$slug"
            params={{ slug: accommodation.slug }}
            className="hover:underline flex-1"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-premium-accent transition-colors">
              {accommodation.name}
            </h3>
          </Link>
          {accommodation.featured && (
            <Badge className="bg-premium-accent text-white border-0 shrink-0">
              Featured
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {accommodation.short_description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatPrice(accommodation.base_price)}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            / night
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link
          to="/accommodations/$slug"
          params={{ slug: accommodation.slug }}
          className="w-full"
        >
          <Button className="w-full text-base font-semibold bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all duration-300">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
