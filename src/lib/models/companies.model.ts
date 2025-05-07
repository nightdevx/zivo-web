import { Location } from "./location.model";
type Company = {
  id: number;
  name: string;
  location: Location;
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
  user_id: number | null;
};

type CompanyInsert = {
  name: string;
  location: Location;
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
  user_id: number | null;
};

type CompanyUpdate = Partial<Omit<Company, "id">>;

export type { Company, CompanyInsert, CompanyUpdate };
