import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

export function useUserProfile() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, "profile"],
    queryFn: () => userService.getProfile(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      updateUser(data);
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: userService.updatePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to change password");
    },
  });
}

export function useUserPreferences() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, "preferences"],
    queryFn: () => userService.getPreferences(),
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updatePreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER, "preferences"],
      });
      toast.success("Preferences updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update preferences",
      );
    },
  });
}

export function useDeleteAccount() {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: userService.deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      logout();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete account");
    },
  });
}
