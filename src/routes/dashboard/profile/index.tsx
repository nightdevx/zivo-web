"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CameraIcon } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  GetMyCompanyQueryOptions,
  useUpdateCompany,
  useCreateCompany,
} from "@/lib/hooks/companies.hook";
import { GetMyUserQueryOptions, useUpdateUser } from "@/lib/hooks/users.hook";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Company,
  CompanyInsert,
  CompanyUpdate,
} from "@/lib/models/companies.model";
import { User, UserUpdate } from "@/lib/models/users.model";

export const Route = createFileRoute("/dashboard/profile/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(GetMyUserQueryOptions);
    queryClient.ensureQueryData(GetMyCompanyQueryOptions);
  },
  component: ProfilePage,
});

// Define validation schemas
const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  phone: z.string(),
});

const companyFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Business name must be at least 2 characters.",
    })
    .optional(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().nullable().optional(),
});

export default function ProfilePage() {
  const userQuery = useSuspenseQuery(GetMyUserQueryOptions);
  const userData: User | undefined = userQuery.data;

  const companyQuery = useSuspenseQuery(GetMyCompanyQueryOptions);
  const companyData: Company | undefined = companyQuery.data;

  const userForm = useForm<UserUpdate>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: userData?.name ?? "",
      email: userData?.email ?? "",
      city: userData?.city ?? "",
      phone: userData?.phone ?? "",
    },
  });

  const companyForm = useForm<CompanyUpdate>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: companyData?.name ?? "",
      address: companyData?.address ?? "",
      category: companyData?.category ?? "",
      description: companyData?.description ?? null,
    },
  });

  const updateUser = useUpdateUser();
  const updateCompany = useUpdateCompany();
  const createCompany = useCreateCompany();

  function onUserSubmit(data: UserUpdate) {
    updateUser.mutate(
      { id: userData?.id ?? 0, userData: data },
      {
        onSuccess: () => {
          toast("User information updated", {
            description: "Your user information has been successfully updated.",
          });
        },
        onError: () => {
          toast("Error", {
            description: "Failed to update user information. Please try again.",
          });
        },
      }
    );
  }

  function onCompanySubmit(data: CompanyInsert | CompanyUpdate) {
    if (companyData) {
      updateCompany.mutate(
        { id: String(companyData.id), companyData: data },
        {
          onSuccess: () => {
            toast("Business information updated", {
              description:
                "Your business information has been successfully updated.",
            });
          },
          onError: () => {
            toast("Error", {
              description:
                "Failed to update business information. Please try again.",
            });
          },
        }
      );
    } else {
      createCompany.mutate(data as CompanyInsert, {
        onSuccess: () => {
          toast("Business created", {
            description: "Your business has been successfully created.",
          });
        },
        onError: () => {
          toast("Error", {
            description: "Failed to create business. Please try again.",
          });
        },
      });
    }
  }

  // if (userLoading || companyLoading) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center">
  //       <p className="text-lg text-muted-foreground">
  //         Loading your profile information...
  //       </p>
  //     </div>
  //   );
  // }

  // Check if userData and companyData are defined
  if (!userData || !companyData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Unable to load your profile information. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        <Tabs defaultValue="user">
          <TabsList>
            <TabsTrigger value="user">User Information</TabsTrigger>
            <TabsTrigger value="company">Business Information</TabsTrigger>
            {/* <TabsTrigger value="branding">Appearance</TabsTrigger> */}
          </TabsList>

          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...userForm}>
                  <form
                    onSubmit={userForm.handleSubmit(onUserSubmit)}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="relative">
                            <LazyLoadImage
                              src="/placeholder.svg?height=128&width=128&text=Avatar"
                              alt="User avatar"
                              width={128}
                              height={128}
                              className="rounded-full object-cover"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground shadow-sm"
                            >
                              <CameraIcon className="h-4 w-4" />
                              <span className="sr-only">Upload avatar</span>
                            </Button>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Profile Picture
                          </span>
                        </div>

                        <div className="space-y-4 flex-1">
                          <FormField
                            control={userForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Full Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={userForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Email address"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <FormField
                        control={userForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={userForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Phone number"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Update your business information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...companyForm}>
                  <form
                    onSubmit={companyForm.handleSubmit(onCompanySubmit)}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="relative">
                            <LazyLoadImage
                              src="/placeholder.svg?height=128&width=128&text=Logo"
                              alt="Business logo"
                              width={128}
                              height={128}
                              className="rounded-lg object-cover"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground shadow-sm"
                            >
                              <CameraIcon className="h-4 w-4" />
                              <span className="sr-only">Upload logo</span>
                            </Button>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Business Logo
                          </span>
                        </div>

                        <div className="space-y-4 flex-1">
                          <FormField
                            control={companyForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Business name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={companyForm.control}
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
                                    <SelectItem value="beauty_salon">
                                      Beauty Salon
                                    </SelectItem>
                                    <SelectItem value="hair_salon">
                                      Hair Salon
                                    </SelectItem>
                                    <SelectItem value="barber">
                                      Barber
                                    </SelectItem>
                                    <SelectItem value="nail_salon">
                                      Nail Care
                                    </SelectItem>
                                    <SelectItem value="spa">
                                      Spa & Massage
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <FormField
                        control={companyForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Business address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={companyForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your business"
                                className="resize-none"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormDescription>
                              This description will be shown to your customers.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Working Hours
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            You can edit your working hours from the "Working
                            Hours" page.
                          </p>
                          <Button variant="outline" type="button" asChild>
                            <Link to="/dashboard/hours">
                              Edit Working Hours
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the appearance of your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Logo & Images</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="flex flex-col gap-2 items-center justify-center p-4 border rounded-md">
                        <div className="relative">
                          <Image
                            src="/placeholder.svg?height=80&width=80&text=Logo"
                            alt="Business logo"
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-sm"
                          >
                            <CameraIcon className="h-3 w-3" />
                            <span className="sr-only">Upload logo</span>
                          </Button>
                        </div>
                        <span className="text-sm">Logo</span>
                      </div>

                      <div className="flex flex-col gap-2 items-center justify-center p-4 border rounded-md">
                        <div className="relative">
                          <Image
                            src="/placeholder.svg?height=80&width=80&text=Cover"
                            alt="Cover image"
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-sm"
                          >
                            <CameraIcon className="h-3 w-3" />
                            <span className="sr-only">Upload cover</span>
                          </Button>
                        </div>
                        <span className="text-sm">Cover Image</span>
                      </div>

                      <div className="flex flex-col gap-2 items-center justify-center p-4 border rounded-md">
                        <div className="relative">
                          <Image
                            src="/placeholder.svg?height=80&width=80&text=Favicon"
                            alt="Favicon"
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-sm"
                          >
                            <CameraIcon className="h-3 w-3" />
                            <span className="sr-only">Upload favicon</span>
                          </Button>
                        </div>
                        <span className="text-sm">Favicon</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Colors</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-500"></div>
                        <span className="text-sm mt-1">Primary Color</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-700"></div>
                        <span className="text-sm mt-1">Secondary Color</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-100"></div>
                        <span className="text-sm mt-1">Background</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-900"></div>
                        <span className="text-sm mt-1">Text</span>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Customize Colors
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </main>
    </div>
  );
}
