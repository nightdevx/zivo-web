// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Search, Edit, Trash2, Clock, CalendarDays } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";
// import { MultiSelect } from "@/components/multi-select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Link } from "@tanstack/react-router";
// import { createFileRoute } from "@tanstack/react-router";

// export const Route = createFileRoute("/dashboard/employees/")({
//   component: StaffPage,
// });

// // Available services in the salon
// const availableServices = [
//   { value: "haircut", label: "Saç Kesimi" },
//   { value: "coloring", label: "Saç Boyama" },
//   { value: "styling", label: "Fön" },
//   { value: "treatment", label: "Saç Bakımı" },
//   { value: "beard", label: "Sakal Tıraşı" },
//   { value: "manicure", label: "Manikür" },
//   { value: "pedicure", label: "Pedikür" },
//   { value: "nailExt", label: "Protez Tırnak" },
//   { value: "facial", label: "Yüz Bakımı" },
//   { value: "skinCleaning", label: "Cilt Temizliği" },
//   { value: "makeup", label: "Makyaj" },
//   { value: "bridal", label: "Gelin Makyajı" },
// ];

// // Update the staffAppointments data to include multiple services for some appointments
// const staffAppointments = {
//   1: [
//     {
//       id: 101,
//       date: "15 Nisan 2025",
//       time: "10:00 - 11:30",
//       customer: "Ayşe Yılmaz",
//       service: "Saç Kesimi & Fön",
//       status: "confirmed",
//       customerInfo: {
//         phone: "+90 555 123 4567",
//         email: "ayse@example.com",
//         notes: "Saç uçlarında kırıklar var, özel bakım istiyor.",
//       },
//     },
//     {
//       id: 102,
//       date: "15 Nisan 2025",
//       time: "13:00 - 14:30",
//       customer: "Fatma Şahin",
//       service: "Saç Boyama, Saç Bakımı, Fön",
//       status: "confirmed",
//       customerInfo: {
//         phone: "+90 555 234 5678",
//         email: "fatma@example.com",
//         notes: "Açık kahve tonları tercih ediyor.",
//       },
//     },
//     {
//       id: 103,
//       date: "16 Nisan 2025",
//       time: "11:00 - 12:00",
//       customer: "Zeynep Kaya",
//       service: "Fön",
//       status: "pending",
//       customerInfo: {
//         phone: "+90 555 345 6789",
//         email: "zeynep@example.com",
//         notes: "",
//       },
//     },
//     {
//       id: 104,
//       date: "17 Nisan 2025",
//       time: "14:00 - 15:30",
//       customer: "Elif Demir",
//       service: "Saç Bakımı, Saç Maskesi, Fön",
//       status: "confirmed",
//       customerInfo: {
//         phone: "+90 555 456 7890",
//         email: "elif@example.com",
//         notes: "Saç dökülmesi şikayeti var.",
//       },
//     },
//   ],
//   2: [
//     {
//       id: 201,
//       date: "15 Nisan 2025",
//       time: "09:30 - 10:00",
//       customer: "Mehmet Demir",
//       service: "Sakal Tıraşı",
//       status: "confirmed",
//       customerInfo: {
//         phone: "+90 555 567 8901",
//         email: "mehmet@example.com",
//         notes: "Köşeli sakal şekli istiyor.",
//       },
//     },
//     {
//       id: 202,
//       date: "15 Nisan 2025",
//       time: "11:00 - 12:00",
//       customer: "Ali Yıldız",
//       service: "Erkek Saç Kesimi, Sakal Şekillendirme",
//       status: "confirmed",
//       customerInfo: {
//         phone: "+90 555 678 9012",
//         email: "ali@example.com",
//         notes: "Yanlar kısa, üst kısım uzun olacak.",
//       },
//     },
//     {
//       id: 203,
//       date: "16 Nisan 2025",
//       time: "10:00 - 10:30",
//       customer: "Ahmet Kara",
//       service: "Sakal Tıraşı",
//       status: "pending",
//       customerInfo: {
//         phone: "+90 555 789 0123",
//         email: "ahmet@example.com",
//         notes: "",
//       },
//     },
//   ],
//   3: [
//     {
//       id: 301,
//       date: "15 Nisan 2025",
//       time: "10:00 - 11:00",
//       customer: "Ayşe Yılmaz",
//       service: "Manikür",
//       status: "confirmed",
//       customerInfo: {
//         phone: "+90 555 123 4567",
//         email: "ayse@example.com",
//         notes: "Pastel tonlarda oje istiyor.",
//       },
//     },
//     {
//       id: 302,
//       date: "15 Nisan 2025",
//       time: "14:00 - 15:30",
//       customer: "Zeynep Kaya",
//       service: "Manikür & Pedikür, Protez Tırnak",
//       status: "confirmed",
//       customerInfo: {
//         phone: "+90 555 345 6789",
//         email: "zeynep@example.com",
//         notes: "Özel tasarım istiyor.",
//       },
//     },
//     {
//       id: 303,
//       date: "16 Nisan 2025",
//       time: "13:00 - 14:00",
//       customer: "Fatma Şahin",
//       service: "Protez Tırnak",
//       status: "pending",
//       customerInfo: {
//         phone: "+90 555 234 5678",
//         email: "fatma@example.com",
//         notes: "Uzun oval tırnak şekli tercih ediyor.",
//       },
//     },
//   ],
//   4: [
//     {
//       id: 401,
//       date: "18 Nisan 2025",
//       time: "10:00 - 11:00",
//       customer: "Zeynep Kaya",
//       service: "Yüz Bakımı, Cilt Temizliği, Maske Uygulaması",
//       status: "confirmed",
//       customerInfo: {
//         phone: "+90 555 345 6789",
//         email: "zeynep@example.com",
//         notes: "Cilt kuruluğu şikayeti var.",
//       },
//     },
//     {
//       id: 402,
//       date: "19 Nisan 2025",
//       time: "14:00 - 15:00",
//       customer: "Ayşe Yılmaz",
//       service: "Cilt Temizliği",
//       status: "pending",
//       customerInfo: {
//         phone: "+90 555 123 4567",
//         email: "ayse@example.com",
//         notes: "Akne problemi var.",
//       },
//     },
//   ],
// };

