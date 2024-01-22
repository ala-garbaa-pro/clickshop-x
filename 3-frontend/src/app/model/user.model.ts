export interface User {
  userId?: number;
  email: string;
  password: string;
  name: string;
  roles: string[];
}