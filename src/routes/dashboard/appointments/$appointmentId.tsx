"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  Clock,
  Edit,
  ArrowLeft,
  Phone,
  Mail,
  User,
  MessageSquare,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/appointments/$appointmentId")({
  component: AppointmentDetailPage,
});

// Combined appointment data from both sources
const allAppointments = [
  {
    id: 1,
    client: "Ayşe Yılmaz",
    phone: "+90 555 123 4567",
    service: "Haircut & Blow Dry",
    date: "April 15, 2025",
    time: "10:00 - 11:30",
    status: "confirmed",
    staff: "Zehra",
    initials: "AY",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ayse@example.com",
    notes: "Has split ends, requires special care.",
    history: [
      {
        date: "March 1, 2025",
        service: "Haircut & Blow Dry",
        staff: "Zehra",
        notes: "Preferred a short style.",
      },
      {
        date: "January 15, 2025",
        service: "Hair Coloring",
        staff: "Zehra",
        notes: "Preferred light brown tones.",
      },
    ],
  },
  {
    id: 2,
    client: "Mehmet Demir",
    phone: "+90 555 234 5678",
    service: "Beard Trim",
    date: "April 15, 2025",
    time: "12:00 - 13:00",
    status: "confirmed",
    staff: "Ahmet",
    initials: "MD",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "mehmet@example.com",
    notes: "Prefers angular beard shape.",
    history: [
      {
        date: "March 20, 2025",
        service: "Beard Trim & Haircut",
        staff: "Ahmet",
        notes: "Short sides, long top.",
      },
    ],
  },
  {
    id: 3,
    client: "Zeynep Kaya",
    phone: "+90 555 345 6789",
    service: "Hair Coloring, Hair Care, Blow Dry",
    date: "April 15, 2025",
    time: "14:00 - 15:30",
    status: "pending",
    staff: "Zehra",
    initials: "ZK",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "zeynep@example.com",
    notes: "Prefers light brown tones.",
    history: [
      {
        date: "March 5, 2025",
        service: "Hair Care",
        staff: "Zehra",
        notes: "Complains about hair loss.",
      },
      {
        date: "February 10, 2025",
        service: "Hair Coloring",
        staff: "Zehra",
        notes: "Preferred dark brown.",
      },
    ],
  },
  {
    id: 4,
    client: "Fatma Şahin",
    phone: "+90 555 456 7890",
    service: "Manicure & Pedicure, Nail Extensions",
    date: "April 15, 2025",
    time: "16:00 - 17:30",
    status: "pending",
    staff: "Selin",
    initials: "FŞ",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "fatma@example.com",
    notes: "Prefers long oval nail shape.",
    history: [
      {
        date: "March 15, 2025",
        service: "Manicure",
        staff: "Selin",
        notes: "Preferred red nail polish.",
      },
    ],
  },
  {
    id: 5,
    client: "Ahmet Koç",
    phone: "+90 555 567 8901",
    service: "Haircut",
    date: "April 8, 2025",
    time: "11:00 - 12:00",
    status: "completed",
    staff: "Ahmet",
    initials: "AK",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ahmet@example.com",
    notes: "",
    history: [],
  },
  {
    id: 6,
    client: "Sevgi Öztürk",
    phone: "+90 555 678 9012",
    service: "Hair Coloring & Care, Blow Dry, Hair Mask",
    date: "April 7, 2025",
    time: "14:00 - 16:30",
    status: "completed",
    staff: "Zehra",
    initials: "SÖ",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "sevgi@example.com",
    notes: "Complains about hair loss.",
    history: [
      {
        date: "March 7, 2025",
        service: "Hair Care",
        staff: "Zehra",
        notes: "Complains about hair loss.",
      },
    ],
  },
  {
    id: 7,
    client: "Emir Yıldız",
    phone: "+90 555 789 0123",
    service: "Beard Styling",
    date: "April 5, 2025",
    time: "10:30 - 11:30",
    status: "completed",
    staff: "Ahmet",
    initials: "EY",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "emir@example.com",
    notes: "",
    history: [],
  },
  {
    id: 8,
    client: "Deniz Korkmaz",
    phone: "+90 555 890 1234",
    service: "Facial Care, Skin Cleaning, Mask Application",
    date: "April 3, 2025",
    time: "13:00 - 14:00",
    status: "cancelled",
    staff: "Selin",
    initials: "DK",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "deniz@example.com",
    notes: "Complains about dry skin.",
    history: [
      {
        date: "March 3, 2025",
        service: "Skin Cleaning",
        staff: "Selin",
        notes: "Has acne problems.",
      },
    ],
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "confirmed") {
    return (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
      >
        Confirmed
      </Badge>
    );
  } else if (status === "pending") {
    return (
      <Badge
        variant="outline"
        className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
      >
        Pending
      </Badge>
    );
  } else if (status === "completed") {
    return (
      <Badge
        variant="outline"
        className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
      >
        Completed
      </Badge>
    );
  } else if (status === "cancelled") {
    return (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
      >
        Cancelled
      </Badge>
    );
  } else if (status === "rejected") {
    return (
      <Badge
        variant="outline"
        className="bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200"
      >
        Rejected
      </Badge>
    );
  }

  return <Badge variant="outline">{status}</Badge>;
}

