import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAccommodationReviews } from "@/hooks/use-accommodations";
import { Loading } from "@/components/common/Loading";

interface AccommodationReviewsProps {
  accommodationId: string;
}

export function AccommodationReviews({
  accommodationId,
}: AccommodationReviewsProps) {
  const {
    data: reviews,
    isLoading,
    error,
  } = useAccommodationReviews(accommodationId);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">
          Error fetching reviews!
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews yet. Be the first to review this accommodation!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review: any) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>
                  {review.user_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.user_name}</h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-current text-yellow-500"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.created_at}
                </p>
                {review.title && (
                  <h5 className="font-medium">{review.title}</h5>
                )}
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
