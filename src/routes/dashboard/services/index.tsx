import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ServicesTable } from "@/components/services-table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GetAllServicesQueryOptions } from "@/lib/hooks/service.hook";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Service } from "@/lib/models/service.model";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/services/")({
  component: ServicesPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(GetAllServicesQueryOptions);
  },
  pendingComponent: () => (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-2xl font-bold">Loading...</h1>
        <p className="text-gray-500">Please wait while we load the data.</p>
      </div>
    </div>
  ),
});

function ServicesPage() {
  const serviceQuery = useSuspenseQuery(GetAllServicesQueryOptions);
  const services: Service[] = serviceQuery.data;

  const [showActive, setShowActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter((service) => {
    const isActive = showActive ? service.isActive : true;
    const matchesSearchTerm = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return isActive && matchesSearchTerm;
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Services</h1>
          <Button asChild>
            <Link to="/dashboard/services/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-active"
                checked={showActive}
                onCheckedChange={(checked) => setShowActive(checked)}
              />
              <Label htmlFor="show-active">Show active only</Label>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="hair">Hair</TabsTrigger>
            <TabsTrigger value="nails">Nails</TabsTrigger>
            <TabsTrigger value="skincare">Skincare</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ServicesTable services={filteredServices} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hair" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Hair Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ServicesTable services={filteredServices} category="hair" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nails" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Nail Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ServicesTable services={filteredServices} category="nails" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skincare" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Skincare Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ServicesTable
                  services={filteredServices}
                  category="skincare"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Other Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ServicesTable services={filteredServices} category="other" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
