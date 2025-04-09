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
import { Employee } from "@/lib/models/employee.model";
import {
  useUpdateEmployee,
  useDeleteEmployee,
} from "@/lib/hooks/employee.hook";

// Update the EmployeeCard component to fix button styling
function EmployeeCard({
  member,
  onStatusChange,
  onSchedule,
  onEdit,
  onViewAppointments,
}: {
  member: Employee;
  onStatusChange: (id: number, status: string) => void;
  onEdit: (member: Employee) => void;
  onSchedule: (member: any) => void;
  onViewAppointments: (member: any) => void;
}) {
  const workingDaysCount = Object.values(member.working_days).filter(
    Boolean
  ).length;

  const { mutate: deleteEmployee } = useDeleteEmployee();
  const { mutate: updateEmployee } = useUpdateEmployee();

  const onDelete = (id: number) => {
    deleteEmployee(id);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-32 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="absolute -bottom-10 left-4">
            <Avatar className="h-20 w-20 border-4 border-background">
              <AvatarImage src={member.image || ""} alt={member.name} />
              <AvatarFallback className="text-xl">{member.name}</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute top-4 right-4">
            {member.status === "active" ? (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
              >
                Aktif
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
              >
                İzinli
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-12 pb-4">
        <div className="space-y-1.5">
          <CardTitle className="text-xl">{member.name}</CardTitle>
          <CardDescription>{member.role}</CardDescription>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">E-posta:</span>
            <span className="font-medium">{member.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Telefon:</span>
            <span className="font-medium">{member.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Çalışma:</span>
            <span className="font-medium">{workingDaysCount} gün / hafta</span>
          </div>
          <div className="pt-2">
            <span className="text-muted-foreground text-xs">Uzmanlık:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {member.specialties.map((specialty: string) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-0">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewAppointments(member)}
            className="w-full h-9 flex items-center justify-center"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Randevular
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSchedule(member)}
            className="w-full h-9 flex items-center justify-center"
          >
            <Clock className="mr-2 h-4 w-4" />
            Çalışma Saatleri
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
            Düzenle
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
            {member.status === "active" ? "İzne Çıkar" : "Aktif Yap"}
          </Button>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-9 flex items-center justify-center text-destructive hover:text-destructive mt-1"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Sil
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Personeli silmek istediğinize emin misiniz?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Bu işlem geri alınamaz. Bu personel kaydı kalıcı olarak
                silinecektir.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>İptal</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(member.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Sil
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default EmployeeCard;
