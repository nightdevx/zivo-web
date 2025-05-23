import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Employee, EmployeeUpdate } from "@/lib/models/employee.model";
import { useUpdateEmployee } from "@/lib/hooks/employee.hook";
import { useDeleteEmployeeServices } from "@/lib/hooks/employee-services.hooks";
import { toast } from "sonner";
import { useState } from "react";
import { X, Camera } from "lucide-react";
import { useUploadFile } from "@/lib/hooks/file.hook";

// Zod şeması zorunlu alanlarla güncellendi
const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  specialties: z.array(z.string()).optional(),
  profile_image: z.instanceof(File).optional().nullable(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

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
  const { mutate: deleteEmployeeServices } = useDeleteEmployeeServices();
  const { mutate: uploadFile } = useUploadFile();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDeleteEmployeeServices = (
    employeeId: string,
    serviceId: string
  ) => {
    deleteEmployeeServices(
      { employee_id: employeeId, service_id: serviceId },
      {
        onSuccess: () => {
          toast.success("Service removed successfully.");
        },
        onError: () => {
          toast.error("Failed to delete service.");
        },
      }
    );
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: employee.name || "",
      role: employee.role || "",
      email: employee.email || "",
      phone: employee.phone || "",
      specialties: employee.specialties.map((specialty) =>
        typeof specialty === "string" ? specialty : specialty.id
      ),
      profile_image: null,
    },
  });

  const specialties = watch("specialties");

  function getAddedItems<T>(original: T[], updated: T[]): T[] {
    const originalSet = new Set(original);
    return updated.filter((item) => !originalSet.has(item));
  }

  function getUpdatedFields<T extends Record<string, any>>(
    original: T,
    updated: T
  ): Partial<T> {
    return Object.keys(updated).reduce((acc, key) => {
      if (Array.isArray(original[key]) && Array.isArray(updated[key])) {
        const addedItems = getAddedItems(original[key], updated[key]);
        if (addedItems.length > 0) {
          acc[key as keyof T] = addedItems as T[keyof T];
        }
      } else if (updated[key as keyof T] !== original[key as keyof T]) {
        acc[key as keyof T] = updated[key as keyof T];
      }
      return acc;
    }, {} as Partial<T>);
  }

  const onSubmit = (data: EmployeeFormValues) => {
    const updatedFields = getUpdatedFields(
      {
        ...employee,
        specialties: employee.specialties.map((specialty) =>
          typeof specialty === "string" ? specialty : specialty.id
        ),
      },
      {
        ...data,
        profile_image:
          data.profile_image instanceof File ? data.profile_image : null,
      }
    );

    if (!updatedFields.specialties || updatedFields.specialties.length === 0) {
      delete updatedFields.specialties;
    }

    if (
      updatedFields.profile_image &&
      updatedFields.profile_image instanceof File
    ) {
      uploadFile(updatedFields.profile_image, {
        onSuccess: (fileUrl) => {
          const payload: EmployeeUpdate = {
            ...updatedFields,
            profile_image: fileUrl,
          };
          updateEmployee(
            {
              id: employee.id,
              updatedEmployee: payload,
            },
            {
              onSuccess: () => {
                toast.success("Employee updated successfully.");
                onCancel();
              },
              onError: () => {
                toast.error("Failed to update employee.");
              },
            }
          );
        },
        onError: () => {
          toast.error("Failed to upload profile_image.");
        },
      });
      return;
    }

    const sanitizedFields = { ...updatedFields };
    if (
      "profile_image" in sanitizedFields &&
      (typeof sanitizedFields.profile_image !== "string" ||
        sanitizedFields.profile_image === "")
    ) {
      delete sanitizedFields.profile_image;
    }

    updateEmployee(
      { id: employee.id, updatedEmployee: sanitizedFields as EmployeeUpdate },
      {
        onSuccess: () => {
          toast.success("Employee updated successfully.");
          onCancel();
        },
        onError: () => {
          toast.error("Failed to update employee.");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogDescription>Edit employee details.</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="image" className="text-right">
          Profile Image
        </Label>
        <div className="col-span-3">
          <div className="flex flex-col items-center">
            <div className="relative group">
              {(employee.profile_image && employee.profile_image_url) ||
              selectedImage ? (
                <div className="relative">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
                    <img
                      src={
                        (employee.profile_image &&
                          employee.profile_image_url) ||
                        selectedImage ||
                        "/placeholder.svg"
                      }
                      alt="Employee preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setValue("profile_image", null);
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
                      setValue("profile_image", file);
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
          {errors.profile_image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profile_image.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" {...register("name")} className="col-span-3" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Role
          </Label>
          <Input id="role" {...register("role")} className="col-span-3" />
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" {...register("email")} className="col-span-3" />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input id="phone" {...register("phone")} className="col-span-3" />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialties" className="text-right">
            Specialties
          </Label>
          <MultiSelect
            selected={specialties || []}
            options={availableServices}
            onChange={
              (value) => setValue("specialties", value, { shouldDirty: true }) // shouldDirty eklendi
            }
            onUnselect={(value) => {
              handleDeleteEmployeeServices(employee.id, value);
              setValue(
                "specialties",
                (specialties || []).filter((item) => item !== value),
                { shouldDirty: true } // shouldDirty eklendi
              );
            }}
          />

          {errors.specialties && (
            <p className="text-red-500">{errors.specialties.message}</p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isDirty} className="ml-2">
          Save
        </Button>
      </DialogFooter>
    </form>
  );
};

export default EditEmployeeForm;
