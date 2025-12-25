import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Lodge Booking System</h1>
        <p className="text-muted-foreground">
          Welcome to your new lodge booking platform
        </p>
      </div>
    </div>
  );
}
