type User = {
  created_at: string | null;
  email: string;
  id: string;
  password: string;
  refresh_token: string | null;
  salt: string;
  type: string;
};

type UserInsert = {
  email: string;
  password: string;
  type: string;
};

type UserUpdate = {
  city?: string;
  email?: string;
  phone?: string | null;
};

export type { User, UserInsert, UserUpdate };
