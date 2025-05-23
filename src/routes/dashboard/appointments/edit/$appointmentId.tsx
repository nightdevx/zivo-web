import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute(
  "/dashboard/appointments/edit/$appointmentId"
)({
  component: EditAppointmentPage,
});

// Reuse the same appointment data from the detail page
const allAppointments = [
  {
    id: 1,
    client: "Ayşe Yılmaz",
    phone: "+90 555 123 4567",
    service: "Saç Kesimi & Fön",
    date: "15 Nisan 2025",
    time: "10:00 - 11:30",
    status: "confirmed",
    staff: "Zehra",
    initials: "AY",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ayse@example.com",
    notes: "Saç uçlarında kırıklar var, özel bakım istiyor.",
  },
  {
    id: 2,
    client: "Mehmet Demir",
    phone: "+90 555 234 5678",
    service: "Sakal Tıraşı",
    date: "15 Nisan 2025",
    time: "12:00 - 13:00",
    status: "confirmed",
    staff: "Ahmet",
    initials: "MD",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "mehmet@example.com",
    notes: "Köşeli sakal şekli istiyor.",
  },
  // Add more appointments as needed
];

const formSchema = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  phone: z.string().min(5, {
    message: "Phone number is required.",
  }),
  email: z.string().email().optional(),
  service: z.string({
    required_error: "Please select a service.",
  }),
  date: z.date({
    required_error: "Appointment date is required.",
  }),
  time: z.string({
    required_error: "Please select a time slot.",
  }),
  staff: z.string({
    required_error: "Please select a staff member.",
  }),
  notes: z.string().optional(),
  status: z.string(),
});

function EditAppointmentPage() {
  const navigator = Route.useNavigate();
  const appointmentId = Route.useParams().appointmentId;
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      phone: "",
      email: "",
      service: "",
      date: new Date(),
      time: "",
      staff: "",
      notes: "",
      status: "confirmed",
    },
  });

  useEffect(() => {
    // Find the appointment by ID
    const id = Number(appointmentId);
    const foundAppointment = allAppointments.find((a) => a.id === id);

    if (foundAppointment) {
      setAppointment(foundAppointment);

      // Parse the date string to a Date object
      const dateParts = foundAppointment.date.split(" ");
      const day = Number.parseInt(dateParts[0]);
      const monthNames = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ];
      const month = monthNames.indexOf(dateParts[1]);
      const year = Number.parseInt(dateParts[2]);
      const appointmentDate = new Date(year, month, day);

      // Set form values
      form.reset({
        clientName: foundAppointment.client,
        phone: foundAppointment.phone,
        email: foundAppointment.email,
        service: foundAppointment.service,
        date: appointmentDate,
        time: foundAppointment.time.split(" - ")[0],
        staff: foundAppointment.staff,
        notes: foundAppointment.notes,
        status: foundAppointment.status,
      });
    } else {
      // Handle not found
      navigator({
        to: "/dashboard/appointments",
        search: { error: "Appointment not found" },
      });
    }

    setLoading(false);
  }, [appointmentId, form, navigator]);

  function onSubmit(_: z.infer<typeof formSchema>) {
    toast("Appointment updated", {
      description: "Appointment details have been successfully updated.",
    });

    // In a real app, you would update the appointment in the database
    // For now, just redirect back to the appointment details
    navigator({
      to: `/dashboard/appointments/${appointmentId}`,
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (!appointment) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <p>Appointment not found.</p>
        <Button asChild className="mt-4">
          <Link to="/dashboard/appointments">Return to Appointments</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link
              to={`/dashboard/appointments/$appointmentId`}
              params={{ appointmentId }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Appointment</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Edit the details of the appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter client name" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+90 555 123 4567" {...field} />
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
                        <FormLabel>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter service name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: tr })
                                ) : (
                                  <span>Select a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="09:00">09:00 - 10:00</SelectItem>
                            <SelectItem value="10:00">10:00 - 11:00</SelectItem>
                            <SelectItem value="11:00">11:00 - 12:00</SelectItem>
                            <SelectItem value="12:00">12:00 - 13:00</SelectItem>
                            <SelectItem value="13:00">13:00 - 14:00</SelectItem>
                            <SelectItem value="14:00">14:00 - 15:00</SelectItem>
                            <SelectItem value="15:00">15:00 - 16:00</SelectItem>
                            <SelectItem value="16:00">16:00 - 17:00</SelectItem>
                            <SelectItem value="17:00">17:00 - 18:00</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="staff"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Staff</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a staff member" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Zehra">Zehra</SelectItem>
                            <SelectItem value="Ahmet">Ahmet</SelectItem>
                            <SelectItem value="Selin">Selin</SelectItem>
                            <SelectItem value="Mehmet">Mehmet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add special notes about the appointment"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button" asChild>
                    <Link
                      to={`/dashboard/appointments/$appointmentId`}
                      params={{ appointmentId }}
                    >
                      Cancel
                    </Link>
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
