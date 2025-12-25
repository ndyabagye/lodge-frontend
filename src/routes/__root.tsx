import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { NotFound } from "@/components/common/NotFound";
import { MainLayout } from "@/components/layout/MainLayout";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <>
      <ErrorBoundary>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ErrorBoundary>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
}
