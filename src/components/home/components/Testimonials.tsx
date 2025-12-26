import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Kampala, Uganda",
    rating: 5,
    comment:
      "Absolutely amazing experience! The accommodation was pristine and the staff were incredibly welcoming. Will definitely be coming back.",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Nairobi, Kenya",
    rating: 5,
    comment:
      "Perfect weekend getaway. The location is stunning and the amenities exceeded our expectations. Couldn't have asked for more!",
    initials: "MC",
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "Dar es Salaam, Tanzania",
    rating: 5,
    comment:
      "A hidden gem! The attention to detail and the personalized service made our stay truly memorable. Highly recommended.",
    initials: "EW",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Our Guests Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real experiences from real guests
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current text-yellow-500"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground italic">
                  "{testimonial.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
