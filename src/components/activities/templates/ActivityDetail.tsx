import { useActivityBySlug } from "@/hooks/use-activities";
import { Loading } from "@/components/common/Loading";
import { ImageGallery } from "@/components/accommodation/components/ImageGallery";
import { ActivityInfo } from "../components/ActivityInfo";
import { ActivityBookingWidget } from "../components/ActivityBookingWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, AlertCircle } from "lucide-react";

interface ActivityDetailTemplateProps {
  slug: string;
}

export function ActivityDetailTemplate({ slug }: ActivityDetailTemplateProps) {
  const { data: activity, isLoading, error } = useActivityBySlug(slug);

  if (isLoading) return <Loading />;

  if (error || !activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">Activity not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Image Gallery */}
      <ImageGallery images={activity.images} name={activity.name} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <ActivityInfo activity={activity} />

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="included">What's Included</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="included" className="mt-6">
                <div className="grid gap-4">
                  {activity.included && (
                    <Card className="border-border bg-card">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          What's Included
                        </h3>
                        <ul className="space-y-2 text-sm">
                          {activity.included.split("\n").map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {activity.excluded && (
                    <Card className="border-border bg-card">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <X className="h-5 w-5 text-red-500" />
                          What's Not Included
                        </h3>
                        <ul className="space-y-2 text-sm">
                          {activity.excluded.split("\n").map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    {activity.requirements ? (
                      <div className="prose max-w-none">
                        <p className="text-muted-foreground">
                          {activity.requirements}
                        </p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        No special requirements for this activity.
                      </p>
                    )}

                    {(activity.min_age || activity.max_age) && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold mb-2">Age Requirements</h4>
                        <p className="text-sm text-muted-foreground">
                          {activity.min_age &&
                            `Minimum age: ${activity.min_age} years`}
                          {activity.min_age && activity.max_age && " · "}
                          {activity.max_age &&
                            `Maximum age: ${activity.max_age} years`}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="safety" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">
                          Safety Information
                        </h3>
                        {activity.safety_info ? (
                          <p className="text-sm text-muted-foreground">
                            {activity.safety_info}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            All safety equipment and instructions will be
                            provided by our trained staff.
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Widget - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <ActivityBookingWidget activity={activity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
