import { Link, useMatchRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { User, Calendar, Heart, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useNavigate } from "@tanstack/react-router";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/account",
    icon: User,
  },
  {
    name: "My Bookings",
    href: "/account/bookings",
    icon: Calendar,
  },
  {
    name: "Favorites",
    href: "/account/favorites",
    icon: Heart,
  },
  {
    name: "Profile Settings",
    href: "/account/profile",
    icon: Settings,
  },
];

export function AccountLayout({ children }: AccountLayoutProps) {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              {/* User Info */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = matchRoute({ to: item.href, fuzzy: false });
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Log Out
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
