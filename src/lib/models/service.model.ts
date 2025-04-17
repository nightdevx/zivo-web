type Service = {
  category: string;
  company_id: number | null;
  description: string | null;
  duration: string;
  id: number;
  isActive: boolean;
  name: string;
  price: number;
};

type ServiceInsert = {
  category: string;
  description: string | null;
  duration: string;
  isActive: boolean;
  name: string;
  price: string;
};

type ServiceUpdate = {
  category?: string;
  company_id?: number | null;
  description?: string | null;
  duration?: string;
  isActive?: boolean;
  name?: string;
  price?: number;
};

export type { Service, ServiceInsert, ServiceUpdate };
