import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAdminActivities, useDeleteActivity } from "@/hooks/use-admin";
import { Plus, Search, Edit, Trash2, Eye, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Loading } from "@/components/common/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "@tanstack/react-router";

export function AdminActivitiesTemplate() {
  const [page, _] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useAdminActivities({ page, per_page: 10 });
  const { mutate: deleteActivity } = useDeleteActivity();

  const filteredData = data?.data?.filter((activity) =>
    activity.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    deleteActivity(id);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Activities</h1>
            <p className="text-muted-foreground">
              Manage your activity offerings
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>

        {/* Search */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Activities Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>All Activities ({data?.meta?.total || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loading />
            ) : filteredData && filteredData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
                            {activity.images?.[0] ? (
                              <img
                                src={
                                  activity.images[0].thumbnail_url ||
                                  activity.images[0].url
                                }
                                alt={activity.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                No image
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{activity.name}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{activity.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            {formatDuration(activity.duration)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {activity.max_participants} people
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(activity.price)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              activity.status === "available"
                                ? "default"
                                : activity.status === "unavailable"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="capitalize"
                          >
                            {activity.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to="/activities/$slug"
                              params={{ slug: activity.slug }}
                              target=""
                            >
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Activity?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "
                                    {activity.name}" and all associated data.
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(activity.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No activities found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
