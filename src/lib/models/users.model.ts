type User = {
  city: string;
  created_at: string | null;
  email: string;
  id?: number;
  name: string;
  password: string;
  terms: boolean;
  type: string;
  phone: string | null;
};

type UserInsert = {
  city: string;
  email: string;
  name: string;
  password: string;
  phone: string | null;
  terms: boolean;
  type: string;
};

type UserUpdate = {
  city?: string;
  email?: string;
  name?: string;
  phone?: string | null;
};

export type { User, UserInsert, UserUpdate };
