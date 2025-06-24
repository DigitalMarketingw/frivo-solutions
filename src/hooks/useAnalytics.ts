
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsFilters {
  startDate?: Date;
  endDate?: Date;
  jobField?: string;
}

export const useApplicationAnalytics = (filters: AnalyticsFilters = {}) => {
  return useQuery({
    queryKey: ['application-analytics', filters],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_application_stats', {
        start_date: filters.startDate?.toISOString(),
        end_date: filters.endDate?.toISOString(),
        job_field: filters.jobField,
      });

      if (error) throw error;
      return data;
    },
  });
};

export const useUserPerformanceMetrics = (userId?: string) => {
  return useQuery({
    queryKey: ['user-performance', userId],
    queryFn: async () => {
      if (!userId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No authenticated user');
        userId = user.id;
      }

      const { data, error } = await supabase.rpc('get_user_performance_metrics', {
        user_uuid: userId,
      });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useApplicationTrends = () => {
  return useQuery({
    queryKey: ['application-trends'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('application_analytics')
        .select('application_date, field, status')
        .order('application_date', { ascending: true });

      if (error) throw error;

      // Process data for trend analysis
      const trendData = data.reduce((acc: any, curr: any) => {
        const date = curr.application_date;
        if (!acc[date]) {
          acc[date] = { date, total: 0, approved: 0, rejected: 0 };
        }
        acc[date].total++;
        if (curr.status === 'approved') acc[date].approved++;
        if (curr.status === 'rejected') acc[date].rejected++;
        return acc;
      }, {});

      return Object.values(trendData);
    },
  });
};