// // Dummy Forms
// const AddStaffForm = ({
//   onSubmit,
//   onCancel,
//   availableServices,
// }: {
//   onSubmit: any;
//   onCancel: any;
//   availableServices: any;
// }) => {
//   return (
//     <div>
//       <DialogHeader>
//         <DialogTitle>Personel Ekle</DialogTitle>
//         <DialogDescription>Yeni personel bilgilerini girin.</DialogDescription>
//       </DialogHeader>
//       <div className="grid gap-4 py-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="name" className="text-right">
//             Adı
//           </Label>
//           <Input id="name" defaultValue="Placeholder" className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="role" className="text-right">
//             Rolü
//           </Label>
//           <Input id="role" defaultValue="Placeholder" className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="email" className="text-right">
//             E-posta
//           </Label>
//           <Input
//             id="email"
//             defaultValue="placeholder@example.com"
//             className="col-span-3"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="phone" className="text-right">
//             Telefon
//           </Label>
//           <Input
//             id="phone"
//             defaultValue="+90 555 555 5555"
//             className="col-span-3"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="specialties" className="text-right">
//             Uzmanlık Alanları
//           </Label>
//           <MultiSelect
//             options={availableServices}
//             selected={[]} // Provide an empty array or a state variable
//             onChange={() => {}}
//             className="col-span-3"
//           />
//         </div>
//       </div>
//       <DialogFooter>
//         <Button variant="secondary" onClick={onCancel}>
//           İptal
//         </Button>
//         <Button type="submit" onClick={onSubmit}>
//           Kaydet
//         </Button>
//       </DialogFooter>
//     </div>
//   );
// };

// const StaffScheduleForm = ({
//   staff,
//   onSubmit,
//   onCancel,
// }: {
//   staff: any;
//   onSubmit: any;
//   onCancel: any;
// }) => {
//   const [workingDays, setWorkingDays] = useState(staff.workingDays);
//   const [workingHours, setWorkingHours] = useState(staff.workingHours);

//   const handleDayChange = (day: string) => {
//     setWorkingDays({ ...workingDays, [day]: !workingDays[day] });
//   };

//   const handleHoursChange = (field: string, value: string) => {
//     setWorkingHours({ ...workingHours, [field]: value });
//   };

