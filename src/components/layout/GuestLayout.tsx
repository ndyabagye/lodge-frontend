import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "@tanstack/react-router";

export function GuestLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
