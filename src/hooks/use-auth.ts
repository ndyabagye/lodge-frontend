import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/constants";
import type { LoginCredentials, RegisterData } from "@/types/user";

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login: setAuth, logout: clearAuth, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success("Welcome back!");
      navigate({ to: "/account" });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success("Account created successfully!");
      navigate({ to: "/account" });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate({ to: "/" });
    },
    onError: () => {
      // Still clear auth even if API call fails
      clearAuth();
      queryClient.clear();
      navigate({ to: "/" });
    },
  });

  const currentUserQuery = useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () => authService.getCurrentUser(),
    enabled: isAuthenticated,
    retry: false,
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isAuthenticated,
    user: currentUserQuery.data,
  };
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: () => {
      toast.success("Password reset link sent to your email");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: {
      token: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success("Password reset successful");
      navigate({ to: "/auth/login" });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Password reset failed");
    },
  });
}
