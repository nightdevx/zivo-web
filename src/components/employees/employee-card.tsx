"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Clock, CalendarDays } from "lucide-react";
import type { Employee } from "@/lib/models/employee.model";
import {
  useUpdateEmployee,
  useDeleteEmployee,
} from "@/lib/hooks/employee.hook";
import DeleteDialog from "../delete-dialog";
import { useState } from "react";

function EmployeeCard({
  member,
  onSchedule,
  onEdit,
  onViewAppointments,
}: {
  member: Employee;
  onEdit: (member: Employee) => void;
  onSchedule: (member: any) => void;
  onViewAppointments: (member: any) => void;
}) {
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const { mutate: updateEmployee } = useUpdateEmployee();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null);

  const onDeleteDialogOpen = (id: string) => {
    setDeleteDialogId(id);
    setDeleteDialogOpen(true);
  };
  const onDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteDialogId(null);
  };

  const onDelete = () => {
    if (deleteDialogId) {
      deleteEmployee(deleteDialogId);
    }
    onDeleteDialogClose();
  };

  const onStatusChange = (
    id: string,
    status: "active" | "quitting" | "vacation" | undefined
  ) => {
    updateEmployee({ id, updatedEmployee: { status } });
  };

  const workingDaysCount = Object.values(member.working_days).filter(
    Boolean
  ).length;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16 border-2 border-muted">
          <AvatarImage
            src={
              (member.profile_image && member.profile_image_url) ||
              "/src/assets/profile-placeholder.png"
            }
            alt={member.name}
          />
          <AvatarFallback className="text-lg">
            {member.name.charAt(0)}
            {member.name.split(" ")[1]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl">{member.name}</CardTitle>
            {member.status === "active" ? (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
              >
                Active
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
              >
                On Leave
              </Badge>
            )}
          </div>
          <CardDescription>{member.role}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{member.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span className="font-medium">{member.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Working:</span>
            <span className="font-medium">{workingDaysCount} days / week</span>
          </div>
          {member.specialties && member.specialties.length > 0 && (
            <div className="pt-2">
              <span className="text-muted-foreground text-xs">
                Specialties:
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {member.specialties.map((specialty) =>
                  typeof specialty === "object" && "id" in specialty ? (
                    <Badge
                      key={specialty.id}
                      variant="secondary"
                      className="text-xs"
                    >
                      {specialty.name}
                    </Badge>
                  ) : (
                    <Badge
                      key={specialty}
                      variant="secondary"
                      className="text-xs"
                    >
                      {specialty}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 border-t pt-4">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewAppointments(member)}
            className="w-full h-9 flex items-center justify-center"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Appointments
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSchedule(member)}
            className="w-full h-9 flex items-center justify-center"
          >
            <Clock className="mr-2 h-4 w-4" />
            Working Hours
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(member)}
            className="w-full h-9 flex items-center justify-center"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant={member.status === "active" ? "secondary" : "default"}
            size="sm"
            onClick={() =>
              onStatusChange(
                member.id,
                member.status === "active" ? "vacation" : "active"
              )
            }
            className="w-full h-9 flex items-center justify-center"
          >
            {member.status === "active" ? "Set On Vacation" : "Set Active"}
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full h-9 flex items-center justify-center text-destructive hover:text-destructive mt-1"
          onClick={() => onDeleteDialogOpen(member.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
        <DeleteDialog
          deleteText="employee"
          isOpen={deleteDialogOpen}
          setIsOpen={setDeleteDialogOpen}
          onConfirm={onDelete}
          onCancel={onDeleteDialogClose}
        />
      </CardFooter>
    </Card>
  );
}

export default EmployeeCard;
