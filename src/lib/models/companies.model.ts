type Company = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  logo?: string;
  cover_image?: string;
  phone_number?: string;
  website?: string;
  instagram_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  youtube_url?: string;
  x_url?: string;
  opening_hours: JSON;
  user_id: string;
};

type CompanyInsert = {
  name: string;
  category: string;
  description?: string;
  phone_number?: string;
  user_id: string;
};

type CompanyUpdate = Partial<Omit<Company, "id">>;

export type { Company, CompanyInsert, CompanyUpdate };
