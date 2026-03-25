export interface User {
  id: number;
  name: string;
  lastname?: string;
  email: string;
  role: string;
  destination_country?: string;
  phone?: string;
  date_of_birth?: string;
  passport_number?: string;
  nationality?: string;
  emergency_contact?: string;
}
