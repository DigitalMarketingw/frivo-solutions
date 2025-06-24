
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Job } from '@/types/admin';

interface JobFormData {
  title: string;
  company: string;
  location: string;
  field: string;
  description: string;
  status: Job['status'];
  requirements: string[];
  tags: string[];
}

export const useJobManagement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createJob = useCallback(async (jobData: JobFormData) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('create_job', {
        job_title: jobData.title,
        job_description: jobData.description,
        job_company: jobData.company,
        job_location: jobData.location,
        job_field: jobData.field,
        job_requirements: JSON.stringify(jobData.requirements),
        job_tags: jobData.tags,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job created successfully",
      });

      return data;
    } catch (err: any) {
      console.error('Job creation error:', err);
      toast({
        title: "Error",
        description: err.message || 'Failed to create job',
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateJob = useCallback(async (jobId: string, jobData: JobFormData) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('update_job', {
        job_id: jobId,
        job_title: jobData.title,
        job_description: jobData.description,
        job_company: jobData.company,
        job_location: jobData.location,
        job_field: jobData.field,
        job_requirements: JSON.stringify(jobData.requirements),
        job_tags: jobData.tags,
        job_status: jobData.status,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job updated successfully",
      });

      return data;
    } catch (err: any) {
      console.error('Job update error:', err);
      toast({
        title: "Error",
        description: err.message || 'Failed to update job',
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const duplicateJob = useCallback(async (jobId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('duplicate_job', {
        job_id: jobId,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job duplicated successfully",
      });

      return data;
    } catch (err: any) {
      console.error('Job duplication error:', err);
      toast({
        title: "Error",
        description: err.message || 'Failed to duplicate job',
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const bulkUpdateJobStatus = useCallback(async (jobIds: string[], status: Job['status']) => {
    try {
      setLoading(true);
      
      const updates = jobIds.map(jobId =>
        supabase
          .from('jobs')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', jobId)
      );

      const results = await Promise.all(updates);
      
      const errors = results.filter(result => result.error);
      if (errors.length > 0) {
        throw new Error(`Failed to update ${errors.length} jobs`);
      }

      toast({
        title: "Success",
        description: `Updated ${jobIds.length} jobs successfully`,
      });

      return true;
    } catch (err: any) {
      console.error('Bulk update error:', err);
      toast({
        title: "Error",
        description: err.message || 'Failed to update jobs',
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    createJob,
    updateJob,
    duplicateJob,
    bulkUpdateJobStatus,
    loading,
  };
};
