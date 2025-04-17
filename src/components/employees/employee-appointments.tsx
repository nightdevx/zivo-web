import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";

function EmployeeAppointmentsView({
  staff,
  appointments,
  onClose,
}: {
  staff: any;
  appointments: any[];
  onClose: () => void;
}) {
  const [filter, setFilter] = useState("all");

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((appointment) => appointment.status === filter);

  const truncateService = (service: string, maxLength = 25) => {
    if (service.length <= maxLength) return service;
    return service.substring(0, maxLength) + "...";
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={staff.avatar} alt={staff.name} />
            <AvatarFallback>{staff.initials}</AvatarFallback>
          </Avatar>
          <span>{staff.name} - Appointments</span>
        </DialogTitle>
        <DialogDescription>
          View all appointments for this staff member
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <Tabs
            defaultValue="all"
            value={filter}
            onValueChange={setFilter}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id} className="hover:bg-muted/50">
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.customer}</TableCell>
                    <TableCell>
                      <div className="group relative">
                        {truncateService(appointment.service)}
                        {appointment.service.length > 25 && (
                          <div className="absolute z-50 invisible group-hover:visible bg-popover text-popover-foreground px-3 py-1.5 text-xs rounded-md shadow-md bottom-full left-1/2 -translate-x-1/2 mb-1 w-auto max-w-[200px] break-words">
                            {appointment.service}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {appointment.status === "confirmed" ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                        >
                          Confirmed
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
                        >
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to={`/dashboard/appointments/$appointmentId`}
                          params={appointment.id}
                        >
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Appointments Found</h3>
            <p className="text-muted-foreground mt-1">
              No{" "}
              {filter === "all"
                ? ""
                : filter === "confirmed"
                  ? "confirmed "
                  : "pending "}
              appointments found for this staff member.
            </p>
          </div>
        )}
      </div>

      <DialogFooter className="mt-6">
        <Button onClick={onClose}>Close</Button>
      </DialogFooter>
    </>
  );
}

export default EmployeeAppointmentsView;