function AppointmentDetailPage() {
  const appointmentId = Route.useParams().appointmentId;
  const navigator = Route.useNavigate();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the appointment by ID
    const id = Number(appointmentId);
    const foundAppointment = allAppointments.find((a) => a.id === id);

    if (foundAppointment) {
      setAppointment(foundAppointment);
    } else {
      // Handle not found
      navigator({ to: "/dashboard/appointments" });
    }

    setLoading(false);
  }, [appointmentId, navigator]);

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
          <Link to="/dashboard/appointments">Back to Appointments</Link>
        </Button>
      </div>
    );
  }

  // Normalize data structure between different sources
  const client = appointment.client || appointment.customer;
  const email =
    appointment.email ||
    (appointment.customerInfo ? appointment.customerInfo.email : "");
  const phone =
    appointment.phone ||
    (appointment.customerInfo ? appointment.customerInfo.phone : "");
  const notes =
    appointment.notes ||
    (appointment.customerInfo ? appointment.customerInfo.notes : "");
  const initials = appointment.initials || client.substring(0, 2).toUpperCase();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard/appointments">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Appointment Details</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link
                to={`/dashboard/appointments/edit/$appointmentId`}
                params={{ appointmentId: appointment.id }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={appointment.avatar} alt={client} />
                  <AvatarFallback className="text-xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{client}</h3>
                  <StatusBadge status={appointment.status} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{email}</span>
                </div>
                <Separator />
                {notes && (
                  <div className="pt-2">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Notes
                    </h4>
                    <p className="text-sm border rounded-md p-3 bg-muted/50">
                      {notes}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Date:</span>
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Time:</span>
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Staff:</span>
                  <span>{appointment.staff}</span>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Services
                  </h4>
                  <div className="space-y-2">
                    {appointment.service
                      .split(", ")
                      .map((service: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          <span>{service}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="mt-4">
          <TabsList>
            <TabsTrigger value="history">Past Appointments</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointment History</CardTitle>
              </CardHeader>
              <CardContent>
                {appointment.history && appointment.history.length > 0 ? (
                  <div className="space-y-4">
                    {appointment.history.map((item: any, index: number) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{item.date}</h4>
                          <Badge variant="outline">{item.service}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Staff: {item.staff}
                        </div>
                        {item.notes && (
                          <div className="mt-2 text-sm">{item.notes}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No past appointments found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {notes ? (
                  <div className="border rounded-md p-4">
                    <p>{notes}</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No notes available for this client.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
