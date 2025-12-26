import { Shield, Star, MapPin, Headphones } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Premium Quality",
    description:
      "Handpicked accommodations that meet our high standards of comfort and luxury",
  },
  {
    icon: MapPin,
    title: "Best Locations",
    description:
      "Situated in the most scenic and accessible locations for your convenience",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Safe and secure payment processing with instant confirmation",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to assist you with any queries",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to providing you with an unforgettable experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
