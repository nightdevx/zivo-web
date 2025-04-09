type Employee = {
  company_id: number;
  email: string;
  id: number;
  name: string;
  image: string;
  phone: string;
  role: string;
  specialties: string[];
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
};

export type { Employee, EmployeeCreate, EmployeeUpdate };
