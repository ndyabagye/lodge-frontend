import { api } from "@/lib/api-client";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "@/types";

export const authService = {
  // POST /api/v1/auth/register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data.data;
  },

  // POST /api/v1/auth/login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data.data;
  },

  // POST /api/v1/auth/logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // GET /api/v1/auth/me
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data.data;
  },

  // POST /api/v1/auth/forgot-password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  // POST /api/v1/auth/reset-password
  resetPassword: async (data: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<{ message: string }> => {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },

  // POST /api/v1/auth/verify-email
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post("/auth/verify-email", { token });
    return response.data;
  },
};
