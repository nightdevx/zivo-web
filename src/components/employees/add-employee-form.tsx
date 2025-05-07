import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { Camera, Upload, X } from "lucide-react";

// Define Zod schema
const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  specialties: z.array(z.string()).optional(),
  image: z.instanceof(File).optional().nullable(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const AddEmployeeForm = ({
  onCancel,
  availableServices,
}: {
  onCancel: () => void;
  availableServices: { label: string; value: string }[];
}) => {
  const { mutate: createEmployee } = useCreateEmployee();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      phone: "",
      specialties: [],
      image: null,
    },
  });

  const specialties = watch("specialties");

  const onSubmit = (data: EmployeeFormData) => {
    createEmployee(
      { ...data, specialties: data.specialties || [] },
      {
        onSuccess: () => {
          toast.success("Employee added successfully.");
          onCancel();
        },
        onError: (error) => {
          toast.error("An error occurred while adding the employee.");
          console.error(error);
        },
      }
    );
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogDescription>
          Enter the details of the new employee.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Profile Image
          </Label>
          <div className="col-span-3">
            <div className="flex flex-col items-center">
              <div className="relative group">
                {selectedImage ? (
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Employee preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setValue("image", null);
                        setSelectedImage(null);
                      }}
                      className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors border border-gray-200"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <Label
                    htmlFor="image-upload"
                    className="w-28 h-28 rounded-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer transition-all hover:border-primary/50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center p-2">
                      <div className="rounded-full bg-primary/10 p-2 mb-2">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs text-gray-500 text-center">
                        Upload photo
                      </span>
                    </div>
                  </Label>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setSelectedImage(event.target?.result as string);
                        setValue("image", file);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              {!selectedImage && (
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: Square image, at least 300x300px
                </p>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" {...register("name")} className="col-span-3" />
          {errors.name && (
            <p className="col-span-4 text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Role
          </Label>
          <Input id="role" {...register("role")} className="col-span-3" />
          {errors.role && (
            <p className="col-span-4 text-red-500 text-sm">
              {errors.role.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" {...register("email")} className="col-span-3" />
          {errors.email && (
            <p className="col-span-4 text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input id="phone" {...register("phone")} className="col-span-3" />
          {errors.phone && (
            <p className="col-span-4 text-red-500 text-sm">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialties" className="text-right">
            Specialties
          </Label>
          <MultiSelect
            options={availableServices}
            selected={specialties || []}
            onChange={(selected) => setValue("specialties", selected)}
            placeholder="Select specialties..."
          />
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
