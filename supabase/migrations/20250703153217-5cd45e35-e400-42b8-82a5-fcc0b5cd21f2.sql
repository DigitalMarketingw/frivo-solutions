
-- Create admin function to create company with admin user
CREATE OR REPLACE FUNCTION public.admin_create_company(
  company_name TEXT,
  company_email TEXT,
  company_phone TEXT DEFAULT NULL,
  company_address TEXT DEFAULT NULL,
  company_website TEXT DEFAULT NULL,
  company_description TEXT DEFAULT NULL,
  admin_full_name TEXT,
  admin_email TEXT,
  admin_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_company_id TEXT;
  new_company_uuid UUID;
  new_user_id UUID;
  result JSONB;
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  -- Generate unique company ID
  LOOP
    new_company_id := 'COMP' || LPAD(floor(random() * 999999)::text, 6, '0');
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.companies WHERE company_id = new_company_id);
  END LOOP;

  -- Create company record
  INSERT INTO public.companies (
    company_name, company_id, email, phone, address, website, description
  ) VALUES (
    company_name, new_company_id, company_email, company_phone, 
    company_address, company_website, company_description
  ) RETURNING id INTO new_company_uuid;

  -- Create admin user account (this will be handled by auth trigger)
  -- For now, we'll return the company details and the admin will need to 
  -- provide the user credentials separately through the auth system

  -- Return result
  result := jsonb_build_object(
    'company_id', new_company_id,
    'company_uuid', new_company_uuid,
    'company_name', company_name,
    'admin_email', admin_email,
    'admin_full_name', admin_full_name
  );

  RETURN result;
END;
$$;

-- Update admin stats to include better company metrics
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
    'active_jobs', (SELECT COUNT(*) FROM public.jobs WHERE status = 'open' AND deleted_at IS NULL),
    'pending_applications', (SELECT COUNT(*) FROM public.applications WHERE status = 'applied'),
    'admin_users', (SELECT COUNT(*) FROM public.profiles WHERE role = 'admin'),
    'company_users', (SELECT COUNT(*) FROM public.profiles WHERE role = 'company'),
    'total_companies', (SELECT COUNT(*) FROM public.companies)
  );
$$;
