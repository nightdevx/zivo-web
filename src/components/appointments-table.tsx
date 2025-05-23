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
import { useGetAppointmentsByCompanyId } from "@/lib/hooks/appointments.hook";
import { format } from "date-fns";


export function AppointmentsTable() {
  const { data: appointments } = useGetAppointmentsByCompanyId();
  // const [appointments, setAppointments] = useState(
  //   isPast ? pastAppointments : upcomingAppointments
  // );

  // const handleStatusChange = (id: number, newStatus: string) => {
  //   setAppointments(
  //     appointments.map((appointment) =>
  //       appointment.id === id
  //         ? { ...appointment, status: newStatus }
  //         : appointment
  //     )
  //   );

  //   toast.message(`Appointment ${newStatus}`, {
  //     description: `Appointment has been ${newStatus} successfully.`,
  //   });
  // };

  if (!appointments) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar>
            <AvatarFallback>Loading...</AvatarFallback>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
          </Avatar>
          <p className="text-sm text-muted-foreground">
            Loading appointments...
          </p>
        </div>
      </div>
    );
  }

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
          {appointments.map((appointment: any) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-medium">
                      {appointment.customer?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatPhone(appointment.customer?.phone)}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {appointment.services && appointment.services.length > 0
                  ? appointment.services.map((s: any) => s.name).join(", ")
                  : "-"}
              </TableCell>
              <TableCell>
                <div>{formatDate(appointment.start_time)}</div>
                <div className="text-sm text-muted-foreground">
                  {formatTimeRange(
                    appointment.start_time,
                    appointment.end_time
                  )}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={appointment.status} />
              </TableCell>
              <TableCell>{appointment.employee?.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {appointment.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-green-600"
                        // onClick={() =>
                        //   handleStatusChange(appointment.id, "confirmed")
                        // }
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-600"
                        // onClick={() =>
                        //   handleStatusChange(appointment.id, "rejected")
                        // }
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
                        // onClick={() =>
                        //   handleStatusChange(appointment.id, "completed")
                        // }
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
                              // onClick={() =>
                              //   handleStatusChange(appointment.id, "cancelled")
                              // }
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
// Yardımcı fonksiyonlar:
function formatPhone(phone?: string) {
  if (!phone) return "-";
  // +90 ile başlamıyorsa başına ekle
  let p = phone;
  if (!p.startsWith("+90")) p = "+90" + p;
  return p.replace(/^(\+90)(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4");
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  try {
    return format(new Date(dateStr), "PPP");
  } catch {
    return dateStr;
  }
}

function formatTimeRange(start?: string, end?: string) {
  if (!start || !end) return "-";
  try {
    return (
      format(new Date(start), "HH:mm") + " - " + format(new Date(end), "HH:mm")
    );
  } catch {
    return start + " - " + end;
  }
}
