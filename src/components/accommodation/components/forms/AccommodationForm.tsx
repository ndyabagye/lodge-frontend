import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const accommodationSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().max(255).optional(),
  type: z.string().min(1, "Type is required"),
  description: z.string().min(1, "Description is required"),
  short_description: z
    .string()
    .min(1, "Short description is required")
    .max(200),
  max_guests: z.coerce.number().min(1, "Must accommodate at least 1 guest"),
  num_bedrooms: z.coerce.number().min(0),
  num_bathrooms: z.coerce.number().min(0),
  num_beds: z.coerce.number().min(0),
  size_sqft: z.coerce.number().optional(),
  base_price: z.coerce.number().min(0, "Price must be positive"),
  weekend_price: z.coerce.number().min(0, "Price must be positive"),
  cleaning_fee: z.coerce.number().min(0, "Fee must be positive"),
  minimum_stay: z.coerce
    .number()
    .min(1, "Minimum stay must be at least 1 night"),
  maximum_stay: z.coerce.number().optional(),
  check_in_time: z.string().min(1, "Check-in time is required"),
  check_out_time: z.string().min(1, "Check-out time is required"),
  status: z
    .enum(["available", "maintenance", "coming_soon", "archived"])
    .default("available"),
  featured: z.boolean().default(false),
});

type AccommodationFormValues = z.infer<typeof accommodationSchema>;

