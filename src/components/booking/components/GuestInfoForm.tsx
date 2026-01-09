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
    <Card className="premium-card bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-700 shadow-xl">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
          Guest Information
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {isAuthenticated
            ? "Verify your contact information"
            : "Please provide your contact information"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label
                htmlFor="first_name"
                className="text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                First Name *
              </Label>
              <Input
                id="first_name"
                {...register("first_name")}
                placeholder="John"
                className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-black/60"
              />
              {errors.first_name && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label
                htmlFor="last_name"
                className="text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                Last Name *
              </Label>
              <Input
                id="last_name"
                {...register("last_name")}
                placeholder="Doe"
                className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-black/60"
              />
              {errors.last_name && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john.doe@example.com"
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-black/60"
            />
            {errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+256 700 000 000"
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-black/60"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label
              htmlFor="special_requests"
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Special Requests (Optional)
            </Label>
            <Textarea
              id="special_requests"
              {...register("special_requests")}
              placeholder="Any special requirements or requests..."
              rows={4}
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-black/60"
            />
            {errors.special_requests && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.special_requests.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all font-semibold"
            disabled={isSubmitting}
          >
            Continue to Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
