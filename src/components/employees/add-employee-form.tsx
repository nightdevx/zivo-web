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
import { useCreateEmployee } from "@/lib/hooks/employee.hook";
import { toast } from "sonner";

const AddEmployeeForm = ({
  onCancel,
  availableServices,
}: {
  onCancel: any;
  availableServices: any;
}) => {
  const { mutate: createEmployee } = useCreateEmployee();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    specialties: [] as string[],
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = () => {
    createEmployee(formData, {
      onSuccess: () => {
        toast.success("Personel başarıyla eklendi.");
        onCancel();
      },
      onError: (error) => {
        toast.error("Personel eklenirken bir hata oluştu.");
        console.error(error);
      },
    });
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Personel Ekle</DialogTitle>
        <DialogDescription>Yeni personel bilgilerini girin.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Adı
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
            Rolü
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
            E-posta
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
            Telefon
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
            Uzmanlık Alanları
          </Label>
          <MultiSelect
            options={availableServices}
            selected={formData.specialties}
            onChange={(selected) => handleChange("specialties", selected)}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit" onClick={onSubmit}>
          Kaydet
        </Button>
      </DialogFooter>
    </div>
  );
};

export default AddEmployeeForm;
