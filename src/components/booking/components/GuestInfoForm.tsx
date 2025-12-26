import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const guestInfoSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  special_requests: z.string().optional(),
});

type GuestInfoFormData = z.infer<typeof guestInfoSchema>;

interface GuestInfoFormProps {
  initialData: GuestInfoFormData;
  onSubmit: (data: GuestInfoFormData) => void;
  isAuthenticated: boolean;
}

export function GuestInfoForm({
  initialData,
  onSubmit,
  isAuthenticated,
}: GuestInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestInfoFormData>({
    resolver: zodResolver(guestInfoSchema),
    defaultValues: initialData,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Information</CardTitle>
        <CardDescription>
          {isAuthenticated
            ? "Verify your contact information"
            : "Please provide your contact information"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                {...register("first_name")}
                placeholder="John"
              />
              {errors.first_name && (
                <p className="text-sm text-destructive">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                {...register("last_name")}
                placeholder="Doe"
              />
              {errors.last_name && (
                <p className="text-sm text-destructive">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+256 700 000 000"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="special_requests">
              Special Requests (Optional)
            </Label>
            <Textarea
              id="special_requests"
              {...register("special_requests")}
              placeholder="Any special requirements or requests..."
              rows={4}
            />
            {errors.special_requests && (
              <p className="text-sm text-destructive">
                {errors.special_requests.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            Continue to Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
