"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Check, Copy, Edit, MoreHorizontal, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AppointmentsTableProps {
  isPast?: boolean;
}

export function AppointmentsTable({ isPast = false }: AppointmentsTableProps) {
  const [appointments, setAppointments] = useState(
    isPast ? pastAppointments : upcomingAppointments
  );

  const handleStatusChange = (id: number, newStatus: string) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );

    toast.message(`Appointment ${newStatus}`, {
      description: `Appointment has been ${newStatus} successfully.`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Staff</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={appointment.avatar}
                      alt={appointment.client}
                    />
                    <AvatarFallback>{appointment.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{appointment.client}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.phone}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{appointment.service}</TableCell>
              <TableCell>
                <div>{appointment.date}</div>
                <div className="text-sm text-muted-foreground">
                  {appointment.time}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={appointment.status} />
              </TableCell>
              <TableCell>{appointment.staff}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {appointment.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-green-600"
                        onClick={() =>
                          handleStatusChange(appointment.id, "confirmed")
                        }
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-600"
                        onClick={() =>
                          handleStatusChange(appointment.id, "rejected")
                        }
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    </>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      {appointment.status === "confirmed" && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(appointment.id, "completed")
                          }
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Mark as Completed
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Appointment
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Cancel Appointment
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel this appointment?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              No, keep appointment
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleStatusChange(appointment.id, "cancelled")
                              }
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Yes, cancel appointment
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

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
  } else if (status === "cancelled") {
    return (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
      >
        Cancelled
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

// Dummy data
const upcomingAppointments = [
  {
    id: 1,
    client: "Ayse Yilmaz",
    phone: "+90 555 123 4567",
    service: "Haircut & Blow Dry",
    date: "April 15, 2025",
    time: "10:00 AM - 11:30 AM",
    status: "confirmed",
    staff: "Zehra",
    initials: "AY",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    client: "Mehmet Demir",
    phone: "+90 555 234 5678",
    service: "Beard Trim",
    date: "April 15, 2025",
    time: "12:00 PM - 1:00 PM",
    status: "confirmed",
    staff: "Ahmet",
    initials: "MD",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    client: "Zeynep Kaya",
    phone: "+90 555 345 6789",
    service: "Hair Coloring",
    date: "April 15, 2025",
    time: "2:00 PM - 3:30 PM",
    status: "pending",
    staff: "Zehra",
    initials: "ZK",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    client: "Fatma Sahin",
    phone: "+90 555 456 7890",
    service: "Manicure & Pedicure",
    date: "April 15, 2025",
    time: "4:00 PM - 5:30 PM",
    status: "pending",
    staff: "Selin",
    initials: "FS",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

const pastAppointments = [
  {
    id: 5,
    client: "Ahmet Koc",
    phone: "+90 555 567 8901",
    service: "Haircut",
    date: "April 8, 2025",
    time: "11:00 AM - 12:00 PM",
    status: "completed",
    staff: "Ahmet",
    initials: "AK",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 6,
    client: "Sevgi Ozturk",
    phone: "+90 555 678 9012",
    service: "Hair Coloring & Care",
    date: "April 7, 2025",
    time: "2:00 PM - 4:30 PM",
    status: "completed",
    staff: "Zehra",
    initials: "SO",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 7,
    client: "Emir Yildiz",
    phone: "+90 555 789 0123",
    service: "Beard Styling",
    date: "April 5, 2025",
    time: "10:30 AM - 11:30 AM",
    status: "completed",
    staff: "Ahmet",
    initials: "EY",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 8,
    client: "Deniz Korkmaz",
    phone: "+90 555 890 1234",
    service: "Facial Care",
    date: "April 3, 2025",
    time: "1:00 PM - 2:00 PM",
    status: "cancelled",
    staff: "Selin",
    initials: "DK",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];
