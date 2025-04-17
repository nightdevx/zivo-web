import { useState } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Scissors, Building2, User as UserIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, createFileRoute } from "@tanstack/react-router";
import { UserInsert } from "@/lib/models/users.model";
import { useRegister } from "@/lib/hooks/auth.hook";
import { toast } from "sonner";

export const Route = createFileRoute("/(auth)/register/")({
  component: RegisterPage,
});

const userFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    city: z.string().min(2, {
      message: "City is required.",
    }),
    phone: z.string().optional(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
    type: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type UserFormValues = z.infer<typeof userFormSchema>;

export default function RegisterPage() {
  const navigator = Route.useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"customer" | "company">("customer");

  const { mutate: register } = useRegister();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
      type: "customer",
    },
  });
  function onSubmit(values: UserFormValues) {
    setIsLoading(true);

    const { confirmPassword, ...userData } = values;
    const userPayload: Omit<UserInsert, "id" | "created_at"> = {
      ...userData,
      type: userType,
      phone: values.phone || null,
    };

    register(userPayload, {
      onSuccess: () => {
        setIsLoading(false);
        toast.success("Registration successful! You can now log in.");
        navigator({ to: "/login" });
      },
      onError: (error) => {
        setIsLoading(false);
        toast.error("Registration failed! Please try again.");
        console.error("Registration error:", error);
      },
    });
  }

  const handleUserTypeChange = (value: string) => {
    setUserType(value as "customer" | "company");
    form.setValue("type", value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-radial from-white to-slate-50 p-4">
      <Card className="mx-auto max-w-md w-full elegant-card">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary-50 p-2">
              <Scissors className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <CardTitle className="text-2xl gradient-text">Sign Up</CardTitle>
          <CardDescription>Create a Beauty Manager account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="customer" onValueChange={handleUserTypeChange}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Customer
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Salon / Business
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {userType === "customer"
                          ? "Full Name"
                          : "Company Owner Name"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            userType === "customer"
                              ? "Jane Doe"
                              : "Beauty Salon & Spa"
                          }
                          className="elegant-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            userType === "customer"
                              ? "example@email.com"
                              : "info@salon.com"
                          }
                          className="elegant-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="New York"
                            className="elegant-input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 555 123 4567"
                            className="elegant-input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="elegant-input"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Must be at least 8 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="elegant-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          <span>
                            I accept the{" "}
                            <Link
                              to="/"
                              className="text-primary-600 hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/"
                              className="text-primary-600 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                            .
                          </span>
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full primary-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6">
          <div className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Log In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
