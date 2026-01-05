import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Heart } from "lucide-react";
import type { Activity } from "@/types/activity";
import { cn, formatPrice } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(activity.id, "activity");

  const featuredImage =
    activity.images?.find((img) => img.is_featured) || activity.images?.[0];

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFav) {
      removeFavorite(activity.id, "activity");
    } else {
      addFavorite(activity.id, "activity");
    }
  };

  return (
    <Card className="premium-card bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group py-0">
      <Link to="/activities/$slug" params={{ slug: activity.slug }}>
        <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
          {featuredImage ? (
            <img
              src={featuredImage.url}
              alt={featuredImage.alt_text || activity.name}
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
                isFav
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600 dark:text-gray-400",
              )}
            />
          </button>

          {/* Category Badge */}
          {activity.category && (
            <Badge className="absolute top-3 left-3 bg-premium-accent/95 text-white border-0 backdrop-blur-sm shadow-lg">
              {activity.category}
            </Badge>
          )}

          {/* Featured Badge */}
          {activity.featured && (
            <Badge className="absolute bottom-3 right-3 bg-white text-gray-900 border-0 shadow-lg font-semibold">
              Featured
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            to="/activities/$slug"
            params={{ slug: activity.slug }}
            className="hover:underline flex-1"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-premium-accent transition-colors">
              {activity.name}
            </h3>
          </Link>
          {activity.status === "available" && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-0 text-xs font-medium">
              Available
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {activity.short_description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(activity.duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Up to {activity.max_participants}</span>
          </div>
          {activity.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span>{activity.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(activity.adult_price)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              / adult
            </span>
          </div>
          {activity.child_price &&
            activity.child_price !== activity.adult_price && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Children: {formatPrice(activity.child_price)}
              </p>
            )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link
          to="/activities/$slug"
          params={{ slug: activity.slug }}
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
