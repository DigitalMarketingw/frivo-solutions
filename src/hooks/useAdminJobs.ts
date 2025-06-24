
import { useState, useEffect, useCallback } from 'react';
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

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('jobs')
        .select('*', { count: 'exact' })
        .is('deleted_at', null);

      // Apply search filter with better performance
      if (params.search) {
        const searchTerm = `%${params.search}%`;
        query = query.or(`title.ilike.${searchTerm},company.ilike.${searchTerm},location.ilike.${searchTerm}`);
      }

      // Apply sorting with proper index usage
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
      console.error('Jobs fetch error:', err);
      toast({
        title: "Error",
        description: err.message || 'Failed to fetch jobs',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [params.page, params.limit, params.search, params.sort, params.order, toast]);

  const deleteJob = useCallback(async (jobId: string) => {
    try {
      const { error } = await supabase.rpc('soft_delete_job', { job_id: jobId });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
      
      await fetchJobs();
    } catch (err: any) {
      console.error('Job delete error:', err);
      toast({
        title: "Error",
        description: err.message || 'Failed to delete job',
        variant: "destructive",
      });
    }
  }, [fetchJobs, toast]);

  const updateJobStatus = useCallback(async (jobId: string, status: Job['status']) => {
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
      console.error('Job status update error:', err);
      toast({
        title: "Error",
        description: err.message || 'Failed to update job status',
        variant: "destructive",
      });
    }
  }, [fetchJobs, toast]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Set up real-time subscription for job updates
  useEffect(() => {
    const channel = supabase
      .channel('admin-jobs-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'jobs' }, 
        () => fetchJobs()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    refetch: fetchJobs,
    deleteJob,
    updateJobStatus,
  };
};
