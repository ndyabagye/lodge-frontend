import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  useAdminAccommodations,
  useDeleteAccommodation,
} from "@/hooks/use-admin";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
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

export function AdminAccommodationsTemplate() {
  const [page, _] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useAdminAccommodations({ page, per_page: 10 });
  const { mutate: deleteAccommodation } = useDeleteAccommodation();

  const filteredData = data?.data?.filter((acc) =>
    acc.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    deleteAccommodation(id);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Accommodations</h1>
            <p className="text-muted-foreground">
              Manage your accommodation listings
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Accommodation
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search accommodations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accommodations Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>All Accommodations ({data?.meta?.total || 0})</CardTitle>
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
                      <TableHead>Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((accommodation) => (
                      <TableRow key={accommodation.id}>
                        <TableCell>
                          <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
                            {accommodation.images?.[0] ? (
                              <img
                                src={
                                  accommodation.images[0].thumbnail_url ||
                                  accommodation.images[0].url
                                }
                                alt={accommodation.name}
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
                          <div>
                            <p className="font-medium">{accommodation.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {accommodation.num_bedrooms} beds ·{" "}
                              {accommodation.num_bathrooms} baths
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {accommodation.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{accommodation.max_guests} guests</TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(accommodation.base_price)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              accommodation.status === "available"
                                ? "default"
                                : accommodation.status === "maintenance"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="capitalize"
                          >
                            {accommodation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to="/accommodations/$slug"
                              params={{ slug: accommodation.slug }}
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
                                    Delete Accommodation?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "
                                    {accommodation.name}" and all associated
                                    data. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDelete(accommodation.id)
                                    }
                                    className="bg-destructive hover:bg-destructive/90"
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
                No accommodations found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