//   return (
//     <div>
//       <DialogHeader>
//         <DialogTitle>{staff.name} - Çalışma Saatleri</DialogTitle>
//         <DialogDescription>
//           Personelin çalışma günlerini ve saatlerini düzenleyin.
//         </DialogDescription>
//       </DialogHeader>
//       <div className="grid gap-4 py-4">
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="monday" className="text-right">
//             Pazartesi
//           </Label>
//           <Switch
//             id="monday"
//             checked={workingDays.monday}
//             onCheckedChange={() => handleDayChange("monday")}
//           />
//         </div>
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="tuesday" className="text-right">
//             Salı
//           </Label>
//           <Switch
//             id="tuesday"
//             checked={workingDays.tuesday}
//             onCheckedChange={() => handleDayChange("tuesday")}
//           />
//         </div>
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="wednesday" className="text-right">
//             Çarşamba
//           </Label>
//           <Switch
//             id="wednesday"
//             checked={workingDays.wednesday}
//             onCheckedChange={() => handleDayChange("wednesday")}
//           />
//         </div>
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="thursday" className="text-right">
//             Perşembe
//           </Label>
//           <Switch
//             id="thursday"
//             checked={workingDays.thursday}
//             onCheckedChange={() => handleDayChange("thursday")}
//           />
//         </div>
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="friday" className="text-right">
//             Cuma
//           </Label>
//           <Switch
//             id="friday"
//             checked={workingDays.friday}
//             onCheckedChange={() => handleDayChange("friday")}
//           />
//         </div>
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="saturday" className="text-right">
//             Cumartesi
//           </Label>
//           <Switch
//             id="saturday"
//             checked={workingDays.saturday}
//             onCheckedChange={() => handleDayChange("saturday")}
//           />
//         </div>
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="sunday" className="text-right">
//             Pazar
//           </Label>
//           <Switch
//             id="sunday"
//             checked={workingDays.sunday}
//             onCheckedChange={() => handleDayChange("sunday")}
//           />
//         </div>
//         <Separator />
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="start" className="text-right">
//             Başlangıç
//           </Label>
//           <Input
//             type="time"
//             id="start"
//             value={workingHours.start}
//             onChange={(e) => handleHoursChange("start", e.target.value)}
//           />
//         </div>
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="end" className="text-right">
//             Bitiş
//           </Label>
//           <Input
//             type="time"
//             id="end"
//             value={workingHours.end}
//             onChange={(e) => handleHoursChange("end", e.target.value)}
//           />
//         </div>
//         <Separator />
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="breakStart" className="text-right">
//             Mola Başlangıcı
//           </Label>
//           <Input
//             type="time"
//             id="breakStart"
//             value={workingHours.breakStart}
//             onChange={(e) => handleHoursChange("breakStart", e.target.value)}
//           />
//         </div>
//         <div className="grid grid-cols-2 items-center gap-4">
//           <Label htmlFor="breakEnd" className="text-right">
//             Mola Bitişi
//           </Label>
//           <Input
//             type="time"
//             id="breakEnd"
//             value={workingHours.breakEnd}
//             onChange={(e) => handleHoursChange("breakEnd", e.target.value)}
//           />
//         </div>
//       </div>
//       <DialogFooter>
//         <Button variant="secondary" onClick={onCancel}>
//           İptal
//         </Button>
//         <Button
//           type="submit"
//           onClick={() => onSubmit({ workingDays, workingHours })}
//         >
//           Kaydet
//         </Button>
//       </DialogFooter>
//     </div>
//   );
// };

// const EditStaffForm = ({
//   staff,
//   onSubmit,
//   onCancel,
//   availableServices,
// }: {
//   staff: any;
//   onSubmit: any;
//   onCancel: any;
//   availableServices: any;
// }) => {
//   return (
//     <div>
//       <DialogHeader>
//         <DialogTitle>Personel Düzenle</DialogTitle>
//         <DialogDescription>Personel bilgilerini düzenleyin.</DialogDescription>
//       </DialogHeader>
//       <div className="grid gap-4 py-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="name" className="text-right">
//             Adı
//           </Label>
//           <Input id="name" defaultValue={staff.name} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="role" className="text-right">
//             Rolü
//           </Label>
//           <Input id="role" defaultValue={staff.role} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="email" className="text-right">
//             E-posta
//           </Label>
//           <Input id="email" defaultValue={staff.email} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="phone" className="text-right">
//             Telefon
//           </Label>
//           <Input id="phone" defaultValue={staff.phone} className="col-span-3" />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="specialties" className="text-right">
//             Uzmanlık Alanları
//           </Label>
//           <MultiSelect
//             selected={staff.specialties}
//             options={availableServices}
//             onChange={() => {}}
//             className="col-span-3"
//           />
//         </div>
//       </div>
//       <DialogFooter>
//         <Button variant="secondary" onClick={onCancel}>
//           İptal
//         </Button>
//         <Button type="submit" onClick={onSubmit}>
//           Kaydet
//         </Button>
//       </DialogFooter>
//     </div>
//   );
// };

// function StaffPage() {
//   const [staff, setStaff] = useState([
//     {
//       id: 1,
//       name: "Zehra Yılmaz",
//       role: "Saç Stilisti",
//       avatar: "/placeholder.svg?height=100&width=100&text=ZY",
//       initials: "ZY",
//       email: "zehra@example.com",
//       phone: "+90 555 123 4567",
//       specialties: ["Saç Kesimi", "Saç Boyama", "Fön"],
//       status: "active",
//       workingDays: {
//         monday: true,
//         tuesday: true,
//         wednesday: true,
//         thursday: true,
//         friday: true,
//         saturday: true,
//         sunday: false,
//       },
//       workingHours: {
//         start: "09:00",
//         end: "18:00",
//         breakStart: "13:00",
//         breakEnd: "14:00",
//       },
//     },
//     {
//       id: 2,
//       name: "Ahmet Kaya",
//       role: "Berber",
//       avatar: "/placeholder.svg?height=100&width=100&text=AK",
//       initials: "AK",
//       email: "ahmet@example.com",
//       phone: "+90 555 234 5678",
//       specialties: ["Erkek Saç Kesimi", "Sakal Tıraşı"],
//       status: "active",
//       workingDays: {
//         monday: true,
//         tuesday: true,
//         wednesday: true,
//         thursday: true,
//         friday: true,
//         saturday: false,
//         sunday: false,
//       },
//       workingHours: {
//         start: "10:00",
//         end: "19:00",
//         breakStart: "14:00",
//         breakEnd: "15:00",
//       },
//     },
//     {
//       id: 3,
//       name: "Selin Demir",
//       role: "Tırnak Uzmanı",
//       avatar: "/placeholder.svg?height=100&width=100&text=SD",
//       initials: "SD",
//       email: "selin@example.com",
//       phone: "+90 555 345 6789",
//       specialties: ["Manikür", "Pedikür", "Protez Tırnak"],
//       status: "active",
//       workingDays: {
//         monday: false,
//         tuesday: true,
//         wednesday: true,
//         thursday: true,
//         friday: true,
//         saturday: true,
//         sunday: false,
//       },
//       workingHours: {
//         start: "09:00",
//         end: "17:00",
//         breakStart: "12:00",
//         breakEnd: "13:00",
//       },
//     },
//     {
//       id: 4,
//       name: "Mehmet Öztürk",
//       role: "Cilt Bakım Uzmanı",
//       avatar: "/placeholder.svg?height=100&width=100&text=MÖ",
//       initials: "MÖ",
//       email: "mehmet@example.com",
//       phone: "+90 555 456 7890",
//       specialties: ["Yüz Bakımı", "Cilt Temizliği"],
//       status: "vacation",
//       workingDays: {
//         monday: true,
//         tuesday: true,
//         wednesday: true,
//         thursday: true,
//         friday: true,
//         saturday: false,
//         sunday: false,
//       },
//       workingHours: {
//         start: "09:00",
//         end: "18:00",
//         breakStart: "13:00",
//         breakEnd: "14:00",
//       },
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStaff, setSelectedStaff] = useState<any>(null);
//   const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
//   const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
//   const [isScheduleOpen, setIsScheduleOpen] = useState(false);
//   const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
//   const [selectedAppointments, setSelectedAppointments] = useState<any[]>([]);

