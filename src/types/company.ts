
export interface Company {
  id: string;
  company_name: string;
  company_id: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyRegistration {
  company_name: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  description?: string;
  admin_full_name: string;
  admin_email: string;
  admin_password: string;
}

export interface CompanyUser {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: 'company';
  company_id: string;
  created_at: string;
  updated_at: string;
}
