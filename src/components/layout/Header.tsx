// import { useAuthStore } from "@/stores/auth-store";
// import { useCartStore } from "@/stores/cart-store";
// import { Link } from "@tanstack/react-router";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Badge } from "@/components/ui/badge";
// import { Menu, ShoppingCart, User } from "lucide-react";
// import { ThemeToggle } from "../common/ThemeToggle";

// export function Header() {
//   const { isAuthenticated, user, logout } = useAuthStore();
//   const { items } = useCartStore();
//   const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-xl font-bold">Lodge</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link
//               to="/accommodations"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               Accommodations
//             </Link>
//             <Link
//               to="/activities"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               Activities
//             </Link>
//             <Link
//               to="/events"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               Events
//             </Link>
//             <Link
//               to="/about"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               About
//             </Link>
//             <Link
//               to="/contact"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               Contact
//             </Link>
//           </nav>

//           {/* Right side actions */}
//           <div className="flex items-center space-x-4">
//             {/*Theme toggle*/}
//             <div className="mr-2">
//               <ThemeToggle />
//             </div>
//             {/* Cart */}
//             <Link to="/cart">
//               <Button variant="ghost" size="icon" className="relative">
//                 <ShoppingCart className="h-5 w-5" />
//                 {cartItemCount > 0 && (
//                   <Badge
//                     variant="destructive"
//                     className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
//                   >
//                     {cartItemCount}
//                   </Badge>
//                 )}
//               </Button>
//             </Link>

//             {/* User Menu */}
//             {isAuthenticated ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="icon">
//                     <User className="h-5 w-5" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-56">
//                   <DropdownMenuLabel>
//                     <div className="flex flex-col space-y-1">
//                       <p className="text-sm font-medium leading-none">
//                         {user?.first_name} {user?.last_name}
//                       </p>
//                       <p className="text-xs leading-none text-muted-foreground">
//                         {user?.email}
//                       </p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem asChild>
//                     <Link to="/account">My Account</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link to="/account/bookings">My Bookings</Link>
//                   </DropdownMenuItem>
//                   {user?.role === "admin" && (
//                     <>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem asChild>
//                         <Link to="/admin">Admin Dashboard</Link>
//                       </DropdownMenuItem>
//                     </>
//                   )}
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link to="/auth/login">
//                   <Button variant="ghost" size="sm">
//                     Login
//                   </Button>
//                 </Link>
//                 <Link to="/auth/register">
//                   <Button size="sm">Sign Up</Button>
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu */}
//             <Sheet>
//               <SheetTrigger asChild className="md:hidden">
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right">
//                 <nav className="flex flex-col space-y-4 mt-8 px-2">
//                   <Link
//                     to="/accommodations"
//                     className="text-sm font-medium transition-colors hover:text-primary"
//                   >
//                     Accommodations
//                   </Link>
//                   <Link
//                     to="/activities"
//                     className="text-sm font-medium transition-colors hover:text-primary"
//                   >
//                     Activities
//                   </Link>
//                   <Link
//                     to="/events"
//                     className="text-sm font-medium transition-colors hover:text-primary"
//                   >
//                     Events
//                   </Link>
//                   <Link
//                     to="/about"
//                     className="text-sm font-medium transition-colors hover:text-primary"
//                   >
//                     About
//                   </Link>
//                   <Link
//                     to="/contact"
//                     className="text-sm font-medium transition-colors hover:text-primary"
//                   >
//                     Contact
//                   </Link>
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

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
    <header className="sticky top-0 z-50 w-full border-b premium-surface backdrop-blur supports-backdrop-filter:premium-bg-background/80">
      <div className="premium-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Premium Styling */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-premium-accent/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-2xl font-light tracking-tight relative premium-text-primary">
                Lodge
                <span className="premium-text-accent font-serif italic ml-1">
                  Retreats
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Premium Styling */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { to: "/accommodations", label: "Accommodations" },
              { to: "/activities", label: "Activities" },
              { to: "/events", label: "Events" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-4 py-2 text-sm font-medium premium-text-muted hover:premium-text-accent transition-colors duration-300 rounded-lg hover:bg-premium-accent/5"
                activeProps={{
                  className: "premium-text-accent bg-premium-accent/10",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions - Premium Styling */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <div className="mr-1">
              <ThemeToggle />
            </div>

            {/* Cart - Premium Styling */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full w-10 h-10 hover:bg-premium-accent/10 hover:text-premium-accent"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-premium-accent text-premium-accent-foreground border-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu - Premium Styling */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full px-3 hover:bg-premium-accent/10 hover:text-premium-accent"
                  >
                    <div className="w-8 h-8 rounded-full bg-premium-accent/10 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-premium-accent" />
                    </div>
                    <span className="text-sm font-medium premium-text-primary">
                      {user?.first_name?.charAt(0)}
                    </span>
                    <ChevronDown className="ml-2 h-3 w-3 premium-text-muted" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 premium-card">
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
            ) : (
              <div className="flex items-center space-x-2">
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

            {/* Mobile Menu - Premium Styling */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-premium-accent/10 hover:text-premium-accent"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="premium-surface border-l premium-border-light"
              >
                <nav className="flex flex-col space-y-2 mt-12 px-2">
                  {[
                    { to: "/accommodations", label: "Accommodations" },
                    { to: "/activities", label: "Activities" },
                    { to: "/events", label: "Events" },
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
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