//   const filteredStaff = staff.filter(
//     (member) =>
//       member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.role.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleStatusChange = (id: number, newStatus: string) => {
//     setStaff(
//       staff.map((member) =>
//         member.id === id ? { ...member, status: newStatus } : member
//       )
//     );
//     toast("Durum güncellendi", {
//       description: `Personel durumu ${
//         newStatus === "active" ? "aktif" : "izinli"
//       } olarak değiştirildi.`,
//     });
//   };

//   const handleDeleteStaff = (id: number) => {
//     setStaff(staff.filter((member) => member.id !== id));
//     toast("Personel silindi", {
//       description: "Personel başarıyla silindi.",
//     });
//   };

//   const handleAddStaff = (newStaff: any) => {
//     const id = staff.length > 0 ? Math.max(...staff.map((s) => s.id)) + 1 : 1;
//     setStaff([...staff, { ...newStaff, id }]);
//     setIsAddStaffOpen(false);
//     toast("Personel eklendi", {
//       description: "Yeni personel başarıyla eklendi.",
//     });
//   };

//   const handleEditStaff = (updatedStaff: any) => {
//     setStaff(
//       staff.map((member) =>
//         member.id === updatedStaff.id ? { ...updatedStaff } : member
//       )
//     );
//     setIsEditStaffOpen(false);
//     toast("Personel güncellendi", {
//       description: "Personel bilgileri başarıyla güncellendi.",
//     });
//   };

//   const handleUpdateSchedule = (updatedSchedule: any) => {
//     if (!selectedStaff) return;

//     setStaff(
//       staff.map((member) =>
//         member.id === selectedStaff.id
//           ? {
//               ...member,
//               workingDays: updatedSchedule.workingDays,
//               workingHours: updatedSchedule.workingHours,
//             }
//           : member
//       )
//     );

//     setIsScheduleOpen(false);
//     toast("Çalışma saatleri güncellendi", {
//       description: "Personel çalışma saatleri başarıyla güncellendi.",
//     });
//   };

//   const handleViewAppointments = (member: any) => {
//     setSelectedStaff(member);
//     // Get appointments for this staff member
//     const appointments =
//       staffAppointments[member.id as keyof typeof staffAppointments] || [];
//     setSelectedAppointments(appointments);
//     setIsAppointmentsOpen(true);
//   };

//   return (
//     <div className="flex min-h-screen w-full flex-col">
//       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold">Personel Yönetimi</h1>
//           <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="mr-2 h-4 w-4" />
//                 Personel Ekle
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[600px]">
//               <AddStaffForm
//                 onSubmit={handleAddStaff}
//                 onCancel={() => setIsAddStaffOpen(false)}
//                 availableServices={availableServices}
//               />
//             </DialogContent>
//           </Dialog>
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="relative flex-1 max-w-sm">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Personel ara..."
//               className="pl-8"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <Tabs defaultValue="all">
//           <TabsList>
//             <TabsTrigger value="all">Tüm Personel</TabsTrigger>
//             <TabsTrigger value="active">Aktif</TabsTrigger>
//             <TabsTrigger value="vacation">İzinli</TabsTrigger>
//           </TabsList>

