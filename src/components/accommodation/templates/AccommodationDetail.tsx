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
      <div className="premium-container py-12">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600 dark:text-red-400">
            Accommodation not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen premium-bg-background">
      {/*image gallery*/}
      <ImageGallery images={accommodation.images} name={accommodation.name} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <AccommodationInfo accommodation={accommodation} />

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Tabs for Description, Amenities, Reviews */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <TabsTrigger
                  value="description"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-600 dark:text-gray-400 font-semibold"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="amenities"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-600 dark:text-gray-400 font-semibold"
                >
                  Amenities
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-600 dark:text-gray-400 font-semibold"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
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
