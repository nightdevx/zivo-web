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
    service: "Saç Kesimi & Fön",
    date: "15 Nisan 2025",
    time: "10:00 - 11:30",
    status: "confirmed",
    staff: "Zehra",
    initials: "AY",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ayse@example.com",
    notes: "Saç uçlarında kırıklar var, özel bakım istiyor.",
    history: [
      {
        date: "1 Mart 2025",
        service: "Saç Kesimi & Fön",
        staff: "Zehra",
        notes: "Kısa model tercih etti.",
      },
      {
        date: "15 Ocak 2025",
        service: "Saç Boyama",
        staff: "Zehra",
        notes: "Açık kahve tonları tercih etti.",
      },
    ],
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
    history: [
      {
        date: "20 Mart 2025",
        service: "Sakal Tıraşı & Saç Kesimi",
        staff: "Ahmet",
        notes: "Yanlar kısa, üst kısım uzun.",
      },
    ],
  },
  {
    id: 3,
    client: "Zeynep Kaya",
    phone: "+90 555 345 6789",
    service: "Saç Boyama, Saç Bakımı, Fön",
    date: "15 Nisan 2025",
    time: "14:00 - 15:30",
    status: "pending",
    staff: "Zehra",
    initials: "ZK",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "zeynep@example.com",
    notes: "Açık kahve tonları tercih ediyor.",
    history: [
      {
        date: "5 Mart 2025",
        service: "Saç Bakımı",
        staff: "Zehra",
        notes: "Saç dökülmesi şikayeti var.",
      },
      {
        date: "10 Şubat 2025",
        service: "Saç Boyama",
        staff: "Zehra",
        notes: "Koyu kahve tercih etti.",
      },
    ],
  },
  {
    id: 4,
    client: "Fatma Şahin",
    phone: "+90 555 456 7890",
    service: "Manikür & Pedikür, Protez Tırnak",
    date: "15 Nisan 2025",
    time: "16:00 - 17:30",
    status: "pending",
    staff: "Selin",
    initials: "FŞ",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "fatma@example.com",
    notes: "Uzun oval tırnak şekli tercih ediyor.",
    history: [
      {
        date: "15 Mart 2025",
        service: "Manikür",
        staff: "Selin",
        notes: "Kırmızı oje tercih etti.",
      },
    ],
  },
  {
    id: 5,
    client: "Ahmet Koç",
    phone: "+90 555 567 8901",
    service: "Saç Kesimi",
    date: "8 Nisan 2025",
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
    service: "Saç Boyama & Bakım, Fön, Saç Maskesi",
    date: "7 Nisan 2025",
    time: "14:00 - 16:30",
    status: "completed",
    staff: "Zehra",
    initials: "SÖ",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "sevgi@example.com",
    notes: "Saç dökülmesi şikayeti var.",
    history: [
      {
        date: "7 Mart 2025",
        service: "Saç Bakımı",
        staff: "Zehra",
        notes: "Saç dökülmesi şikayeti var.",
      },
    ],
  },
  {
    id: 7,
    client: "Emir Yıldız",
    phone: "+90 555 789 0123",
    service: "Sakal Şekillendirme",
    date: "5 Nisan 2025",
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
    service: "Yüz Bakımı, Cilt Temizliği, Maske Uygulaması",
    date: "3 Nisan 2025",
    time: "13:00 - 14:00",
    status: "cancelled",
    staff: "Selin",
    initials: "DK",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "deniz@example.com",
    notes: "Cilt kuruluğu şikayeti var.",
    history: [
      {
        date: "3 Mart 2025",
        service: "Cilt Temizliği",
        staff: "Selin",
        notes: "Akne problemi var.",
      },
    ],
  },
  // Add staff appointments data
  {
    id: 101,
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
    history: [
      {
        date: "1 Mart 2025",
        service: "Saç Kesimi & Fön",
        staff: "Zehra",
        notes: "Kısa model tercih etti.",
      },
    ],
    customer: "Ayşe Yılmaz",
    customerInfo: {
      phone: "+90 555 123 4567",
      email: "ayse@example.com",
      notes: "Saç uçlarında kırıklar var, özel bakım istiyor.",
    },
  },
  {
    id: 102,
    client: "Fatma Şahin",
    phone: "+90 555 234 5678",
    service: "Saç Boyama, Saç Bakımı, Fön",
    date: "15 Nisan 2025",
    time: "13:00 - 14:30",
    status: "confirmed",
    staff: "Zehra",
    initials: "FŞ",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "fatma@example.com",
    notes: "Açık kahve tonları tercih ediyor.",
    history: [
      {
        date: "15 Mart 2025",
        service: "Saç Bakımı",
        staff: "Zehra",
        notes: "Saç dökülmesi şikayeti var.",
      },
    ],
    customer: "Fatma Şahin",
    customerInfo: {
      phone: "+90 555 234 5678",
      email: "fatma@example.com",
      notes: "Açık kahve tonları tercih ediyor.",
    },
  },
  {
    id: 103,
    client: "Zeynep Kaya",
    phone: "+90 555 345 6789",
    service: "Fön",
    date: "16 Nisan 2025",
    time: "11:00 - 12:00",
    status: "pending",
    staff: "Zehra",
    initials: "ZK",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "zeynep@example.com",
    notes: "",
    history: [
      { date: "16 Mart 2025", service: "Fön", staff: "Zehra", notes: "" },
    ],
    customer: "Zeynep Kaya",
    customerInfo: {
      phone: "+90 555 345 6789",
      email: "zeynep@example.com",
      notes: "",
    },
  },
  {
    id: 104,
    client: "Elif Demir",
    phone: "+90 555 456 7890",
    service: "Saç Bakımı, Saç Maskesi, Fön",
    date: "17 Nisan 2025",
    time: "14:00 - 15:30",
    status: "confirmed",
    staff: "Zehra",
    initials: "ED",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "elif@example.com",
    notes: "Saç dökülmesi şikayeti var.",
    history: [
      {
        date: "17 Mart 2025",
        service: "Saç Bakımı",
        staff: "Zehra",
        notes: "Saç dökülmesi şikayeti var.",
      },
    ],
    customer: "Elif Demir",
    customerInfo: {
      phone: "+90 555 456 7890",
      email: "elif@example.com",
      notes: "Saç dökülmesi şikayeti var.",
    },
  },
  {
    id: 201,
    client: "Mehmet Demir",
    phone: "+90 555 567 8901",
    service: "Sakal Tıraşı",
    date: "15 Nisan 2025",
    time: "09:30 - 10:00",
    status: "confirmed",
    staff: "Ahmet",
    initials: "MD",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "mehmet@example.com",
    notes: "Köşeli sakal şekli istiyor.",
    history: [
      {
        date: "15 Mart 2025",
        service: "Sakal Tıraşı",
        staff: "Ahmet",
        notes: "Köşeli sakal şekli istiyor.",
      },
    ],
    customer: "Mehmet Demir",
    customerInfo: {
      phone: "+90 555 567 8901",
      email: "mehmet@example.com",
      notes: "Köşeli sakal şekli istiyor.",
    },
  },
  {
    id: 202,
    client: "Ali Yıldız",
    phone: "+90 555 678 9012",
    service: "Erkek Saç Kesimi, Sakal Şekillendirme",
    date: "15 Nisan 2025",
    time: "11:00 - 12:00",
    status: "confirmed",
    staff: "Ahmet",
    initials: "AY",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ali@example.com",
    notes: "Yanlar kısa, üst kısım uzun olacak.",
    history: [
      {
        date: "15 Mart 2025",
        service: "Erkek Saç Kesimi",
        staff: "Ahmet",
        notes: "Yanlar kısa, üst kısım uzun olacak.",
      },
    ],
    customer: "Ali Yıldız",
    customerInfo: {
      phone: "+90 555 678 9012",
      email: "ali@example.com",
      notes: "Yanlar kısa, üst kısım uzun olacak.",
    },
  },
  {
    id: 203,
    client: "Ahmet Kara",
    phone: "+90 555 789 0123",
    service: "Sakal Tıraşı",
    date: "16 Nisan 2025",
    time: "10:00 - 10:30",
    status: "pending",
    staff: "Ahmet",
    initials: "AK",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ahmet@example.com",
    notes: "",
    history: [
      {
        date: "16 Mart 2025",
        service: "Sakal Tıraşı",
        staff: "Ahmet",
        notes: "",
      },
    ],
    customer: "Ahmet Kara",
    customerInfo: {
      phone: "+90 555 789 0123",
      email: "ahmet@example.com",
      notes: "",
    },
  },
  {
    id: 301,
    client: "Ayşe Yılmaz",
    phone: "+90 555 123 4567",
    service: "Manikür",
    date: "15 Nisan 2025",
    time: "10:00 - 11:00",
    status: "confirmed",
    staff: "Selin",
    initials: "AY",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ayse@example.com",
    notes: "Pastel tonlarda oje istiyor.",
    history: [
      {
        date: "15 Mart 2025",
        service: "Manikür",
        staff: "Selin",
        notes: "Pastel tonlarda oje istiyor.",
      },
    ],
    customer: "Ayşe Yılmaz",
    customerInfo: {
      phone: "+90 555 123 4567",
      email: "ayse@example.com",
      notes: "Pastel tonlarda oje istiyor.",
    },
  },
  {
    id: 302,
    client: "Zeynep Kaya",
    phone: "+90 555 345 6789",
    service: "Manikür & Pedikür, Protez Tırnak",
    date: "15 Nisan 2025",
    time: "14:00 - 15:30",
    status: "confirmed",
    staff: "Selin",
    initials: "ZK",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "zeynep@example.com",
    notes: "Özel tasarım istiyor.",
    history: [
      {
        date: "15 Mart 2025",
        service: "Manikür",
        staff: "Selin",
        notes: "Özel tasarım istiyor.",
      },
    ],
    customer: "Zeynep Kaya",
    customerInfo: {
      phone: "+90 555 345 6789",
      email: "zeynep@example.com",
      notes: "Özel tasarım istiyor.",
    },
  },
  {
    id: 303,
    client: "Fatma Şahin",
    phone: "+90 555 234 5678",
    service: "Protez Tırnak",
    date: "16 Nisan 2025",
    time: "13:00 - 14:00",
    status: "pending",
    staff: "Selin",
    initials: "FŞ",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "fatma@example.com",
    notes: "Uzun oval tırnak şekli tercih ediyor.",
    history: [
      {
        date: "16 Mart 2025",
        service: "Protez Tırnak",
        staff: "Selin",
        notes: "Uzun oval tırnak şekli tercih ediyor.",
      },
    ],
    customer: "Fatma Şahin",
    customerInfo: {
      phone: "+90 555 234 5678",
      email: "fatma@example.com",
      notes: "Uzun oval tırnak şekli tercih ediyor.",
    },
  },
  {
    id: 401,
    client: "Zeynep Kaya",
    phone: "+90 555 345 6789",
    service: "Yüz Bakımı, Cilt Temizliği, Maske Uygulaması",
    date: "18 Nisan 2025",
    time: "10:00 - 11:00",
    status: "confirmed",
    staff: "Mehmet",
    initials: "ZK",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "zeynep@example.com",
    notes: "Cilt kuruluğu şikayeti var.",
    history: [
      {
        date: "18 Mart 2025",
        service: "Cilt Temizliği",
        staff: "Mehmet",
        notes: "Cilt kuruluğu şikayeti var.",
      },
    ],
    customer: "Zeynep Kaya",
    customerInfo: {
      phone: "+90 555 345 6789",
      email: "zeynep@example.com",
      notes: "Cilt kuruluğu şikayeti var.",
    },
  },
  {
    id: 402,
    client: "Ayşe Yılmaz",
    phone: "+90 555 123 4567",
    service: "Cilt Temizliği",
    date: "19 Nisan 2025",
    time: "14:00 - 15:00",
    status: "pending",
    staff: "Mehmet",
    initials: "AY",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ayse@example.com",
    notes: "Akne problemi var.",
    history: [
      {
        date: "19 Mart 2025",
        service: "Cilt Temizliği",
        staff: "Mehmet",
        notes: "Akne problemi var.",
      },
    ],
    customer: "Ayşe Yılmaz",
    customerInfo: {
      phone: "+90 555 123 4567",
      email: "ayse@example.com",
      notes: "Akne problemi var.",
    },
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "confirmed") {
    return (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
      >
        Onaylı
      </Badge>
    );
  } else if (status === "pending") {
    return (
      <Badge
        variant="outline"
        className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
      >
        Bekliyor
      </Badge>
    );
  } else if (status === "completed") {
    return (
      <Badge
        variant="outline"
        className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
      >
        Tamamlandı
      </Badge>
    );
  } else if (status === "cancelled") {
    return (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
      >
        İptal Edildi
      </Badge>
    );
  } else if (status === "rejected") {
    return (
      <Badge
        variant="outline"
        className="bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200"
      >
        Reddedildi
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
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <p>Randevu bulunamadı.</p>
        <Button asChild className="mt-4">
          <Link to="/dashboard/appointments">Randevulara Dön</Link>
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
          <h1 className="text-2xl font-bold">Randevu Detayları</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to={`/dashboard/appointments/edit/${appointment.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Düzenle
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Müşteri Bilgileri</CardTitle>
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
                      Notlar
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
              <CardTitle>Randevu Detayları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Tarih:</span>
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Saat:</span>
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Personel:</span>
                  <span>{appointment.staff}</span>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Hizmetler
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
            <TabsTrigger value="history">Geçmiş Randevular</TabsTrigger>
            <TabsTrigger value="notes">Notlar</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Randevu Geçmişi</CardTitle>
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
                          Personel: {item.staff}
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
                    <p>Geçmiş randevu bulunamadı.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Müşteri Notları</CardTitle>
              </CardHeader>
              <CardContent>
                {notes ? (
                  <div className="border rounded-md p-4">
                    <p>{notes}</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Bu müşteri için not bulunmamaktadır.</p>
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