//           <TabsContent value="all" className="mt-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {filteredStaff.map((member) => (
//                 <StaffCard
//                   key={member.id}
//                   member={member}
//                   onStatusChange={handleStatusChange}
//                   onDelete={handleDeleteStaff}
//                   onSchedule={(member) => {
//                     setSelectedStaff(member);
//                     setIsScheduleOpen(true);
//                   }}
//                   onEdit={(member) => {
//                     setSelectedStaff(member);
//                     setIsEditStaffOpen(true);
//                   }}
//                   onViewAppointments={handleViewAppointments}
//                 />
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="active" className="mt-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {filteredStaff
//                 .filter((member) => member.status === "active")
//                 .map((member) => (
//                   <StaffCard
//                     key={member.id}
//                     member={member}
//                     onStatusChange={handleStatusChange}
//                     onDelete={handleDeleteStaff}
//                     onSchedule={(member) => {
//                       setSelectedStaff(member);
//                       setIsScheduleOpen(true);
//                     }}
//                     onEdit={(member) => {
//                       setSelectedStaff(member);
//                       setIsEditStaffOpen(true);
//                     }}
//                     onViewAppointments={handleViewAppointments}
//                   />
//                 ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="vacation" className="mt-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {filteredStaff
//                 .filter((member) => member.status === "vacation")
//                 .map((member) => (
//                   <StaffCard
//                     key={member.id}
//                     member={member}
//                     onStatusChange={handleStatusChange}
//                     onDelete={handleDeleteStaff}
//                     onSchedule={(member) => {
//                       setSelectedStaff(member);
//                       setIsScheduleOpen(true);
//                     }}
//                     onEdit={(member) => {
//                       setSelectedStaff(member);
//                       setIsEditStaffOpen(true);
//                     }}
//                     onViewAppointments={handleViewAppointments}
//                   />
//                 ))}
//             </div>
//           </TabsContent>
//         </Tabs>

//         {/* Staff Schedule Dialog */}
//         <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
//           <DialogContent className="sm:max-w-[600px]">
//             {selectedStaff && (
//               <StaffScheduleForm
//                 staff={selectedStaff}
//                 onSubmit={handleUpdateSchedule}
//                 onCancel={() => setIsScheduleOpen(false)}
//               />
//             )}
//           </DialogContent>
//         </Dialog>

//         {/* Edit Staff Dialog */}
//         <Dialog open={isEditStaffOpen} onOpenChange={setIsEditStaffOpen}>
//           <DialogContent className="sm:max-w-[600px]">
//             {selectedStaff && (
//               <EditStaffForm
//                 staff={selectedStaff}
//                 onSubmit={handleEditStaff}
//                 onCancel={() => setIsEditStaffOpen(false)}
//                 availableServices={availableServices}
//               />
//             )}
//           </DialogContent>
//         </Dialog>

//         {/* Staff Appointments Dialog */}
//         <Dialog open={isAppointmentsOpen} onOpenChange={setIsAppointmentsOpen}>
//           <DialogContent className="sm:max-w-[800px]">
//             {selectedStaff && (
//               <StaffAppointmentsView
//                 staff={selectedStaff}
//                 appointments={selectedAppointments}
//                 onClose={() => setIsAppointmentsOpen(false)}
//               />
//             )}
//           </DialogContent>
//         </Dialog>
//       </main>
//     </div>
//   );
// }

// // Update the StaffCard component to fix button styling
// function StaffCard({
//   member,
//   onStatusChange,
//   onDelete,
//   onSchedule,
//   onEdit,
//   onViewAppointments,
// }: {
//   member: any;
//   onStatusChange: (id: number, status: string) => void;
//   onDelete: (id: number) => void;
//   onSchedule: (member: any) => void;
//   onEdit: (member: any) => void;
//   onViewAppointments: (member: any) => void;
// }) {
//   const workingDaysCount = Object.values(member.workingDays).filter(
//     Boolean
//   ).length;

