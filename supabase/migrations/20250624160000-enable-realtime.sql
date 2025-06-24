
-- Enable real-time for profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.profiles;

-- Enable real-time for jobs table  
ALTER TABLE public.jobs REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.jobs;

-- Enable real-time for applications table
ALTER TABLE public.applications REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.applications;

-- Enable real-time for enrollments table
ALTER TABLE public.enrollments REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.enrollments;
