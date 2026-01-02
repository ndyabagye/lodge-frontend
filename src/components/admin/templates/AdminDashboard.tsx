import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStats, useRevenueData } from "@/hooks/use-admin";
import { Loading } from "@/components/common/Loading";
import {
  Users,
  Home,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Zap,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { format, subDays } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export function AdminDashboardTemplate() {
  const { data: stats, isLoading: loadingStats } = useDashboardStats();

  const today = format(new Date(), "yyyy-MM-dd");
  const thirtyDaysAgo = format(subDays(new Date(), 30), "yyyy-MM-dd");

  const { data: revenueData, isLoading: loadingRevenue } = useRevenueData(
    thirtyDaysAgo,
    today,
  );

  if (loadingStats) return <Loading />;

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your lodge management system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Revenue */}
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(stats?.total_revenue || 0)}
              </div>
              {stats?.revenue_change !== undefined && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  {stats.revenue_change >= 0 ? (
                    <>
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">
                        +{stats.revenue_change.toFixed(1)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-3 w-3 text-red-500" />
                      <span className="text-red-500">
                        {stats.revenue_change.toFixed(1)}%
                      </span>
                    </>
                  )}
                  <span>from last month</span>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Total Bookings */}
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.total_bookings || 0}
              </div>
              {stats?.bookings_change !== undefined && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  {stats.bookings_change >= 0 ? (
                    <>
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">
                        +{stats.bookings_change.toFixed(1)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-3 w-3 text-red-500" />
                      <span className="text-red-500">
                        {stats.bookings_change.toFixed(1)}%
                      </span>
                    </>
                  )}
                  <span>from last month</span>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Occupancy Rate */}
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Occupancy Rate
              </CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.occupancy_rate?.toFixed(1) || 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats?.total_accommodations || 0} total accommodations
              </p>
            </CardContent>
          </Card>

          {/* Active Users */}
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.active_users || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats?.pending_bookings || 0} pending bookings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Revenue Chart */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Revenue Overview (30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingRevenue ? (
                <div className="h-80 flex items-center justify-center">
                  <Loading />
                </div>
              ) : revenueData && revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={revenueData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => format(new Date(date), "MMM dd")}
                      className="text-xs"
                    />
                    <YAxis
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      className="text-xs"
                    />
                    <Tooltip
                      formatter={(value) =>
                        typeof value === "number" ? formatPrice(value) : ""
                      }
                      labelFormatter={(date) =>
                        format(new Date(date), "MMM dd, yyyy")
                      }
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  No revenue data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bookings Chart */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Bookings Overview (30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingRevenue ? (
                <div className="h-80 flex items-center justify-center">
                  <Loading />
                </div>
              ) : revenueData && revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={revenueData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => format(new Date(date), "MMM dd")}
                      className="text-xs"
                    />
                    <YAxis className="text-xs" />
                    <Tooltip
                      labelFormatter={(date) =>
                        format(new Date(date), "MMM dd, yyyy")
                      }
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="bookings"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  No bookings data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Accommodations
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {stats?.total_accommodations || 0}
                </div>
                <p className="text-sm text-muted-foreground">Total units</p>
              </div>
              <Home className="h-12 w-12 text-muted-foreground opacity-20" />
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {stats?.total_activities || 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Available options
                </p>
              </div>
              <Zap className="h-12 w-12 text-muted-foreground opacity-20" />
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Pending Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {stats?.pending_bookings || 0}
                </div>
                <p className="text-sm text-muted-foreground">Needs attention</p>
              </div>
              <Calendar className="h-12 w-12 text-muted-foreground opacity-20" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