//   return (
//     <Card className="overflow-hidden">
//       <CardHeader className="p-0">
//         <div className="relative h-32 bg-gradient-to-r from-primary/10 to-primary/5">
//           <div className="absolute -bottom-10 left-4">
//             <Avatar className="h-20 w-20 border-4 border-background">
//               <AvatarImage src={member.avatar} alt={member.name} />
//               <AvatarFallback className="text-xl">
//                 {member.initials}
//               </AvatarFallback>
//             </Avatar>
//           </div>
//           <div className="absolute top-4 right-4">
//             {member.status === "active" ? (
//               <Badge
//                 variant="outline"
//                 className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
//               >
//                 Aktif
//               </Badge>
//             ) : (
//               <Badge
//                 variant="outline"
//                 className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
//               >
//                 İzinli
//               </Badge>
//             )}
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="pt-12 pb-4">
//         <div className="space-y-1.5">
//           <CardTitle className="text-xl">{member.name}</CardTitle>
//           <CardDescription>{member.role}</CardDescription>
//         </div>
//         <div className="mt-4 space-y-3 text-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">E-posta:</span>
//             <span className="font-medium">{member.email}</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Telefon:</span>
//             <span className="font-medium">{member.phone}</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Çalışma:</span>
//             <span className="font-medium">{workingDaysCount} gün / hafta</span>
//           </div>
//           <div className="pt-2">
//             <span className="text-muted-foreground text-xs">Uzmanlık:</span>
//             <div className="flex flex-wrap gap-1 mt-1">
//               {member.specialties.map((specialty: string) => (
//                 <Badge key={specialty} variant="secondary" className="text-xs">
//                   {specialty}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="flex flex-col gap-2 pt-0">
//         <div className="grid grid-cols-2 gap-2 w-full">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => onViewAppointments(member)}
//             className="w-full h-9 flex items-center justify-center"
//           >
//             <CalendarDays className="mr-2 h-4 w-4" />
//             Randevular
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => onSchedule(member)}
//             className="w-full h-9 flex items-center justify-center"
//           >
//             <Clock className="mr-2 h-4 w-4" />
//             Çalışma Saatleri
//           </Button>
//         </div>
//         <div className="grid grid-cols-2 gap-2 w-full">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => onEdit(member)}
//             className="w-full h-9 flex items-center justify-center"
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Düzenle
//           </Button>
//           <Button
//             variant={member.status === "active" ? "secondary" : "default"}
//             size="sm"
//             onClick={() =>
//               onStatusChange(
//                 member.id,
//                 member.status === "active" ? "vacation" : "active"
//               )
//             }
//             className="w-full h-9 flex items-center justify-center"
//           >
//             {member.status === "active" ? "İzne Çıkar" : "Aktif Yap"}
//           </Button>
//         </div>
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button
//               variant="outline"
//               size="sm"
//               className="w-full h-9 flex items-center justify-center text-destructive hover:text-destructive mt-1"
//             >
//               <Trash2 className="mr-2 h-4 w-4" />
//               Sil
//             </Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 Personeli silmek istediğinize emin misiniz?
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 Bu işlem geri alınamaz. Bu personel kaydı kalıcı olarak
//                 silinecektir.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>İptal</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => onDelete(member.id)}
//                 className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//               >
//                 Sil
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </CardFooter>
//     </Card>
//   );
// }

// // Update the StaffAppointmentsView component to add tooltips and customer details
// function StaffAppointmentsView({
//   staff,
//   appointments,
//   onClose,
// }: {
//   staff: any;
//   appointments: any[];
//   onClose: () => void;
// }) {
//   const [filter, setFilter] = useState("all");

//   const filteredAppointments =
//     filter === "all"
//       ? appointments
//       : appointments.filter((appointment) => appointment.status === filter);

//   const truncateService = (service: string, maxLength = 25) => {
//     if (service.length <= maxLength) return service;
//     return service.substring(0, maxLength) + "...";
//   };

//   return (
//     <>
//       <DialogHeader>
//         <DialogTitle className="flex items-center gap-2">
//           <Avatar className="h-8 w-8">
//             <AvatarImage src={staff.avatar} alt={staff.name} />
//             <AvatarFallback>{staff.initials}</AvatarFallback>
//           </Avatar>
//           <span>{staff.name} - Randevular</span>
//         </DialogTitle>
//         <DialogDescription>
//           Bu personelin tüm randevularını görüntüleyin
//         </DialogDescription>
//       </DialogHeader>

//       <div className="mt-4">
//         <div className="flex justify-between items-center mb-4">
//           <Tabs
//             defaultValue="all"
//             value={filter}
//             onValueChange={setFilter}
//             className="w-full"
//           >
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="all">Tümü</TabsTrigger>
//               <TabsTrigger value="confirmed">Onaylı</TabsTrigger>
//               <TabsTrigger value="pending">Bekleyen</TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>

//         {filteredAppointments.length > 0 ? (
//           <div className="border rounded-md">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Tarih</TableHead>
//                   <TableHead>Saat</TableHead>
//                   <TableHead>Müşteri</TableHead>
//                   <TableHead>Hizmet</TableHead>
//                   <TableHead>Durum</TableHead>
//                   <TableHead>İşlemler</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredAppointments.map((appointment) => (
//                   <TableRow key={appointment.id} className="hover:bg-muted/50">
//                     <TableCell>{appointment.date}</TableCell>
//                     <TableCell>{appointment.time}</TableCell>
//                     <TableCell>{appointment.customer}</TableCell>
//                     <TableCell>
//                       <div className="group relative">
//                         {truncateService(appointment.service)}
//                         {appointment.service.length > 25 && (
//                           <div className="absolute z-50 invisible group-hover:visible bg-popover text-popover-foreground px-3 py-1.5 text-xs rounded-md shadow-md bottom-full left-1/2 -translate-x-1/2 mb-1 w-auto max-w-[200px] break-words">
//                             {appointment.service}
//                           </div>
//                         )}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       {appointment.status === "confirmed" ? (
//                         <Badge
//                           variant="outline"
//                           className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
//                         >
//                           Onaylı
//                         </Badge>
//                       ) : (
//                         <Badge
//                           variant="outline"
//                           className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
//                         >
//                           Bekliyor
//                         </Badge>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <Button variant="outline" size="sm" asChild>
//                         <Link
//                           to={`/dashboard/appointments/$appointmentId`}
//                           params={appointment.id}
//                         >
//                           Görüntüle
//                         </Link>
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-8 text-center">
//             <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium">Randevu Bulunamadı</h3>
//             <p className="text-muted-foreground mt-1">
//               Bu personel için{" "}
//               {filter === "all"
//                 ? ""
//                 : filter === "confirmed"
//                   ? "onaylı "
//                   : "bekleyen "}
//               randevu bulunmamaktadır.
//             </p>
//           </div>
//         )}
//       </div>

