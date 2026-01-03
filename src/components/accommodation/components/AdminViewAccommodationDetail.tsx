import { useNavigate, useParams, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  MapPin,
  Users,
  Bed,
  Bath,
  Home,
  Clock,
  DollarSign,
  Star,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccommodation } from "@/hooks/use-accommodations";
import { Loading } from "@/components/common/Loading";
import { formatPrice } from "@/lib/utils";

export function AdminViewAccommodationDetail() {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });

  const { data: accommodation, isLoading } = useAccommodation(id as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loading />
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <p className="text-lg text-muted-foreground">Accommodation not found</p>
        <Button onClick={() => navigate({ to: "/admin/accommodations" })}>
          Back to Accommodations
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: "/admin/accommodations" })}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{accommodation.name}</h1>
              <Badge
                variant={
                  accommodation.status === "available"
                    ? "default"
                    : accommodation.status === "maintenance"
                      ? "destructive"
                      : "secondary"
                }
                className="capitalize"
              >
                {accommodation.status}
              </Badge>
              {accommodation.featured && (
                <Badge variant="outline" className="gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              {accommodation.type} • Created{" "}
              {new Date(accommodation.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to="/accommodations/$slug"
            params={{ slug: accommodation.slug }}
            target="_blank"
          >
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View Public Page
            </Button>
          </Link>
          <Button
            onClick={() =>
              navigate({
                to: "/admin/accommodations/edit/$id",
                params: { id: accommodation.id },
              })
            }
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="images">
            Images ({accommodation.images?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Rules</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {accommodation.max_guests}
                    </p>
                    <p className="text-sm text-muted-foreground">Max Guests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Bed className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {accommodation.num_bedrooms}
                    </p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Bath className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {accommodation.num_bathrooms}
                    </p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {accommodation.rating.toFixed(1)}
                    </p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Short Description
                </p>
                <p className="text-base">{accommodation.short_description}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Full Description
                </p>
                <p className="text-base whitespace-pre-wrap">
                  {accommodation.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem
                  icon={Home}
                  label="Type"
                  value={accommodation.type}
                />
                <DetailItem
                  icon={Bed}
                  label="Beds"
                  value={accommodation.num_beds}
                />
                {accommodation.size_sqft && (
                  <DetailItem
                    icon={MapPin}
                    label="Size"
                    value={`${accommodation.size_sqft} sq ft`}
                  />
                )}
                <DetailItem
                  icon={Calendar}
                  label="Min Stay"
                  value={`${accommodation.minimum_stay} nights`}
                />
                {accommodation.maximum_stay && (
                  <DetailItem
                    icon={Calendar}
                    label="Max Stay"
                    value={`${accommodation.maximum_stay} nights`}
                  />
                )}
                <DetailItem
                  icon={Clock}
                  label="Check-in"
                  value={accommodation?.check_in_time}
                />
                <DetailItem
                  icon={Clock}
                  label="Check-out"
                  value={accommodation?.check_out_time}
                />
                <DetailItem
                  icon={Users}
                  label="Total Bookings"
                  value={accommodation.bookings || 0}
                />
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-mono">{accommodation.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slug:</span>
                  <span className="font-mono">{accommodation.slug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>
                    {new Date(accommodation.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>
                    {new Date(accommodation.updated_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views:</span>
                  <span>{accommodation.views || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>
                {accommodation.images?.length || 0} images uploaded
              </CardDescription>
            </CardHeader>
            <CardContent>
              {accommodation.images && accommodation.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {accommodation.images.map((image, index) => (
                    <div
                      key={image.id}
                      className="relative aspect-square rounded-lg border overflow-hidden group"
                    >
                      <img
                        src={image.url}
                        alt={image.alt_text || `Image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {image.is_featured && (
                        <div className="absolute top-2 left-2 p-1.5 rounded-full bg-primary text-primary-foreground">
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-3">
                        <p className="text-white text-xs font-medium">
                          {image.caption || `Image ${image.order}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No images uploaded
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Base Price
                </CardTitle>
                <CardDescription>Weekday rate per night</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {formatPrice(accommodation.base_price)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Weekend Price
                </CardTitle>
                <CardDescription>Friday & Saturday nights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {formatPrice(accommodation.weekend_price)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Cleaning Fee
                </CardTitle>
                <CardDescription>One-time per booking</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {formatPrice(accommodation.cleaning_fee)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Minimum Stay
                  </p>
                  <p className="text-lg font-semibold">
                    {accommodation.minimum_stay} nights
                  </p>
                </div>
                {accommodation.maximum_stay && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Maximum Stay
                    </p>
                    <p className="text-lg font-semibold">
                      {accommodation.maximum_stay} nights
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Check-in Time
                  </p>
                  <p className="text-lg font-semibold">
                    {accommodation.check_in_time}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Check-out Time
                  </p>
                  <p className="text-lg font-semibold">
                    {accommodation.check_out_time}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Amenities Tab */}
        <TabsContent value="amenities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Amenities</CardTitle>
              <CardDescription>
                {accommodation.amenities?.length || 0} amenities available
              </CardDescription>
            </CardHeader>
            <CardContent>
              {accommodation.amenities && accommodation.amenities.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {accommodation.amenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
                    >
                      {amenity.icon && (
                        <span className="text-2xl">{amenity.icon}</span>
                      )}
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No amenities added
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper component for property details
function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-muted rounded-lg">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
