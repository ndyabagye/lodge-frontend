import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/favorites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/favorites"!</div>
}
