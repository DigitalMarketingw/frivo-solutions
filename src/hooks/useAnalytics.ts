
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsFilters {
  startDate?: Date;
  endDate?: Date;
  jobField?: string;
}

interface AnalyticsData {
  total_applications: number;
  status_breakdown: Array<{ status: string; count: number }>;
  field_breakdown: Array<{ field: string; count: number }>;
  daily_applications: Array<{ date: string; count: number }>;
  conversion_rate: number;
}

interface UserPerformanceData {
  total_applications: number;
  approved_applications: number;
  pending_applications: number;
  success_rate: number;
  applications_by_field: Array<{ field: string; count: number }>;
  recent_activity: Array<{
    job_title: string;
    company: string;
    status: string;
    applied_at: string;
  }>;
}

export const useApplicationAnalytics = (filters: AnalyticsFilters = {}) => {
  return useQuery({
    queryKey: ['application-analytics', filters],
    queryFn: async (): Promise<AnalyticsData> => {
      const { data, error } = await supabase.rpc('get_application_stats', {
        start_date: filters.startDate?.toISOString(),
        end_date: filters.endDate?.toISOString(),
        job_field: filters.jobField,
      });

      if (error) throw error;
      
      return data as unknown as AnalyticsData;
    },
  });
};

export const useUserPerformanceMetrics = (userId?: string) => {
  return useQuery({
    queryKey: ['user-performance', userId],
    queryFn: async (): Promise<UserPerformanceData> => {
      let targetUserId = userId;
      
      if (!targetUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No authenticated user');
        targetUserId = user.id;
      }

      const { data, error } = await supabase.rpc('get_user_performance_metrics', {
        user_uuid: targetUserId,
      });

      if (error) throw error;
      
      return data as unknown as UserPerformanceData;
    },
  });
};

export const useApplicationTrends = () => {
  return useQuery({
    queryKey: ['application-trends'],
    queryFn: async (): Promise<Array<{ date: string; total: number; approved: number; rejected: number }>> => {
      const { data, error } = await supabase
        .from('application_analytics')
        .select('application_date, field, status')
        .order('application_date', { ascending: true });

      if (error) throw error;

      // Process data for trend analysis
      const trendData = (data || []).reduce((acc: any, curr: any) => {
        const date = curr.application_date;
        if (!acc[date]) {
          acc[date] = { date, total: 0, approved: 0, rejected: 0 };
        }
        acc[date].total++;
        if (curr.status === 'approved') acc[date].approved++;
        if (curr.status === 'rejected') acc[date].rejected++;
        return acc;
      }, {});

      return Object.values(trendData) as Array<{ date: string; total: number; approved: number; rejected: number }>;
    },
  });
};
