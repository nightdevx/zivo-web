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
import { User, UserInsert } from "@/lib/models/users.model";
import { useRegister } from "@/lib/hooks/auth.hook";
import { toast } from "sonner";
export const Route = createFileRoute("/(auth)/register/")({
  component: RegisterPage,
});

// Form şeması
const userFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "İsim en az 2 karakter olmalıdır.",
    }),
    email: z.string().email({
      message: "Lütfen geçerli bir e-posta adresi girin.",
    }),
    city: z.string().min(2, {
      message: "Şehir bilgisi gereklidir.",
    }),
    phone: z.string().optional(),
    password: z.string().min(8, {
      message: "Şifre en az 8 karakter olmalıdır.",
    }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "Kullanım şartlarını kabul etmelisiniz.",
    }),
    type: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
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

    // Kullanıcı tipini form verilerine ekle ve confirmPassword alanını çıkar
    const { confirmPassword, ...userData } = values;
    const userPayload: Omit<UserInsert, "id" | "created_at"> = {
      ...userData,
      type: userType,
      phone: values.phone || null,
    };

    // Kullanıcıyı oluştur
    register(userPayload, {
      onSuccess: () => {
        setIsLoading(false);
        toast.success("Kayıt başarılı! Giriş yapabilirsiniz.");
        navigator({ to: "/login" });
      },
      onError: (error) => {
        setIsLoading(false);
        toast.error("Kayıt hatası! Lütfen tekrar deneyin.");
        console.error("Kayıt hatası:", error);
      },
    });
  }

  // Kullanıcı tipi değiştiğinde form değerini güncelle
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
          <CardTitle className="text-2xl gradient-text">Kayıt Ol</CardTitle>
          <CardDescription>Beauty Manager hesabı oluşturun</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="customer" onValueChange={handleUserTypeChange}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Müşteri
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Salon / İşletme
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
                        {userType === "customer" ? "Ad Soyad" : "İşletme Adı"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            userType === "customer"
                              ? "Ayşe Yılmaz"
                              : "Güzellik Salonu & Spa"
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
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            userType === "customer"
                              ? "ornek@email.com"
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
                        <FormLabel>Şehir</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="İstanbul"
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
                        <FormLabel>Telefon (İsteğe Bağlı)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+90 555 123 4567"
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
                      <FormLabel>Şifre</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="elegant-input"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        En az 8 karakter olmalıdır.
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
                      <FormLabel>Şifre Tekrar</FormLabel>
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
                            <Link
                              to="/"
                              className="text-primary-600 hover:underline"
                            >
                              Kullanım şartlarını
                            </Link>{" "}
                            ve{" "}
                            <Link
                              to="/"
                              className="text-primary-600 hover:underline"
                            >
                              Gizlilik politikasını
                            </Link>{" "}
                            kabul ediyorum.
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
                  {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
                </Button>
              </form>
            </Form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6">
          <div className="text-sm text-slate-600">
            Zaten hesabınız var mı?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Giriş Yap
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
