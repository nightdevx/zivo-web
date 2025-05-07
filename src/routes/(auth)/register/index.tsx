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
import { Scissors, Building2 } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useRegister } from "@/lib/hooks/auth.hook";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCompany } from "@/lib/hooks/companies.hook";

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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const companyFormSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address is required.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  description: z.string().nullable(),
});

type UserFormValues = z.infer<typeof userFormSchema>;
type CompanyFormValues = z.infer<typeof companyFormSchema>;

export default function RegisterPage() {
  const navigator = Route.useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  // Create separate instances of the forms
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const companyForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      address: "",
      category: "",
      description: null,
    },
  });

  const register = useRegister();
  const createCompany = useCreateCompany();

  function onUserFormSubmit() {
    // Completely reset the company form to ensure no data persists
    companyForm.reset({
      name: "",
      address: "",
      category: "",
      description: null,
    });

    // Move to next step
    setStep(2);
  }

  function onCompanyFormSubmit(values: CompanyFormValues) {
    setIsLoading(true);

    const userData = userForm.getValues();
    const { confirmPassword, ...userPayload } = userData;

    register.mutate(
      { ...userPayload, phone: userPayload.phone ?? null, type: "company" },
      {
        onSuccess: (id) => {
          setIsLoading(false);
          createCompany.mutate(
            { ...values, user_id: id },
            {
              onSuccess: () => {
                setIsLoading(false);
                toast.success("Registration successful!");
                navigator({ to: "/login" });
              },
              onError: (error) => {
                setIsLoading(false);
                toast.error("Failed to create company! Please try again.");
                console.error("Company creation error:", error);
              },
            }
          );
        },
        onError: (error) => {
          setIsLoading(false);
          toast.error("Registration failed! Please try again.");
          console.error("Registration error:", error);
        },
      }
    );
  }

  const goBack = () => {
    setStep(1);
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
          <CardTitle className="text-2xl gradient-text">
            Salon Registration
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Step 1: Create your account"
              : "Step 2: Tell us about your salon"}
          </CardDescription>
          {step === 2 && (
            <div className="flex items-center justify-center mt-2">
              <Building2 className="h-5 w-5 text-primary-600 mr-2" />
              <span className="text-sm font-medium">Salon Information</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <Form {...userForm}>
              <form
                onSubmit={userForm.handleSubmit(onUserFormSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={userForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jane Doe"
                          className="elegant-input"
                          {...field}
                        />
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
                          placeholder="info@salon.com"
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
                    control={userForm.control}
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
                    control={userForm.control}
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
                  control={userForm.control}
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
                  control={userForm.control}
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
                  control={userForm.control}
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
                <Button type="submit" className="w-full primary-button">
                  Continue to Salon Details
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...companyForm}>
              <form
                key="company-form"
                onSubmit={companyForm.handleSubmit(onCompanyFormSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={companyForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salon Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Beauty Salon & Spa"
                          className="elegant-input"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={companyForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St, Suite 100"
                          className="elegant-input"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
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
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="elegant-input">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hair_salon">Hair Salon</SelectItem>
                          <SelectItem value="nail_salon">Nail Salon</SelectItem>
                          <SelectItem value="spa">Spa & Wellness</SelectItem>
                          <SelectItem value="barber">Barber Shop</SelectItem>
                          <SelectItem value="beauty_salon">
                            Beauty Salon
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={companyForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your salon..."
                          className="elegant-input min-h-[100px]"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-1/3"
                    onClick={goBack}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-2/3 primary-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Complete Registration"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
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
