
-- Drop the existing function if it exists to start clean
DROP FUNCTION IF EXISTS public.admin_create_company;

-- Create the admin_create_company function with explicit column references
CREATE OR REPLACE FUNCTION public.admin_create_company(
  p_company_name TEXT,
  p_admin_full_name TEXT,
  p_admin_email TEXT,
  p_admin_password TEXT,
  p_company_email TEXT DEFAULT NULL,
  p_company_phone TEXT DEFAULT NULL,
  p_company_address TEXT DEFAULT NULL,
  p_company_website TEXT DEFAULT NULL,
  p_company_description TEXT DEFAULT NULL
)
RETURNS TABLE(
  company_id TEXT,
  company_uuid UUID,
  created_company_name TEXT,
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

  -- Generate a unique company ID with explicit table reference
  SELECT COALESCE(MAX(CAST(SUBSTRING(c.company_id FROM '[0-9]+') AS INTEGER)), 0) + 1
  INTO company_counter
  FROM public.companies c
  WHERE c.company_id ~ '^COMP[0-9]+$';
  
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
    p_company_name,
    generated_company_id,
    p_company_email,
    p_company_phone,
    p_company_address,
    p_company_website,
    p_company_description
  ) RETURNING id INTO new_company_uuid;

  -- Return the company details
  RETURN QUERY SELECT 
    generated_company_id as company_id,
    new_company_uuid as company_uuid,
    p_company_name as created_company_name,
    p_admin_email as admin_email,
    p_admin_full_name as admin_full_name;
END;
$$;