//       <DialogFooter className="mt-6">
//         <Button onClick={onClose}>Kapat</Button>
//       </DialogFooter>
//     </>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { createFileRoute } from "@tanstack/react-router";
import EditEmployeeForm from "@/components/employees/edit-employee-form";
import AddEmployeeForm from "@/components/employees/add-employee-form";
import EmployeeScheduleForm from "@/components/employees/employee-schedule-form";
import EmployeeCard from "@/components/employees/employee-card";
import EmployeeAppointmentsView from "@/components/employees/employee-appointments";
import { GetAllEmployeesQueryOptions } from "@/lib/hooks/employee.hook";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/employees/")({
  component: EmployeesPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(GetAllEmployeesQueryOptions);
  },
});

// Available services in the salon
const availableServices = [
  { value: "haircut", label: "Saç Kesimi" },
  { value: "coloring", label: "Saç Boyama" },
  { value: "styling", label: "Fön" },
  { value: "treatment", label: "Saç Bakımı" },
  { value: "beard", label: "Sakal Tıraşı" },
  { value: "manicure", label: "Manikür" },
  { value: "pedicure", label: "Pedikür" },
  { value: "nailExt", label: "Protez Tırnak" },
  { value: "facial", label: "Yüz Bakımı" },
  { value: "skinCleaning", label: "Cilt Temizliği" },
  { value: "makeup", label: "Makyaj" },
  { value: "bridal", label: "Gelin Makyajı" },
];

// Update the staffAppointments data to include multiple services for some appointments
const staffAppointments = {
  1: [
    {
      id: 101,
      date: "15 Nisan 2025",
      time: "10:00 - 11:30",
      customer: "Ayşe Yılmaz",
      service: "Saç Kesimi & Fön",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 123 4567",
        email: "ayse@example.com",
        notes: "Saç uçlarında kırıklar var, özel bakım istiyor.",
      },
    },
    {
      id: 102,
      date: "15 Nisan 2025",
      time: "13:00 - 14:30",
      customer: "Fatma Şahin",
      service: "Saç Boyama, Saç Bakımı, Fön",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 234 5678",
        email: "fatma@example.com",
        notes: "Açık kahve tonları tercih ediyor.",
      },
    },
    {
      id: 103,
      date: "16 Nisan 2025",
      time: "11:00 - 12:00",
      customer: "Zeynep Kaya",
      service: "Fön",
      status: "pending",
      customerInfo: {
        phone: "+90 555 345 6789",
        email: "zeynep@example.com",
        notes: "",
      },
    },
    {
      id: 104,
      date: "17 Nisan 2025",
      time: "14:00 - 15:30",
      customer: "Elif Demir",
      service: "Saç Bakımı, Saç Maskesi, Fön",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 456 7890",
        email: "elif@example.com",
        notes: "Saç dökülmesi şikayeti var.",
      },
    },
  ],
  2: [
    {
      id: 201,
      date: "15 Nisan 2025",
      time: "09:30 - 10:00",
      customer: "Mehmet Demir",
      service: "Sakal Tıraşı",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 567 8901",
        email: "mehmet@example.com",
        notes: "Köşeli sakal şekli istiyor.",
      },
    },
    {
      id: 202,
      date: "15 Nisan 2025",
      time: "11:00 - 12:00",
      customer: "Ali Yıldız",
      service: "Erkek Saç Kesimi, Sakal Şekillendirme",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 678 9012",
        email: "ali@example.com",
        notes: "Yanlar kısa, üst kısım uzun olacak.",
      },
    },
    {
      id: 203,
      date: "16 Nisan 2025",
      time: "10:00 - 10:30",
      customer: "Ahmet Kara",
      service: "Sakal Tıraşı",
      status: "pending",
      customerInfo: {
        phone: "+90 555 789 0123",
        email: "ahmet@example.com",
        notes: "",
      },
    },
  ],
  3: [
    {
      id: 301,
      date: "15 Nisan 2025",
      time: "10:00 - 11:00",
      customer: "Ayşe Yılmaz",
      service: "Manikür",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 123 4567",
        email: "ayse@example.com",
        notes: "Pastel tonlarda oje istiyor.",
      },
    },
    {
      id: 302,
      date: "15 Nisan 2025",
      time: "14:00 - 15:30",
      customer: "Zeynep Kaya",
      service: "Manikür & Pedikür, Protez Tırnak",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 345 6789",
        email: "zeynep@example.com",
        notes: "Özel tasarım istiyor.",
      },
    },
    {
      id: 303,
      date: "16 Nisan 2025",
      time: "13:00 - 14:00",
      customer: "Fatma Şahin",
      service: "Protez Tırnak",
      status: "pending",
      customerInfo: {
        phone: "+90 555 234 5678",
        email: "fatma@example.com",
        notes: "Uzun oval tırnak şekli tercih ediyor.",
      },
    },
  ],
  4: [
    {
      id: 401,
      date: "18 Nisan 2025",
      time: "10:00 - 11:00",
      customer: "Zeynep Kaya",
      service: "Yüz Bakımı, Cilt Temizliği, Maske Uygulaması",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 345 6789",
        email: "zeynep@example.com",
        notes: "Cilt kuruluğu şikayeti var.",
      },
    },
    {
      id: 402,
      date: "19 Nisan 2025",
      time: "14:00 - 15:00",
      customer: "Ayşe Yılmaz",
      service: "Cilt Temizliği",
      status: "pending",
      customerInfo: {
        phone: "+90 555 123 4567",
        email: "ayse@example.com",
        notes: "Akne problemi var.",
      },
    },
  ],
};

