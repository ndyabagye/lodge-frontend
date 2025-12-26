import { api } from "@/lib/api-client";
import type { User } from "@/types/user";

export const userService = {
  // GET /api/v1/users/profile
  getProfile: async (): Promise<User> => {
    const { data } = await api.get("/users/profile");
    return data.data;
  },

  // PUT /api/v1/users/profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const { data } = await api.put("/users/profile", userData);
    return data.data;
  },

  // PUT /api/v1/users/password
  updatePassword: async (passwordData: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }): Promise<{ message: string }> => {
    const { data } = await api.put("/users/password", passwordData);
    return data;
  },

  // GET /api/v1/users/preferences
  getPreferences: async () => {
    const { data } = await api.get("/users/preferences");
    return data.data;
  },

  // PUT /api/v1/users/preferences
  updatePreferences: async (preferences: {
    email_notifications: boolean;
    sms_notifications: boolean;
    marketing_communications: boolean;
  }) => {
    const { data } = await api.put("/users/preferences", preferences);
    return data.data;
  },

  // DELETE /api/v1/users/account
  deleteAccount: async (): Promise<{ message: string }> => {
    const { data } = await api.delete("/users/account");
    return data;
  },
};
