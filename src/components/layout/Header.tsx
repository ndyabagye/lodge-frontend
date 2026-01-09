import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, User, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../common/ThemeToggle";

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    // <header className="sticky top-0 z-50 w-full border-b premium-surface backdrop-blur supports-backdrop-filter:premium-bg-background/80">
    <header className="sticky top-0 z-50 w-full border-b border-background/70 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
      <div className="premium-container">
        <div className="flex h-16 md:h-20 items-center justify-between gap-2">
          {/* Logo - Premium Styling */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-2 bg-premium-accent/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-lg md:text-2xl font-light tracking-tight relative premium-text-primary">
                Villa
                <span className="premium-text-accent font-serif italic ml-1">
                  Mbanandi
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Premium Styling */}
          <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            {[
              { to: "/accommodations", label: "Accommodations" },
              { to: "/activities", label: "Activities" },
              // { to: "/events", label: "Events" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 text-sm font-medium premium-text-muted hover:premium-text-accent transition-colors duration-300 rounded-lg hover:bg-premium-accent/5"
                activeProps={{
                  className: "premium-text-accent bg-premium-accent/10",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions - Premium Styling */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* Theme toggle - Hidden on smallest screens */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Cart - Premium Styling */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full w-9 h-9 md:w-10 md:h-10 hover:bg-premium-accent/10 hover:text-premium-accent"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-premium-accent text-premium-accent-foreground border-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu - Premium Styling - Hidden on small screens */}
            {isAuthenticated ? (
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="rounded-full px-2 md:px-3 hover:bg-muted-foreground hover:text-premium-accent"
                    >
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-premium-accent/10 flex items-center justify-center md:mr-2">
                        <User className="h-4 w-4 text-premium-accent" />
                      </div>
                      <span className="hidden md:inline text-sm font-medium premium-text-primary">
                        {user?.first_name?.charAt(0)}
                      </span>
                      <ChevronDown className="hidden md:inline ml-2 h-3 w-3 premium-text-muted" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none premium-text-primary">
                          {user?.first_name} {user?.last_name}
                        </p>
                        <p className="text-xs leading-none premium-text-muted">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="premium-border-light" />
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer focus:bg-premium-accent/10 focus:text-premium-accent"
                    >
                      <Link to="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer focus:bg-premium-accent/10 focus:text-premium-accent"
                    >
                      <Link to="/account/bookings">My Bookings</Link>
                    </DropdownMenuItem>
                    {user?.role === "admin" && (
                      <>
                        <DropdownMenuSeparator className="premium-border-light" />
                        <DropdownMenuItem
                          asChild
                          className="cursor-pointer focus:bg-premium-accent/10 focus:text-premium-accent"
                        >
                          <Link to="/admin">Admin Dashboard</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator className="premium-border-light" />
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-premium-accent/10 hover:text-premium-accent"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm" className="premium-button">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu - Premium Styling - Only visible on mobile */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-9 h-9 md:w-10 md:h-10 hover:bg-premium-accent/10 hover:text-premium-accent flex-shrink-0"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[320px] border-l premium-border-light px-4"
              >
                <nav className="flex flex-col space-y-1 mt-8">
                  {/* User info in mobile menu */}
                  {isAuthenticated && (
                    <div className="px-4 py-3 mb-2 rounded-lg bg-premium-accent/5">
                      <p className="text-sm font-medium premium-text-primary">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs premium-text-muted">
                        {user?.email}
                      </p>
                    </div>
                  )}

                  {/* Navigation Links */}
                  {[
                    { to: "/accommodations", label: "Accommodations" },
                    { to: "/activities", label: "Activities" },
                    // { to: "/events", label: "Events" },
                    { to: "/about", label: "About" },
                    { to: "/contact", label: "Contact" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="px-4 py-3 text-base font-medium premium-text-muted hover:premium-text-accent transition-colors duration-300 rounded-lg hover:bg-premium-accent/5"
                      activeProps={{
                        className: "premium-text-accent bg-premium-accent/10",
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Mobile-only user actions */}
                  {isAuthenticated ? (
                    <>
                      <div className="h-px bg-premium-accent/10 my-2" />
                      <Link
                        to="/account"
                        className="px-4 py-3 text-base font-medium premium-text-muted hover:premium-text-accent transition-colors duration-300 rounded-lg hover:bg-premium-accent/5"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/account/bookings"
                        className="px-4 py-3 text-base font-medium premium-text-muted hover:premium-text-accent transition-colors duration-300 rounded-lg hover:bg-premium-accent/5"
                      >
                        My Bookings
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin"
                          className="px-4 py-3 text-base font-medium premium-text-muted hover:premium-text-accent transition-colors duration-300 rounded-lg hover:bg-premium-accent/5"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="h-px bg-premium-accent/10 my-2" />
                      <button
                        onClick={logout}
                        className="px-4 py-3 text-base font-medium text-destructive hover:bg-destructive/10 transition-colors duration-300 rounded-lg text-left w-full"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="h-px bg-premium-accent/10 my-2" />
                      <Link to="/auth/login">
                        <Button
                          variant="ghost"
                          className="w-full justify-start px-4 hover:bg-premium-accent/10 hover:text-premium-accent"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth/register">
                        <Button className="w-full premium-button">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}

                  {/* Theme toggle in mobile menu */}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-sm font-medium premium-text-muted">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
