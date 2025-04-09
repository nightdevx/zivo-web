type Company = {
  address: string;
  category: string;
  description: string | null;
  id: number;
  name: string;
  opening_hours: JSON;
  user_id: number | null;
};
type CompanyInsert = {
  address: string;
  category: string;
  description: string | null;
  name: string;
  opening_hours: JSON;
};

type CompanyUpdate = {
  address?: string;
  category?: string;
  description?: string | null;
  name?: string;
  opening_hours?: JSON;
};
export type { Company, CompanyInsert, CompanyUpdate };
