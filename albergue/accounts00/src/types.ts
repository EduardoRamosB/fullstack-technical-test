export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  role?: string;
  first_name?: string;
  last_name?: string;
}

export interface Animal {
  id?: number;
  name: string;
  age: number;
  breed: string;
  kind: string;
  status: string;
  reason?: string;
  created_by_id?: number;
  updated_by_id?: number;
}

export interface Adoption {
  id?: number;
  date?: string;
  animal: number;
  volunteer?: number | null;
  adopter: number;
  status: string;
  created_by_id?: number;
  updated_by_id?: number;
}