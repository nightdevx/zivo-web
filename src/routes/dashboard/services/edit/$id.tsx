import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
import { Clock } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import {
  GetServiceByIdQueryOptions,
  useUpdateService,
} from "@/lib/hooks/service.hook";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Service } from "@/lib/models/service.model";

export const Route = createFileRoute("/dashboard/services/edit/$id")({
  component: EditServicePage,
  loader: ({ context: { queryClient }, params: { id } }) => {
    queryClient.ensureQueryData(GetServiceByIdQueryOptions(id));
  },
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Service name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  duration: z.string({
    required_error: "Please select a duration.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  description: z.string(),
  isActive: z.boolean(),
});

export default function EditServicePage() {
  const { id } = Route.useParams();
  const serviceQuery = useSuspenseQuery(GetServiceByIdQueryOptions(id));
  const service: Service = serviceQuery.data as Service;

  const { mutateAsync: updateService } = useUpdateService();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: service.name,
      category: service.category,
      duration: service.duration,
      price: service.price.toString(),
      description: service.description || "",
      isActive: service.isActive,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedService = {
      ...values,
      price: Number(values.price),
    };
    updateService(
      { id: service.id, service: updatedService },
      {
        onSuccess: () => {
          toast.success("Service updated successfully.");
          window.history.back();
        },
        onError: () => {
          toast.error("Failed to update service.");
        },
      }
    );
  }

  if (serviceQuery.isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-2xl font-bold">Loading...</h1>
          <p className="text-gray-500">Please wait while we load the data.</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-2xl font-bold">Service not found</h1>
          <p className="text-gray-500">
            The service you are looking for does not exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Edit Service</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>
              Update the service information below. Ensure all details are
              correct before saving.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Saç Kesimi - Kadın" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the service as it will appear to clients
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hair">Saç</SelectItem>
                            <SelectItem value="nails">Tırnak</SelectItem>
                            <SelectItem value="skincare">
                              Cilt Bakımı
                            </SelectItem>
                            <SelectItem value="makeup">Makyaj</SelectItem>
                            <SelectItem value="other">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₺)</FormLabel>
                        <FormControl>
                          <Input placeholder="250" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1 hour 30 minutes</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="150">
                            2 hours 30 minutes
                          </SelectItem>
                          <SelectItem value="180">3 hours</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        <Clock className="inline mr-1 h-3 w-3" />
                        This helps schedule appointments correctly
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the service details"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Additional information about the service
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Active Status
                        </FormLabel>
                        <FormDescription>
                          Make this service available for booking
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={!!field.value} // Burada boolean'a dönüştürme yapılıyor
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                /> */}

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
