import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MultiSelect } from "@/components/multi-select";
import { Employee } from "@/lib/models/employee.model";
import { useUpdateEmployee } from "@/lib/hooks/employee.hook";
import { toast } from "sonner";

const EditEmployeeForm = ({
  employee,
  onCancel,
  availableServices,
}: {
  employee: Employee;
  onCancel: any;
  availableServices: any;
}) => {
  const { mutate: updateEmployee } = useUpdateEmployee();

  const [formData, setFormData] = useState({
    name: employee.name,
    role: employee.role,
    email: employee.email,
    phone: employee.phone,
    specialties: employee.specialties,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = () => {
    updateEmployee(
      { id: employee.id, updatedEmployee: formData },
      {
        onSuccess: () => {
          toast.success("Employee updated successfully.");
          onCancel();
        },
      }
    );
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogDescription>Edit employee details.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Role
          </Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialties" className="text-right">
            Specialties
          </Label>
          <MultiSelect
            selected={formData.specialties}
            options={availableServices}
            onChange={(value) => handleChange("specialties", value)}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" onClick={onSubmit}>
          Save
        </Button>
      </DialogFooter>
    </div>
  );
};

export default EditEmployeeForm;
