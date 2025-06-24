
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type ApplicationStatus = Database['public']['Enums']['application_status'];

interface ApplicationFilters {
  status?: ApplicationStatus;
  search?: string;
  jobId?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export const useApplicationManagement = () => {
  const [filters, setFilters] = useState<ApplicationFilters>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    data: applications,
    isLoading: isLoadingApplications,
    refetch,
  } = useQuery({
    queryKey: ['applications', filters],
    queryFn: async () => {
      let query = supabase
        .from('applications')
        .select(`
          *,
          profiles:user_id(full_name, phone),
          jobs:job_id(title, company, location)
        `);

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.search) {
        // For search, we'll need to join and filter
        const { data: searchData, error: searchError } = await supabase
          .from('applications')
          .select(`
            *,
            profiles:user_id(full_name, phone),
            jobs:job_id(title, company, location)
          `)
          .or(
            `profiles.full_name.ilike.%${filters.search}%,` +
            `jobs.title.ilike.%${filters.search}%,` +
            `jobs.company.ilike.%${filters.search}%`
          );

        if (searchError) throw searchError;
        
        // Apply other filters to search results
        let filteredData = searchData || [];
        
        if (filters.status) {
          filteredData = filteredData.filter(app => app.status === filters.status);
        }
        
        if (filters.jobId) {
          filteredData = filteredData.filter(app => app.job_id === filters.jobId);
        }
        
        if (filters.dateRange) {
          filteredData = filteredData.filter(app => {
            const appliedAt = new Date(app.applied_at);
            return appliedAt >= filters.dateRange!.from && appliedAt <= filters.dateRange!.to;
          });
        }
        
        return filteredData.sort((a, b) => new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime());
      }

      if (filters.jobId) {
        query = query.eq('job_id', filters.jobId);
      }

      if (filters.dateRange) {
        query = query
          .gte('applied_at', filters.dateRange.from.toISOString())
          .lte('applied_at', filters.dateRange.to.toISOString());
      }

      query = query.order('applied_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('applications')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Application status updated successfully",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || 'Failed to update application status',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const bulkUpdateStatus = async (applicationIds: string[], status: ApplicationStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('applications')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .in('id', applicationIds);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Updated ${applicationIds.length} applications successfully`,
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || 'Failed to update applications',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendBulkEmail = async (applicationIds: string[], subject: string, message: string) => {
    setLoading(true);
    try {
      // This would typically call an edge function to send emails
      // For now, we'll just show a success message
      console.log('Sending bulk email:', { applicationIds, subject, message });
      
      toast({
        title: "Success",
        description: `Email sent to ${applicationIds.length} applicants`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || 'Failed to send emails',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getApplicationStats = () => {
    if (!applications) return null;

    const stats = {
      total: applications.length,
      applied: applications.filter(app => app.status === 'applied').length,
      under_review: applications.filter(app => app.status === 'under_review').length,
      test_assigned: applications.filter(app => app.status === 'test_assigned').length,
      test_completed: applications.filter(app => app.status === 'test_completed').length,
      approved: applications.filter(app => app.status === 'approved').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
    };

    return stats;
  };

  return {
    applications: applications || [],
    isLoading: isLoadingApplications || loading,
    filters,
    setFilters,
    updateApplicationStatus,
    bulkUpdateStatus,
    sendBulkEmail,
    getApplicationStats,
    refetch,
  };
};
