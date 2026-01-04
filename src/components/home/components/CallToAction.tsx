import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="premium-section bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="premium-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="premium-heading text-3xl lg:text-4xl mb-4 text-white">
            Ready for Your Next{" "}
            <span className="premium-heading-serif text-premium-accent">
              Adventure?
            </span>
          </h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Book your perfect accommodation today and create unforgettable
            memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/accommodations" search={{}}>
              <Button
                size="lg"
                className="min-w-[200px] bg-white text-gray-900 hover:bg-gray-100 font-semibold group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Browse Accommodations
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                className="min-w-[200px] border-2 border-white bg-transparent text-white hover:bg-white hover:text-gray-900 font-semibold transition-all duration-300"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
