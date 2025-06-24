
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job, PaginationParams, PaginatedResponse } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export const useAdminJobs = (params: PaginationParams = { page: 1, limit: 10 }) => {
  const [jobs, setJobs] = useState<PaginatedResponse<Job>>({
    data: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('jobs')
        .select('*', { count: 'exact' })
        .is('deleted_at', null);

      // Apply search filter
      if (params.search) {
        query = query.or(`title.ilike.%${params.search}%,company.ilike.%${params.search}%,location.ilike.%${params.search}%`);
      }

      // Apply sorting
      if (params.sort) {
        query = query.order(params.sort, { ascending: params.order === 'asc' });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      const from = (params.page - 1) * params.limit;
      const to = from + params.limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      const totalPages = Math.ceil((count || 0) / params.limit);

      setJobs({
        data: data || [],
        total: count || 0,
        page: params.page,
        limit: params.limit,
        totalPages,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || 'Failed to fetch jobs',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase.rpc('soft_delete_job', { job_id: jobId });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
      
      await fetchJobs();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || 'Failed to delete job',
        variant: "destructive",
      });
    }
  };

  const updateJobStatus = async (jobId: string, status: Job['status']) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job status updated successfully",
      });
      
      await fetchJobs();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || 'Failed to update job status',
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [params.page, params.limit, params.search, params.sort, params.order]);

  return {
    jobs,
    loading,
    refetch: fetchJobs,
    deleteJob,
    updateJobStatus,
  };
};
