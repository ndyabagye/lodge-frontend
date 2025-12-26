export interface DashboardStats {
  total_bookings: number;
  total_revenue: number;
  occupancy_rate: number;
  active_users: number;
  pending_bookings: number;
  total_accommodations: number;
  total_activities: number;
  revenue_change: number;
  bookings_change: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
}

export interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "guest" | "staff" | "admin";
  status: "active" | "suspended" | "deleted";
  email_verified: boolean;
  created_at: string;
  last_login: string | null;
  total_bookings: number;
  total_spent: number;
}
