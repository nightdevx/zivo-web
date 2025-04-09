import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/lib/models/employee.model";

const EmployeeScheduleForm = ({
  employee,
  onSubmit,
  onCancel,
}: {
  employee: Employee;
  onSubmit: any;
  onCancel: any;
}) => {
  const [workingDays, setWorkingDays] = useState(employee.working_days);
  const [workingHours, setWorkingHours] = useState(employee.working_hours);

  const handleDayChange = (day: keyof typeof workingDays) => {
    setWorkingDays({ ...workingDays, [day]: !workingDays[day] });
  };

  const handleHoursChange = (field: string, value: string) => {
    setWorkingHours({ ...workingHours, [field]: value });
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{employee.name} - Çalışma Saatleri</DialogTitle>
        <DialogDescription>
          Personelin çalışma günlerini ve saatlerini düzenleyin.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="monday" className="text-right">
            Pazartesi
          </Label>
          <Switch
            id="monday"
            checked={workingDays.monday}
            onCheckedChange={() => handleDayChange("monday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="tuesday" className="text-right">
            Salı
          </Label>
          <Switch
            id="tuesday"
            checked={workingDays.tuesday}
            onCheckedChange={() => handleDayChange("tuesday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="wednesday" className="text-right">
            Çarşamba
          </Label>
          <Switch
            id="wednesday"
            checked={workingDays.wednesday}
            onCheckedChange={() => handleDayChange("wednesday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="thursday" className="text-right">
            Perşembe
          </Label>
          <Switch
            id="thursday"
            checked={workingDays.thursday}
            onCheckedChange={() => handleDayChange("thursday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="friday" className="text-right">
            Cuma
          </Label>
          <Switch
            id="friday"
            checked={workingDays.friday}
            onCheckedChange={() => handleDayChange("friday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="saturday" className="text-right">
            Cumartesi
          </Label>
          <Switch
            id="saturday"
            checked={workingDays.saturday}
            onCheckedChange={() => handleDayChange("saturday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="sunday" className="text-right">
            Pazar
          </Label>
          <Switch
            id="sunday"
            checked={workingDays.sunday}
            onCheckedChange={() => handleDayChange("sunday")}
          />
        </div>
        <Separator />
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="start" className="text-right">
            Başlangıç
          </Label>
          <Input
            type="time"
            id="start"
            value={workingHours.start}
            onChange={(e) => handleHoursChange("start", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="end" className="text-right">
            Bitiş
          </Label>
          <Input
            type="time"
            id="end"
            value={workingHours.end}
            onChange={(e) => handleHoursChange("end", e.target.value)}
          />
        </div>
        <Separator />
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="breakStart" className="text-right">
            Mola Başlangıcı
          </Label>
          <Input
            type="time"
            id="breakStart"
            value={workingHours.breakStart}
            onChange={(e) => handleHoursChange("breakStart", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="breakEnd" className="text-right">
            Mola Bitişi
          </Label>
          <Input
            type="time"
            id="breakEnd"
            value={workingHours.breakEnd}
            onChange={(e) => handleHoursChange("breakEnd", e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary" onClick={onCancel}>
          İptal
        </Button>
        <Button
          type="submit"
          onClick={() => onSubmit({ workingDays, workingHours })}
        >
          Kaydet
        </Button>
      </DialogFooter>
    </div>
  );
};

export default EmployeeScheduleForm;