function EmployeesPage() {
  const employeeQuery = useSuspenseQuery(GetAllEmployeesQueryOptions);
  const employeeData = employeeQuery.data;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [selectedAppointments, setSelectedAppointments] = useState<any[]>([]);

  const filteredEmployee = employeeData.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: number, newStatus: string) => {
    toast("Durum güncellendi", {
      description: `Personel durumu ${
        newStatus === "active" ? "aktif" : "izinli"
      } olarak değiştirildi.`,
    });
  };

  const handleDeleteStaff = (id: number) => {
    toast("Personel silindi", {
      description: "Personel başarıyla silindi.",
    });
  };

  const handleAddStaff = (newStaff: any) => {
    setIsAddStaffOpen(false);
    toast("Personel eklendi", {
      description: "Yeni personel başarıyla eklendi.",
    });
  };

  const handleEditStaff = (updatedStaff: any) => {
    setIsEditStaffOpen(false);
    toast("Personel güncellendi", {
      description: "Personel bilgileri başarıyla güncellendi.",
    });
  };

  const handleUpdateSchedule = (updatedSchedule: any) => {
    if (!selectedStaff) return;

    setIsScheduleOpen(false);
    toast("Çalışma saatleri güncellendi", {
      description: "Personel çalışma saatleri başarıyla güncellendi.",
    });
  };

  const handleViewAppointments = (member: any) => {
    setSelectedStaff(member);
    // Get appointments for this staff member
    const appointments =
      staffAppointments[member.id as keyof typeof staffAppointments] || [];
    setSelectedAppointments(appointments);
    setIsAppointmentsOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Personel Yönetimi</h1>
          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Personel Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <AddEmployeeForm
                onCancel={() => setIsAddStaffOpen(false)}
                availableServices={availableServices}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Personel ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tüm Personel</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="vacation">İzinli</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEmployee.map((member) => (
                <EmployeeCard
                  key={member.id}
                  member={member}
                  onStatusChange={handleStatusChange}
                  onSchedule={(member) => {
                    setSelectedStaff(member);
                    setIsScheduleOpen(true);
                  }}
                  onEdit={(member) => {
                    setSelectedStaff(member);
                    setIsEditStaffOpen(true);
                  }}
                  onViewAppointments={handleViewAppointments}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEmployee
                .filter((member) => member.status === "active")
                .map((member) => (
                  <EmployeeCard
                    key={member.id}
                    member={member}
                    onStatusChange={handleStatusChange}
                    onSchedule={(member) => {
                      setSelectedStaff(member);
                      setIsScheduleOpen(true);
                    }}
                    onEdit={(member) => {
                      setSelectedStaff(member);
                      setIsEditStaffOpen(true);
                    }}
                    onViewAppointments={handleViewAppointments}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="vacation" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEmployee
                .filter((member) => member.status === "vacation")
                .map((member) => (
                  <EmployeeCard
                    key={member.id}
                    member={member}
                    onStatusChange={handleStatusChange}
                    onSchedule={(member) => {
                      setSelectedStaff(member);
                      setIsScheduleOpen(true);
                    }}
                    onEdit={(member) => {
                      setSelectedStaff(member);
                      setIsEditStaffOpen(true);
                    }}
                    onViewAppointments={handleViewAppointments}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Staff Schedule Dialog */}
        <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedStaff && (
              <EmployeeScheduleForm
                employee={selectedStaff}
                onSubmit={handleUpdateSchedule}
                onCancel={() => setIsScheduleOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Staff Dialog */}
        <Dialog open={isEditStaffOpen} onOpenChange={setIsEditStaffOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedStaff && (
              <EditEmployeeForm
                employee={selectedStaff}
                onCancel={() => setIsEditStaffOpen(false)}
                availableServices={availableServices}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Staff Appointments Dialog */}
        <Dialog open={isAppointmentsOpen} onOpenChange={setIsAppointmentsOpen}>
          <DialogContent className="sm:max-w-[800px]">
            {selectedStaff && (
              <EmployeeAppointmentsView
                staff={selectedStaff}
                appointments={selectedAppointments}
                onClose={() => setIsAppointmentsOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
