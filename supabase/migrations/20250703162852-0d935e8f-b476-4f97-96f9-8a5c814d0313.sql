
-- Step 2: Add company_id to profiles table to link company users to their company
ALTER TABLE public.profiles ADD COLUMN company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL;
