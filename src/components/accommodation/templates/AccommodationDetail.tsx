import { Loading } from "@/components/common/Loading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAccommodationBySlug } from "@/hooks/use-accommodations";

import { ImageGallery } from "../components/ImageGallery";
import { AccommodationInfo } from "../components/AccommodationInfo";
import { AmenitiesList } from "../components/AmenitiesList";
import { AccommodationReviews } from "../components/AccommodationReviews";
import { BookingWidget } from "../components/BookingWidget";
import { RelatedAccommodations } from "../components/RelatedAccommodations";

interface AccommodationDetailTemplateProps {
  slug: string;
}

export function AccommodationDetailTemplate({
  slug,
}: AccommodationDetailTemplateProps) {
  const {
    data: accommodation,
    isLoading,
    error,
  } = useAccommodationBySlug(slug);

  if (isLoading) return <Loading />;

  if (error || !accommodation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">
          Accommodation not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/*image gallery*/}
      <ImageGallery images={accommodation.images} name={accommodation.name} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <AccommodationInfo accommodation={accommodation} />

            <Separator />

            {/* Tabs for Description, Amenities, Reviews */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {accommodation.description}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <AmenitiesList amenities={accommodation.amenities} />
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <AccommodationReviews accommodationId={accommodation.id} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Widget - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <BookingWidget accommodation={accommodation} />
            </div>
          </div>
        </div>

        {/* Related Accommodations */}
        <div className="mt-16">
          <RelatedAccommodations
            currentId={accommodation.id}
            type={accommodation.type}
          />
        </div>
      </div>
    </div>
  );
}
