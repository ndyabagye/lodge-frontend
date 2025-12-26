import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, AlertCircle } from "lucide-react";
import type { Activity } from "@/types/activity";
import { formatPrice } from "@/lib/utils";

interface ActivityInfoProps {
  activity: Activity;
}

export function ActivityInfo({ activity }: ActivityInfoProps) {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0
      ? `${hours} hour${hours > 1 ? "s" : ""} ${mins} minutes`
      : `${hours} hour${hours > 1 ? "s" : ""}`;
  };

  return (
    <div className="space-y-4">
      {/* Title and Category */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{activity.category}</Badge>
          {activity.featured && <Badge>Featured</Badge>}
          {activity.status === "coming_soon" && (
            <Badge variant="outline">Coming Soon</Badge>
          )}
          {activity.status === "unavailable" && (
            <Badge variant="destructive">Unavailable</Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold">{activity.name}</h1>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>{formatDuration(activity.duration)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span>Up to {activity.max_participants} participants</span>
        </div>
        {activity.rating > 0 && (
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-current text-yellow-500" />
            <span>
              {activity.rating.toFixed(1)} ({activity.bookings} bookings)
            </span>
          </div>
        )}
      </div>

      {/* Short Description */}
      <p className="text-lg text-muted-foreground">
        {activity.short_description}
      </p>

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            {formatPrice(activity.price)}
          </span>
          <span className="text-base font-normal text-muted-foreground">
            / person
          </span>
        </div>

        {/* Additional Pricing */}
        <div className="flex flex-wrap gap-4 text-sm">
          {activity.adult_price && activity.adult_price !== activity.price && (
            <div>
              <span className="text-muted-foreground">Adults: </span>
              <span className="font-medium">
                {formatPrice(activity.adult_price)}
              </span>
            </div>
          )}
          {activity.child_price && (
            <div>
              <span className="text-muted-foreground">Children: </span>
              <span className="font-medium">
                {formatPrice(activity.child_price)}
              </span>
            </div>
          )}
          {activity.group_price && (
            <div>
              <span className="text-muted-foreground">Group rate: </span>
              <span className="font-medium">
                {formatPrice(activity.group_price)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Age Restrictions */}
      {(activity.min_age || activity.max_age) && (
        <div className="flex items-start gap-2 p-3 bg-muted rounded-lg border border-border">
          <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium mb-1">Age Requirements</p>
            <p className="text-muted-foreground">
              {activity.min_age && `Minimum ${activity.min_age} years`}
              {activity.min_age && activity.max_age && " · "}
              {activity.max_age && `Maximum ${activity.max_age} years`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
