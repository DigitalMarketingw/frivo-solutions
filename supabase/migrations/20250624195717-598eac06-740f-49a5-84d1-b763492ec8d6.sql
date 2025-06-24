
-- Add RLS policies for jobs table (currently missing)
CREATE POLICY "Admins can view all jobs" ON public.jobs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can create jobs" ON public.jobs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update jobs" ON public.jobs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to create a new job
CREATE OR REPLACE FUNCTION public.create_job(
  job_title TEXT,
  job_description TEXT,
  job_company TEXT,
  job_location TEXT,
  job_field TEXT,
  job_requirements JSONB DEFAULT '[]',
  job_tags TEXT[] DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_job_id UUID;
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  INSERT INTO public.jobs (
    title, description, company, location, field, 
    requirements, tags, posted_by, status
  ) VALUES (
    job_title, job_description, job_company, job_location, job_field,
    job_requirements, job_tags, auth.uid(), 'open'
  ) RETURNING id INTO new_job_id;
  
  RETURN new_job_id;
END;
$$;

-- Function to update a job
CREATE OR REPLACE FUNCTION public.update_job(
  job_id UUID,
  job_title TEXT,
  job_description TEXT,
  job_company TEXT,
  job_location TEXT,
  job_field TEXT,
  job_requirements JSONB DEFAULT '[]',
  job_tags TEXT[] DEFAULT '{}',
  job_status job_status DEFAULT 'open'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  UPDATE public.jobs 
  SET 
    title = job_title,
    description = job_description,
    company = job_company,
    location = job_location,
    field = job_field,
    requirements = job_requirements,
    tags = job_tags,
    status = job_status,
    updated_at = NOW()
  WHERE id = job_id AND deleted_at IS NULL;
  
  RETURN FOUND;
END;
$$;

-- Function to duplicate a job
CREATE OR REPLACE FUNCTION public.duplicate_job(job_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_job_id UUID;
  job_record RECORD;
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  -- Get the job to duplicate
  SELECT * INTO job_record FROM public.jobs WHERE id = job_id AND deleted_at IS NULL;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Job not found or already deleted.';
  END IF;

  -- Create duplicate with modified title
  INSERT INTO public.jobs (
    title, description, company, location, field, 
    requirements, tags, posted_by, status
  ) VALUES (
    job_record.title || ' (Copy)',
    job_record.description,
    job_record.company,
    job_record.location,
    job_record.field,
    job_record.requirements,
    job_record.tags,
    auth.uid(),
    'open'
  ) RETURNING id INTO new_job_id;
  
  RETURN new_job_id;
END;
$$;
