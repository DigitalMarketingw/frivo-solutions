
-- Phase 1: Fix Critical Database Issues (Corrected)

-- Drop ALL existing RLS policies to start fresh
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Drop existing application policies
DROP POLICY IF EXISTS "Users can view own applications" ON public.applications;
DROP POLICY IF EXISTS "Users can create own applications" ON public.applications;
DROP POLICY IF EXISTS "Users can update own applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can manage all applications" ON public.applications;

-- Drop existing enrollment policies
DROP POLICY IF EXISTS "Users can view own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can create own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can update own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can view all enrollments" ON public.enrollments;

-- Drop existing payment policies
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;

-- Create a security definer function to get current user role (prevents recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
AS $$
  SELECT role::text FROM public.profiles WHERE id = auth.uid();
$$;

-- Create proper RLS policies for profiles without recursion
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT 
  USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE 
  USING (public.get_current_user_role() = 'admin');

-- Create RLS policies for applications
CREATE POLICY "Users can view own applications" ON public.applications
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications" ON public.applications
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications" ON public.applications
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all applications" ON public.applications
  FOR ALL 
  USING (public.get_current_user_role() = 'admin');

-- Create RLS policies for enrollments
CREATE POLICY "Users can view own enrollments" ON public.enrollments
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own enrollments" ON public.enrollments
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments" ON public.enrollments
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all enrollments" ON public.enrollments
  FOR SELECT 
  USING (public.get_current_user_role() = 'admin');

-- Create RLS policies for payments
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments" ON public.payments
  FOR SELECT 
  USING (public.get_current_user_role() = 'admin');

-- Add missing performance indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at);
CREATE INDEX IF NOT EXISTS idx_jobs_status_deleted ON public.jobs(status, deleted_at);
CREATE INDEX IF NOT EXISTS idx_jobs_field_status ON public.jobs(field, status);
CREATE INDEX IF NOT EXISTS idx_applications_user_job ON public.applications(user_id, job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status_applied ON public.applications(status, applied_at);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_status ON public.enrollments(user_id, enrollment_status);
CREATE INDEX IF NOT EXISTS idx_payments_user_status ON public.payments(user_id, status);

-- Add foreign key constraints (only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_applications_user_id') THEN
        ALTER TABLE public.applications ADD CONSTRAINT fk_applications_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_applications_job_id') THEN
        ALTER TABLE public.applications ADD CONSTRAINT fk_applications_job_id FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_applications_enrollment_id') THEN
        ALTER TABLE public.applications ADD CONSTRAINT fk_applications_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES public.enrollments(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_enrollments_user_id') THEN
        ALTER TABLE public.enrollments ADD CONSTRAINT fk_enrollments_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_enrollments_job_id') THEN
        ALTER TABLE public.enrollments ADD CONSTRAINT fk_enrollments_job_id FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_payments_user_id') THEN
        ALTER TABLE public.payments ADD CONSTRAINT fk_payments_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_payments_enrollment_id') THEN
        ALTER TABLE public.payments ADD CONSTRAINT fk_payments_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES public.enrollments(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Ensure proper data consistency
UPDATE public.profiles SET role = 'user' WHERE role IS NULL;
ALTER TABLE public.profiles ALTER COLUMN role SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user';

-- Add better constraints (only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'chk_jobs_title_not_empty') THEN
        ALTER TABLE public.jobs ADD CONSTRAINT chk_jobs_title_not_empty CHECK (length(title) > 0);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'chk_jobs_company_not_empty') THEN
        ALTER TABLE public.jobs ADD CONSTRAINT chk_jobs_company_not_empty CHECK (length(company) > 0);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'chk_profiles_full_name_not_empty') THEN
        ALTER TABLE public.profiles ADD CONSTRAINT chk_profiles_full_name_not_empty CHECK (full_name IS NULL OR length(full_name) > 0);
    END IF;
END $$;
