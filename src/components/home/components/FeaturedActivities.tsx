import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Mock data - will be replaced with actual API call
const activities = [
  {
    id: "1",
    name: "Guided Nature Walk",
    slug: "guided-nature-walk",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    duration: 120,
    price: 50000,
    category: "Adventure",
  },
  {
    id: "2",
    name: "Boat Safari",
    slug: "boat-safari",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    duration: 180,
    price: 80000,
    category: "Adventure",
  },
  {
    id: "3",
    name: "Spa & Wellness",
    slug: "spa-wellness",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    duration: 90,
    price: 120000,
    category: "Relaxation",
  },
];

export function FeaturedActivities() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Popular Activities
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enhance your stay with exciting activities and experiences
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-16/10 overflow-hidden bg-muted relative">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4">
                  {activity.category}
                </Badge>
              </div>
              <CardContent className="">
                <h3 className="font-semibold text-lg">{activity.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{activity.duration} mins</span>
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {formatPrice(activity.price)}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link
                  to="/activities/$slug"
                  params={{ slug: activity.slug }}
                  className="w-full"
                >
                  <Button className="w-full" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/activities" search={{}}>
            <Button size="lg">
              View All Activities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
