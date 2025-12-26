import { createFileRoute } from "@tanstack/react-router";
import { FavoritesTemplate } from "@/components/account/templates/Favorites";

export const Route = createFileRoute("/account/favorites")({
  component: FavoritesPage,
});

function FavoritesPage() {
  return <FavoritesTemplate />;
}
