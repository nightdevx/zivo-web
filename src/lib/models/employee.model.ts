type Employee = {
  company_id: string;
  email: string;
  id: string;
  name: string;
  profile_image?: string;
  profile_image_url?: string;
  phone: string;
  role: string;
  specialties: string[] | { id: string; name: string }[];
  status: "active" | "quitting" | "vacation";
  working_days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  working_hours: {
    start: string;
    end: string;
    breakStart: string;
    breakEnd: string;
  };
};

type EmployeeCreate = {
  email: string;
  name: string;
  phone: string;
  role: string;
  profile_image?: string;
  specialties: string[];
  status?: "active" | "quitting" | "vacation";
};

type EmployeeUpdate = {
  email?: string;
  name?: string;
  phone?: string;
  role?: string;
  specialties?: string[];
  status?: "active" | "quitting" | "vacation";
  working_days?: {
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
  };
  working_hours?: {
    start?: string;
    end?: string;
    breakStart?: string;
    breakEnd?: string;
  };
  profile_image?: string;
};

export type { Employee, EmployeeCreate, EmployeeUpdate };
