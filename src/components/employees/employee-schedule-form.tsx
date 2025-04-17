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
        <DialogTitle>{employee.name} - Working Hours</DialogTitle>
        <DialogDescription>
          Edit the employee's working days and hours.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="monday" className="text-right">
            Monday
          </Label>
          <Switch
            id="monday"
            checked={workingDays.monday}
            onCheckedChange={() => handleDayChange("monday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="tuesday" className="text-right">
            Tuesday
          </Label>
          <Switch
            id="tuesday"
            checked={workingDays.tuesday}
            onCheckedChange={() => handleDayChange("tuesday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="wednesday" className="text-right">
            Wednesday
          </Label>
          <Switch
            id="wednesday"
            checked={workingDays.wednesday}
            onCheckedChange={() => handleDayChange("wednesday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="thursday" className="text-right">
            Thursday
          </Label>
          <Switch
            id="thursday"
            checked={workingDays.thursday}
            onCheckedChange={() => handleDayChange("thursday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="friday" className="text-right">
            Friday
          </Label>
          <Switch
            id="friday"
            checked={workingDays.friday}
            onCheckedChange={() => handleDayChange("friday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="saturday" className="text-right">
            Saturday
          </Label>
          <Switch
            id="saturday"
            checked={workingDays.saturday}
            onCheckedChange={() => handleDayChange("saturday")}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="sunday" className="text-right">
            Sunday
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
            Start
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
            End
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
            Break Start
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
            Break End
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
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={() => onSubmit({ workingDays, workingHours })}
        >
          Save
        </Button>
      </DialogFooter>
    </div>
  );
};

export default EmployeeScheduleForm;
