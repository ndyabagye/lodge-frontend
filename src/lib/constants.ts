export const APP_NAME = "Lodge Booking System";
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const API_VERSION = "v1";

export const ROUTES = {
  HOME: "/",
  ACCOMMODATIONS: "/accommodations",
  ACTIVITIES: "/activities",
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  TERMS: "/auth/terms",
  PRIVACY: "/auth/privacy",
  CONTACT: "/contact",
  ACCOUNT: "/account",
  ADMIN: "/admin",
} as const;

export const QUERY_KEYS = {
  ADMIN: "admin",
  ACCOMMODATIONS: "accommodations",
  ACCOMMODATION: "accommodation",
  ACTIVITIES: "activities",
  ACTIVITY: "activity",
  BOOKINGS: "bookings",
  CONTACT: "contact-us",
  DASHBOARD: "dashboard",
  USER: "user",
  USERS: "users",
  REVENUE: "revenue",
  REVIEWS: "reviews",
  STATS: "stats",
  PAYMENT_GATEWAYS: "payment-gateways",
  PAYMENT_STATS: "payment-stats",
} as const;

export const UGANDA_VAT = 0.18;
