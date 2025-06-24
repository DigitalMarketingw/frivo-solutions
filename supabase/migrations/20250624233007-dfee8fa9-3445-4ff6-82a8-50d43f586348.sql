
-- Fix the application_analytics view to ensure it works with current schema
DROP VIEW IF EXISTS application_analytics;

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
LEFT JOIN jobs j ON a.job_id = j.id AND j.deleted_at IS NULL
LEFT JOIN profiles p ON a.user_id = p.id;

-- Update the get_application_stats function to handle empty data gracefully
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
    WHERE field IS NOT NULL
    GROUP BY field
  ),
  daily_applications AS (
    SELECT 
      application_date::text as date,
      COUNT(*) as count
    FROM filtered_applications
    WHERE application_date IS NOT NULL
    GROUP BY application_date
    ORDER BY application_date
  )
  SELECT jsonb_build_object(
    'total_applications', COALESCE((SELECT COUNT(*) FROM filtered_applications), 0),
    'status_breakdown', COALESCE((SELECT jsonb_agg(jsonb_build_object('status', status, 'count', count)) FROM status_counts), '[]'::jsonb),
    'field_breakdown', COALESCE((SELECT jsonb_agg(jsonb_build_object('field', field, 'count', count)) FROM field_counts), '[]'::jsonb),
    'daily_applications', COALESCE((SELECT jsonb_agg(jsonb_build_object('date', date, 'count', count)) FROM daily_applications), '[]'::jsonb),
    'conversion_rate', COALESCE((
      SELECT CASE 
        WHEN COUNT(*) = 0 THEN 0
        ELSE ROUND((COUNT(*) FILTER (WHERE status = 'approved')::numeric / COUNT(*)::numeric) * 100, 2)
      END
      FROM filtered_applications
    ), 0)
  );
$$;

-- Update the get_user_performance_metrics function to handle empty data
CREATE OR REPLACE FUNCTION get_user_performance_metrics(user_uuid uuid)
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
AS $$
  WITH user_applications AS (
    SELECT * FROM application_analytics WHERE user_id = user_uuid
  )
  SELECT jsonb_build_object(
    'total_applications', COALESCE((SELECT COUNT(*) FROM user_applications), 0),
    'approved_applications', COALESCE((SELECT COUNT(*) FROM user_applications WHERE status = 'approved'), 0),
    'pending_applications', COALESCE((SELECT COUNT(*) FROM user_applications WHERE status IN ('applied', 'under_review')), 0),
    'success_rate', COALESCE((
      SELECT CASE 
        WHEN COUNT(*) = 0 THEN 0
        ELSE ROUND((COUNT(*) FILTER (WHERE status = 'approved')::numeric / COUNT(*)::numeric) * 100, 2)
      END
      FROM user_applications
    ), 0),
    'applications_by_field', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('field', field, 'count', count))
      FROM (
        SELECT field, COUNT(*) as count
        FROM user_applications
        WHERE field IS NOT NULL
        GROUP BY field
        ORDER BY count DESC
        LIMIT 10
      ) field_stats
    ), '[]'::jsonb),
    'recent_activity', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'job_title', job_title,
        'company', company,
        'status', status,
        'applied_at', applied_at
      ))
      FROM (
        SELECT job_title, company, status, applied_at
        FROM user_applications
        WHERE job_title IS NOT NULL
        ORDER BY applied_at DESC
        LIMIT 5
      ) recent
    ), '[]'::jsonb)
  );
$$;

-- Create a function to generate demo analytics data when no data exists
CREATE OR REPLACE FUNCTION get_demo_application_stats()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT jsonb_build_object(
    'total_applications', 12,
    'status_breakdown', '[
      {"status": "applied", "count": 4},
      {"status": "under_review", "count": 3},
      {"status": "approved", "count": 3},
      {"status": "rejected", "count": 2}
    ]'::jsonb,
    'field_breakdown', '[
      {"field": "Technology", "count": 5},
      {"field": "Healthcare", "count": 3},
      {"field": "Finance", "count": 2},
      {"field": "Education", "count": 2}
    ]'::jsonb,
    'daily_applications', '[
      {"date": "2024-06-20", "count": 2},
      {"date": "2024-06-21", "count": 3},
      {"date": "2024-06-22", "count": 1},
      {"date": "2024-06-23", "count": 4},
      {"date": "2024-06-24", "count": 2}
    ]'::jsonb,
    'conversion_rate', 25.0
  );
$$;