interface AccommodationFormProps {
  defaultValues?: Partial<AccommodationFormValues>;
  onSubmit: (data: AccommodationFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const ACCOMMODATION_TYPES = [
  "Villa",
  "Cottage",
  "Suite",
  "Cabin",
  "Bungalow",
  "Apartment",
  "Studio",
  "Lodge",
];

// Helper function to generate slug from name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export function AccommodationForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Accommodation",
}: AccommodationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      slug: defaultValues?.slug || "",
      type: defaultValues?.type || "",
      description: defaultValues?.description || "",
      short_description: defaultValues?.short_description || "",
      max_guests: defaultValues?.max_guests || 1,
      num_bedrooms: defaultValues?.num_bedrooms || 0,
      num_bathrooms: defaultValues?.num_bathrooms || 0,
      num_beds: defaultValues?.num_beds || 0,
      size_sqft: defaultValues?.size_sqft || undefined,
      base_price: defaultValues?.base_price || 0,
      weekend_price: defaultValues?.weekend_price || 0,
      cleaning_fee: defaultValues?.cleaning_fee || 0,
      minimum_stay: defaultValues?.minimum_stay || 1,
      maximum_stay: defaultValues?.maximum_stay || undefined,
      check_in_time: defaultValues?.check_in_time || "14:00",
      check_out_time: defaultValues?.check_out_time || "11:00",
      status: defaultValues?.status || "available",
      featured: defaultValues?.featured || false,
    },
  });

  const shortDescription = watch("short_description");
  const name = watch("name");
  const slug = watch("slug");

  // Auto-generate slug from name if slug is empty
  const handleFormSubmit = (data: AccommodationFormValues) => {
    const submissionData = {
      ...data,
      slug: data.slug || generateSlug(data.name),
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Enter the basic details about the accommodation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <Input
                id="name"
                placeholder="e.g., Luxury Ocean View Villa"
                {...register("name")}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>
              <Input
                id="slug"
                placeholder="luxury-ocean-view-villa"
                {...register("slug")}
              />
              <FieldDescription>
                Leave empty to auto-generate from name
                {!slug && name && (
                  <span className="block mt-1 text-xs text-muted-foreground">
                    Will generate:{" "}
                    <span className="font-mono">{generateSlug(name)}</span>
                  </span>
                )}
              </FieldDescription>
              {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
            </Field>
          </FieldGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="type">Type *</FieldLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACCOMMODATION_TYPES.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && <FieldError>{errors.type.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="status">Status *</FieldLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="coming_soon">Coming Soon</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <FieldError>{errors.status.message}</FieldError>
              )}
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="short_description">
              Short Description *
            </FieldLabel>
            <Input
              id="short_description"
              placeholder="Brief description (max 200 characters)"
              maxLength={200}
              {...register("short_description")}
            />
            <FieldDescription>
              {shortDescription?.length || 0}/200 characters
            </FieldDescription>
            {errors.short_description && (
              <FieldError>{errors.short_description.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Full Description *</FieldLabel>
            <Textarea
              id="description"
              placeholder="Detailed description of the accommodation..."
              rows={6}
              {...register("description")}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>

          <Field>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FieldLabel htmlFor="featured" className="text-base">
                  Featured
                </FieldLabel>
                <FieldDescription>
                  Display this accommodation on the homepage
                </FieldDescription>
              </div>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </Field>
        </CardContent>
      </Card>

      {/* Capacity & Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Capacity & Layout</CardTitle>
          <CardDescription>
            Specify the accommodation capacity and room configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Field>
              <FieldLabel htmlFor="max_guests">Max Guests *</FieldLabel>
              <Input
                id="max_guests"
                type="number"
                min="1"
                {...register("max_guests", { valueAsNumber: true })}
              />
              {errors.max_guests && (
                <FieldError>{errors.max_guests.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="num_bedrooms">Bedrooms</FieldLabel>
              <Input
                id="num_bedrooms"
                type="number"
                min="0"
                {...register("num_bedrooms", { valueAsNumber: true })}
              />
              {errors.num_bedrooms && (
                <FieldError>{errors.num_bedrooms.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="num_bathrooms">Bathrooms</FieldLabel>
              <Input
                id="num_bathrooms"
                type="number"
                min="0"
                {...register("num_bathrooms", { valueAsNumber: true })}
              />
              {errors.num_bathrooms && (
                <FieldError>{errors.num_bathrooms.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="num_beds">Beds</FieldLabel>
              <Input
                id="num_beds"
                type="number"
                min="0"
                {...register("num_beds", { valueAsNumber: true })}
              />
              {errors.num_beds && (
                <FieldError>{errors.num_beds.message}</FieldError>
              )}
            </Field>
          </div>

          <Separator className="my-6" />

          <Field>
            <FieldLabel htmlFor="size_sqft">Size (sq ft)</FieldLabel>
            <Input
              id="size_sqft"
              type="number"
              min="0"
              placeholder="e.g., 1200"
              {...register("size_sqft", { valueAsNumber: true })}
            />
            <FieldDescription>Optional property size</FieldDescription>
            {errors.size_sqft && (
              <FieldError>{errors.size_sqft.message}</FieldError>
            )}
          </Field>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <CardDescription>
            Set the pricing structure for this accommodation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field>
              <FieldLabel htmlFor="base_price">
                Base Price (per night) *
              </FieldLabel>
              <Input
                id="base_price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("base_price", { valueAsNumber: true })}
              />
              {errors.base_price && (
                <FieldError>{errors.base_price.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="weekend_price">Weekend Price *</FieldLabel>
              <Input
                id="weekend_price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("weekend_price", { valueAsNumber: true })}
              />
              <FieldDescription>Friday & Saturday nights</FieldDescription>
              {errors.weekend_price && (
                <FieldError>{errors.weekend_price.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="cleaning_fee">Cleaning Fee *</FieldLabel>
              <Input
                id="cleaning_fee"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("cleaning_fee", { valueAsNumber: true })}
              />
              <FieldDescription>One-time fee per booking</FieldDescription>
              {errors.cleaning_fee && (
                <FieldError>{errors.cleaning_fee.message}</FieldError>
              )}
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Booking Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Rules</CardTitle>
          <CardDescription>
            Configure check-in/out times and stay requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="check_in_time">Check-in Time *</FieldLabel>
              <Input
                id="check_in_time"
                type="time"
                {...register("check_in_time")}
              />
              {errors.check_in_time && (
                <FieldError>{errors.check_in_time.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="check_out_time">Check-out Time *</FieldLabel>
              <Input
                id="check_out_time"
                type="time"
                {...register("check_out_time")}
              />
              {errors.check_out_time && (
                <FieldError>{errors.check_out_time.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="minimum_stay">
                Minimum Stay (nights) *
              </FieldLabel>
              <Input
                id="minimum_stay"
                type="number"
                min="1"
                {...register("minimum_stay")}
              />
              {errors.minimum_stay && (
                <FieldError>{errors.minimum_stay.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="maximum_stay">
                Maximum Stay (nights)
              </FieldLabel>
              <Input
                id="maximum_stay"
                type="number"
                min="1"
                placeholder="Optional"
                {...register("maximum_stay")}
              />
              <FieldDescription>Leave empty for no limit</FieldDescription>
              {errors.maximum_stay && (
                <FieldError>{errors.maximum_stay.message}</FieldError>
              )}
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
