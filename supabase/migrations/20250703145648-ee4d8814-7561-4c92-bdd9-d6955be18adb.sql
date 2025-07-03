
-- Extend the user_role enum to include 'company'
ALTER TYPE user_role ADD VALUE 'company';

-- Create companies table to store company information
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  company_id TEXT UNIQUE NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  website TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add company_id to profiles table to link company users to their company
ALTER TABLE public.profiles ADD COLUMN company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL;

-- Enable RLS on companies table
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies table
CREATE POLICY "Company users can view their own company" ON public.companies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND company_id = companies.id
    )
  );

CREATE POLICY "Super admins can view all companies" ON public.companies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Super admins can manage all companies" ON public.companies
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add company_id to jobs table so companies can only manage their own jobs
ALTER TABLE public.jobs ADD COLUMN company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL;

-- Update jobs RLS policies for company access
CREATE POLICY "Company users can view their own jobs" ON public.jobs
  FOR SELECT USING (
    company_id IN (
      SELECT profiles.company_id FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'company'
    )
  );

CREATE POLICY "Company users can manage their own jobs" ON public.jobs
  FOR ALL USING (
    company_id IN (
      SELECT profiles.company_id FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'company'
    )
  );

-- Update applications RLS for company access (companies can view applications for their jobs)
CREATE POLICY "Company users can view applications for their jobs" ON public.applications
  FOR SELECT USING (
    job_id IN (
      SELECT jobs.id FROM public.jobs 
      WHERE jobs.company_id IN (
        SELECT profiles.company_id FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role = 'company'
      )
    )
  );

CREATE POLICY "Company users can update applications for their jobs" ON public.applications
  FOR UPDATE USING (
    job_id IN (
      SELECT jobs.id FROM public.jobs 
      WHERE jobs.company_id IN (
        SELECT profiles.company_id FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role = 'company'
      )
    )
  );

-- Create function to get user role (update existing one to handle company role)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role::text FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create function to generate unique company ID
CREATE OR REPLACE FUNCTION public.generate_company_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
BEGIN
  LOOP
    new_id := 'COMP' || LPAD(floor(random() * 999999)::text, 6, '0');
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.companies WHERE company_id = new_id);
  END LOOP;
  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add updated_at trigger for companies table
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
