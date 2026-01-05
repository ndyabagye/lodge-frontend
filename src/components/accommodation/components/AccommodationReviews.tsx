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
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 font-semibold">
          Error fetching reviews!
        </p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">
          No reviews yet. Be the first to review this accommodation!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review: any) => (
        <Card
          key={review.id}
          className="premium-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-premium-accent text-white font-semibold text-lg">
                  {review.user_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {review.user_name}
                  </h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-current text-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {review.created_at}
                </p>
                {review.title && (
                  <h5 className="font-medium text-gray-900 dark:text-gray-100">
                    {review.title}
                  </h5>
                )}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
