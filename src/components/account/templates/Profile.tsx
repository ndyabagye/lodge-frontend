import { useState } from "react";
import { AccountLayout } from "../components/AccountLayout";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/stores/auth-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, User, Mail, Phone, Lock } from "lucide-react";

const profileSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const passwordSchema = z
  .object({
    current_password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export function ProfileTemplate() {
  const { user, updateUser } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user in store (in production, call API first)
      updateUser({
        ...user!,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsChangingPassword(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Password changed successfully");
      resetPassword();
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        {/* Personal Information */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmitProfile(onProfileSubmit)}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="first_name"
                      className="pl-10"
                      {...registerProfile("first_name")}
                    />
                  </div>
                  {profileErrors.first_name && (
                    <p className="text-sm text-destructive">
                      {profileErrors.first_name.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="last_name"
                      className="pl-10"
                      {...registerProfile("last_name")}
                    />
                  </div>
                  {profileErrors.last_name && (
                    <p className="text-sm text-destructive">
                      {profileErrors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    {...registerProfile("email")}
                  />
                </div>
                {profileErrors.email && (
                  <p className="text-sm text-destructive">
                    {profileErrors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10"
                    {...registerProfile("phone")}
                  />
                </div>
                {profileErrors.phone && (
                  <p className="text-sm text-destructive">
                    {profileErrors.phone.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isUpdating}>
                {isUpdating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmitPassword(onPasswordSubmit)}
              className="space-y-4"
            >
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current_password"
                    type="password"
                    className="pl-10"
                    {...registerPassword("current_password")}
                  />
                </div>
                {passwordErrors.current_password && (
                  <p className="text-sm text-destructive">
                    {passwordErrors.current_password.message}
                  </p>
                )}
              </div>

              <Separator />

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new_password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new_password"
                    type="password"
                    className="pl-10"
                    {...registerPassword("new_password")}
                  />
                </div>
                {passwordErrors.new_password && (
                  <p className="text-sm text-destructive">
                    {passwordErrors.new_password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm_password"
                    type="password"
                    className="pl-10"
                    {...registerPassword("confirm_password")}
                  />
                </div>
                {passwordErrors.confirm_password && (
                  <p className="text-sm text-destructive">
                    {passwordErrors.confirm_password.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive updates and communications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive booking confirmations and updates via email
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive booking reminders via text message
                </p>
              </div>
              <Switch
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive special offers and promotions
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button className="mt-4">Save Preferences</Button>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card className="border-border bg-card border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
}
