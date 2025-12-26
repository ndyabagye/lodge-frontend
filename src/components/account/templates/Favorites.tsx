import { AccountLayout } from "../components/AccountLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useAccommodations } from "@/hooks/use-accommodations";
import { AccommodationCard } from "@/components/accommodation/components/AccommodationCard";
import { Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Loading } from "@/components/common/Loading";

export function FavoritesTemplate() {
  const { favorites } = useFavoritesStore();
  const { data, isLoading } = useAccommodations({
    // In production, you'd fetch only favorite accommodations
    per_page: 100,
  });

  // Filter accommodations to show only favorites
  const favoriteAccommodations = data?.data?.filter((acc) =>
    favorites.includes(acc.id),
  );

  if (isLoading) return <Loading />;

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-muted-foreground">
            Accommodations you've saved for later
          </p>
        </div>

        {favoriteAccommodations && favoriteAccommodations.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {favoriteAccommodations.map((accommodation) => (
              <AccommodationCard
                key={accommodation.id}
                accommodation={accommodation}
              />
            ))}
          </div>
        ) : (
          <Card className="border-border bg-card">
            <CardContent className="py-16 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-6">
                Start exploring and save your favorite accommodations
              </p>
              <Link to="/accommodations" search={{}}>
                <Button size="lg">Browse Accommodations</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </AccountLayout>
  );
}
