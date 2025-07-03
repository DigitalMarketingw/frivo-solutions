
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
