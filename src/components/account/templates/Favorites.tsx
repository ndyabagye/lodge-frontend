// src/routes/_guest/favorites.tsx or wherever your template is
import { useState } from "react";
import { AccountLayout } from "../components/AccountLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useAccommodations } from "@/hooks/use-accommodations";
import { useActivities } from "@/hooks/use-activities";
import { AccommodationCard } from "@/components/accommodation/components/AccommodationCard";
import { ActivityCard } from "@/components/activities/components/ActivityCard";
import { Heart, Home, Activity, Filter } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Loading } from "@/components/common/Loading";
import { cn } from "@/lib/utils";

export function FavoritesTemplate() {
  const [activeTab, setActiveTab] = useState<"accommodations" | "activities">(
    "accommodations",
  );
  const [sortBy, setSortBy] = useState<"recent" | "name">("recent");

  const { favorites, getFavoritesByType } = useFavoritesStore();

  // Fetch all accommodations and activities
  const { data: accommodationsData, isLoading: isLoadingAccommodations } =
    useAccommodations({
      per_page: 100,
    });

  const { data: activitiesData, isLoading: isLoadingActivities } =
    useActivities({
      per_page: 100,
    });

  // Get favorite IDs by type
  const accommodationFavorites = getFavoritesByType("accommodation");
  const activityFavorites = getFavoritesByType("activity");

  // Filter and sort accommodations
  const favoriteAccommodations =
    accommodationsData?.data
      ?.filter((acc) => accommodationFavorites.some((fav) => fav.id === acc.id))
      .sort((a, b) => {
        if (sortBy === "recent") {
          const aDate =
            accommodationFavorites.find((f) => f.id === a.id)?.addedAt ||
            new Date(0);
          const bDate =
            accommodationFavorites.find((f) => f.id === b.id)?.addedAt ||
            new Date(0);
          return bDate.getTime() - aDate.getTime();
        }
        return a.name.localeCompare(b.name);
      }) || [];

  // Filter and sort activities
  const favoriteActivities =
    activitiesData?.data
      ?.filter((act) => activityFavorites.some((fav) => fav.id === act.id))
      .sort((a, b) => {
        if (sortBy === "recent") {
          const aDate =
            activityFavorites.find((f) => f.id === a.id)?.addedAt ||
            new Date(0);
          const bDate =
            activityFavorites.find((f) => f.id === b.id)?.addedAt ||
            new Date(0);
          return bDate.getTime() - aDate.getTime();
        }
        return a.name.localeCompare(b.name);
      }) || [];

  const isLoading = isLoadingAccommodations || isLoadingActivities;

  if (isLoading) {
    return (
      <AccountLayout>
        <Loading />
      </AccountLayout>
    );
  }

  const totalFavorites = favorites.length;
  const totalAccommodations = accommodationFavorites.length;
  const totalActivities = activityFavorites.length;

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
            <p className="text-muted-foreground">
              {totalFavorites} saved item{totalFavorites !== 1 ? "s" : ""}
              {totalAccommodations > 0 &&
                ` • ${totalAccommodations} accommodation${totalAccommodations !== 1 ? "s" : ""}`}
              {totalActivities > 0 &&
                ` • ${totalActivities} activity${totalActivities !== 1 ? "ies" : ""}`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recent" | "name")}
                className="text-sm bg-transparent border-none focus:outline-none text-muted-foreground"
              >
                <option value="recent">Recently added</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="bg-muted p-1 w-full md:w-auto">
            <TabsTrigger
              value="accommodations"
              className="flex items-center gap-2 data-[state=active]:bg-background"
            >
              <Home className="h-4 w-4" />
              Accommodations
              {totalAccommodations > 0 && (
                <span
                  className={cn(
                    "ml-1 px-1.5 py-0.5 text-xs rounded-full",
                    activeTab === "accommodations"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground",
                  )}
                >
                  {totalAccommodations}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="flex items-center gap-2 data-[state=active]:bg-background"
            >
              <Activity className="h-4 w-4" />
              Activities
              {totalActivities > 0 && (
                <span
                  className={cn(
                    "ml-1 px-1.5 py-0.5 text-xs rounded-full",
                    activeTab === "activities"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground",
                  )}
                >
                  {totalActivities}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Accommodations Tab */}
          <TabsContent value="accommodations" className="mt-6">
            {totalAccommodations > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteAccommodations.map((accommodation) => {
                  const favoriteInfo = accommodationFavorites.find(
                    (f) => f.id === accommodation.id,
                  );
                  return (
                    <div key={accommodation.id} className="relative group">
                      <AccommodationCard accommodation={accommodation} />
                      {favoriteInfo && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2 py-1 text-xs bg-background/90 backdrop-blur-sm rounded-md text-muted-foreground">
                            Added {formatRelativeTime(favoriteInfo.addedAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                type="accommodations"
                icon={<Home className="h-12 w-12" />}
              />
            )}
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="mt-6">
            {totalActivities > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteActivities.map((activity) => {
                  const favoriteInfo = activityFavorites.find(
                    (f) => f.id === activity.id,
                  );
                  return (
                    <div key={activity.id} className="relative group">
                      <ActivityCard activity={activity} />
                      {favoriteInfo && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2 py-1 text-xs bg-background/90 backdrop-blur-sm rounded-md text-muted-foreground">
                            Added {formatRelativeTime(favoriteInfo.addedAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                type="activities"
                icon={<Activity className="h-12 w-12" />}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AccountLayout>
  );
}

// Empty state component
function EmptyState({ type, icon }: { type: string; icon: React.ReactNode }) {
  const browseLink =
    type === "accommodations" ? "/accommodations" : "/activities";
  const browseText =
    type === "accommodations" ? "Browse Accommodations" : "Browse Activities";

  return (
    <Card className="border-border bg-card">
      <CardContent className="py-16 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">No favorite {type} yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Start exploring and save your favorite {type} by clicking the heart
          icon
        </p>
        <Link to={browseLink} search={{}}>
          <Button size="lg" className="gap-2">
            <Heart className="h-4 w-4" />
            {browseText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;

  // For older dates, show the actual date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
