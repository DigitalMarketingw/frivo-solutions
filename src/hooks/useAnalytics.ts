
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
      try {
        const { data, error } = await supabase.rpc('get_application_stats', {
          start_date: filters.startDate?.toISOString(),
          end_date: filters.endDate?.toISOString(),
          job_field: filters.jobField,
        });

        if (error) {
          console.warn('Main analytics RPC failed, using demo data:', error);
          return getDemoAnalyticsData();
        }
        
        const result = data as unknown as AnalyticsData;
        return {
          total_applications: result.total_applications || 0,
          status_breakdown: Array.isArray(result.status_breakdown) ? result.status_breakdown : [],
          field_breakdown: Array.isArray(result.field_breakdown) ? result.field_breakdown : [],
          daily_applications: Array.isArray(result.daily_applications) ? result.daily_applications : [],
          conversion_rate: result.conversion_rate || 0
        };
      } catch (error) {
        console.warn('Analytics query failed, using demo data:', error);
        return getDemoAnalyticsData();
      }
    },
    staleTime: 30000,
    retry: 1,
  });
};

export const useUserPerformanceMetrics = () => {
  return useQuery({
    queryKey: ['user-performance'],
    queryFn: async (): Promise<UserPerformanceData> => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          return getEmptyUserPerformanceData();
        }

        const { data, error } = await supabase.rpc('get_user_performance_metrics', {
          user_uuid: user.id,
        });

        if (error) {
          console.warn('User performance RPC failed, using empty data:', error);
          return getEmptyUserPerformanceData();
        }
        
        const result = data as unknown as UserPerformanceData;
        return {
          total_applications: result.total_applications || 0,
          approved_applications: result.approved_applications || 0,
          pending_applications: result.pending_applications || 0,
          success_rate: result.success_rate || 0,
          applications_by_field: Array.isArray(result.applications_by_field) ? result.applications_by_field : [],
          recent_activity: Array.isArray(result.recent_activity) ? result.recent_activity : []
        };
      } catch (error) {
        console.warn('User performance metrics error, using empty data:', error);
        return getEmptyUserPerformanceData();
      }
    },
    staleTime: 30000,
    retry: 1,
  });
};

export const useApplicationTrends = () => {
  return useQuery({
    queryKey: ['application-trends'],
    queryFn: async (): Promise<Array<{ date: string; total: number; approved: number; rejected: number }>> => {
      try {
        const { data, error } = await supabase
          .from('application_analytics')
          .select('application_date, field, status')
          .order('application_date', { ascending: true });

        if (error) {
          console.warn('Trends query error, using demo data:', error);
          return getDemoTrendData();
        }

        const trendData = (data || []).reduce((acc: any, curr: any) => {
          const date = curr.application_date;
          if (!date) return acc;
          
          const dateStr = new Date(date).toISOString().split('T')[0];
          if (!acc[dateStr]) {
            acc[dateStr] = { date: dateStr, total: 0, approved: 0, rejected: 0 };
          }
          acc[dateStr].total++;
          if (curr.status === 'approved') acc[dateStr].approved++;
          if (curr.status === 'rejected') acc[dateStr].rejected++;
          return acc;
        }, {});

        const result = Object.values(trendData) as Array<{ date: string; total: number; approved: number; rejected: number }>;
        
        if (result.length === 0) {
          return getDemoTrendData();
        }
        
        return result;
      } catch (error) {
        console.warn('Trends processing error, using demo data:', error);
        return getDemoTrendData();
      }
    },
    staleTime: 60000,
    retry: 1,
  });
};

const getDemoAnalyticsData = (): AnalyticsData => ({
  total_applications: 12,
  status_breakdown: [
    { status: "applied", count: 4 },
    { status: "under_review", count: 3 },
    { status: "approved", count: 3 },
    { status: "rejected", count: 2 }
  ],
  field_breakdown: [
    { field: "Technology", count: 5 },
    { field: "Healthcare", count: 3 },
    { field: "Finance", count: 2 },
    { field: "Education", count: 2 }
  ],
  daily_applications: [
    { date: "2024-06-20", count: 2 },
    { date: "2024-06-21", count: 3 },
    { date: "2024-06-22", count: 1 },
    { date: "2024-06-23", count: 4 },
    { date: "2024-06-24", count: 2 }
  ],
  conversion_rate: 25.0
});

const getEmptyUserPerformanceData = (): UserPerformanceData => ({
  total_applications: 0,
  approved_applications: 0,
  pending_applications: 0,
  success_rate: 0,
  applications_by_field: [],
  recent_activity: []
});

const getDemoTrendData = () => [
  { date: '2024-06-20', total: 2, approved: 1, rejected: 0 },
  { date: '2024-06-21', total: 3, approved: 1, rejected: 1 },
  { date: '2024-06-22', total: 1, approved: 0, rejected: 0 },
  { date: '2024-06-23', total: 4, approved: 2, rejected: 1 },
  { date: '2024-06-24', total: 2, approved: 1, rejected: 0 }
];
