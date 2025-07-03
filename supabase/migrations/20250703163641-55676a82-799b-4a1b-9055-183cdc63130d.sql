
-- Create the admin_create_company function
CREATE OR REPLACE FUNCTION public.admin_create_company(
  company_name TEXT,
  company_email TEXT DEFAULT NULL,
  company_phone TEXT DEFAULT NULL,
  company_address TEXT DEFAULT NULL,
  company_website TEXT DEFAULT NULL,
  company_description TEXT DEFAULT NULL,
  admin_full_name TEXT,
  admin_email TEXT,
  admin_password TEXT
)
RETURNS TABLE(
  company_id TEXT,
  company_uuid UUID,
  company_name TEXT,
  admin_email TEXT,
  admin_full_name TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_company_uuid UUID;
  generated_company_id TEXT;
  company_counter INTEGER;
BEGIN
  -- Check if current user is a super admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied. Super admin role required.';
  END IF;

  -- Generate a unique company ID
  SELECT COALESCE(MAX(CAST(SUBSTRING(company_id FROM '[0-9]+') AS INTEGER)), 0) + 1
  INTO company_counter
  FROM public.companies
  WHERE company_id ~ '^COMP[0-9]+$';
  
  generated_company_id := 'COMP' || LPAD(company_counter::TEXT, 4, '0');

  -- Insert the new company
  INSERT INTO public.companies (
    company_name,
    company_id,
    email,
    phone,
    address,
    website,
    description
  ) VALUES (
    company_name,
    generated_company_id,
    company_email,
    company_phone,
    company_address,
    company_website,
    company_description
  ) RETURNING id INTO new_company_uuid;

  -- Return the company details
  RETURN QUERY SELECT 
    generated_company_id as company_id,
    new_company_uuid as company_uuid,
    company_name,
    admin_email,
    admin_full_name;
END;
$$;

-- Update the get_admin_stats function to include company count
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT jsonb_build_object(
    'total_users', (SELECT COUNT(*) FROM public.profiles),
    'total_jobs', (SELECT COUNT(*) FROM public.jobs WHERE deleted_at IS NULL),
    'total_applications', (SELECT COUNT(*) FROM public.applications),
    'total_enrollments', (SELECT COUNT(*) FROM public.enrollments),
    'total_companies', (SELECT COUNT(*) FROM public.companies),
    'active_jobs', (SELECT COUNT(*) FROM public.jobs WHERE status = 'open' AND deleted_at IS NULL),
    'pending_applications', (SELECT COUNT(*) FROM public.applications WHERE status = 'applied'),
    'admin_users', (SELECT COUNT(*) FROM public.profiles WHERE role = 'admin')
  );
$$;
