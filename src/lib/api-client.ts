import axios, { AxiosError } from "axios";
import { API_URL, API_VERSION } from "./constants";

export const api = axios.create({
  baseURL: `${API_URL}/api/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Set to true if using cookies
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle Laravel responses
api.interceptors.response.use(
  (response) => {
    // Laravel wraps data in { data: {...}, meta: {...} }
    // Keep the original structure but make it easier to access
    return response;
  },
  (error: AxiosError<any>) => {
    // Handle different error types
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("auth_token");
          window.location.href = "/auth/login";
          break;

        case 422:
          // Validation errors - Laravel format
          console.error("Validation errors:", data.errors);
          break;

        case 429:
          // Too many requests
          console.error("Rate limit exceeded");
          break;

        case 500:
          // Server error
          console.error("Server error:", data.message);
          break;
      }
    }

    return Promise.reject(error);
  },
);
