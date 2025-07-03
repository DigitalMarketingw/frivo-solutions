
-- Step 3: Enable RLS and create policies for companies table
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Allow super admins to manage all companies
CREATE POLICY "Super admins can manage all companies" 
ON public.companies 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Allow company users to view their own company
CREATE POLICY "Company users can view their own company" 
ON public.companies 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND company_id = companies.id
  )
);
