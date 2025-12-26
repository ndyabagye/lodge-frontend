import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import type { Activity } from "@/types/activity";
import { formatPrice } from "@/lib/utils";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const featuredImage =
    activity.images?.find((img) => img.order === 0) || activity.images?.[0];

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to="/activities/$slug" params={{ slug: activity.slug }}>
        <div className="aspect-4/3 overflow-hidden bg-muted relative">
          {featuredImage ? (
            <img
              src={featuredImage.url}
              alt={featuredImage.alt_text || activity.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          {activity.featured && (
            <Badge className="absolute top-4 left-4">Featured</Badge>
          )}
          <Badge variant="secondary" className="absolute top-4 right-4">
            {activity.category}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link
          to="/activities/$slug"
          params={{ slug: activity.slug }}
          className="hover:underline"
        >
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {activity.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {activity.short_description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            {formatPrice(activity.price)}
          </span>
          <span className="text-sm text-muted-foreground">/ person</span>
        </div>
        {activity.child_price && activity.child_price !== activity.price && (
          <p className="text-xs text-muted-foreground mt-1">
            Children: {formatPrice(activity.child_price)}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link
          to="/activities/$slug"
          params={{ slug: activity.slug }}
          className="w-full"
        >
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
