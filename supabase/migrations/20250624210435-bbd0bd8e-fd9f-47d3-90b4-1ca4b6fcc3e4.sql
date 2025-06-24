
-- Create analytics views for better performance
CREATE OR REPLACE VIEW application_analytics AS
SELECT 
  a.id,
  a.user_id,
  a.job_id,
  a.status,
  a.applied_at,
  a.assignment_completed,
  a.payment_required,
  a.payment_status,
  j.title as job_title,
  j.company,
  j.field,
  j.location,
  p.full_name as applicant_name,
  DATE_TRUNC('day', a.applied_at) as application_date,
  DATE_TRUNC('week', a.applied_at) as application_week,
  DATE_TRUNC('month', a.applied_at) as application_month
FROM applications a
JOIN jobs j ON a.job_id = j.id
JOIN profiles p ON a.user_id = p.id
WHERE j.deleted_at IS NULL;

-- Create function to get application statistics
CREATE OR REPLACE FUNCTION get_application_stats(
  start_date timestamp with time zone DEFAULT NULL,
  end_date timestamp with time zone DEFAULT NULL,
  job_field text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
AS $$
  WITH filtered_applications AS (
    SELECT * FROM application_analytics
    WHERE (start_date IS NULL OR applied_at >= start_date)
      AND (end_date IS NULL OR applied_at <= end_date)
      AND (job_field IS NULL OR field = job_field)
  ),
  status_counts AS (
    SELECT 
      status,
      COUNT(*) as count
    FROM filtered_applications
    GROUP BY status
  ),
  field_counts AS (
    SELECT 
      field,
      COUNT(*) as count
    FROM filtered_applications
    GROUP BY field
  ),
  daily_applications AS (
    SELECT 
      application_date,
      COUNT(*) as count
    FROM filtered_applications
    GROUP BY application_date
    ORDER BY application_date
  )
  SELECT jsonb_build_object(
    'total_applications', (SELECT COUNT(*) FROM filtered_applications),
    'status_breakdown', (SELECT jsonb_agg(jsonb_build_object('status', status, 'count', count)) FROM status_counts),
    'field_breakdown', (SELECT jsonb_agg(jsonb_build_object('field', field, 'count', count)) FROM field_counts),
    'daily_applications', (SELECT jsonb_agg(jsonb_build_object('date', application_date, 'count', count)) FROM daily_applications),
    'conversion_rate', (
      SELECT ROUND(
        (COUNT(*) FILTER (WHERE status = 'approved')::numeric / NULLIF(COUNT(*)::numeric, 0)) * 100, 2
      ) FROM filtered_applications
    )
  );
$$;

-- Create function to get user performance metrics
CREATE OR REPLACE FUNCTION get_user_performance_metrics(user_uuid uuid)
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
AS $$
  WITH user_applications AS (
    SELECT * FROM application_analytics WHERE user_id = user_uuid
  )
  SELECT jsonb_build_object(
    'total_applications', (SELECT COUNT(*) FROM user_applications),
    'approved_applications', (SELECT COUNT(*) FROM user_applications WHERE status = 'approved'),
    'pending_applications', (SELECT COUNT(*) FROM user_applications WHERE status IN ('applied', 'under_review')),
    'success_rate', (
      SELECT CASE 
        WHEN COUNT(*) = 0 THEN 0
        ELSE ROUND((COUNT(*) FILTER (WHERE status = 'approved')::numeric / COUNT(*)::numeric) * 100, 2)
      END
      FROM user_applications
    ),
    'applications_by_field', (
      SELECT jsonb_agg(jsonb_build_object('field', field, 'count', count))
      FROM (
        SELECT field, COUNT(*) as count
        FROM user_applications
        GROUP BY field
        ORDER BY count DESC
      ) field_stats
    ),
    'recent_activity', (
      SELECT jsonb_agg(jsonb_build_object(
        'job_title', job_title,
        'company', company,
        'status', status,
        'applied_at', applied_at
      ))
      FROM (
        SELECT job_title, company, status, applied_at
        FROM user_applications
        ORDER BY applied_at DESC
        LIMIT 5
      ) recent
    )
  );
$$;

-- Enable realtime for analytics
ALTER PUBLICATION supabase_realtime ADD TABLE applications;
ALTER PUBLICATION supabase_realtime ADD TABLE jobs;
