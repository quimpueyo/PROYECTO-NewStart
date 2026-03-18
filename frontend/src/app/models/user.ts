export interface User {
  id: number;
  name: string;
  lastname?: string;
  email: string;
  role: string;
  destination_country?: string;
}
