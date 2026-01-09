import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen premium-bg-background">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold premium-text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" search={{}}>
          <Button className="bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg font-semibold">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
