
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminStats } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the optimized database function for efficient stats fetching
      const { data, error } = await supabase.rpc('get_admin_stats');

      if (error) throw error;

      // Type cast the Json response to AdminStats via unknown
      setStats(data as unknown as AdminStats);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch admin statistics';
      setError(errorMessage);
      console.error('Admin stats error:', err);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStats();
    
    // Set up real-time subscription for stats updates
    const channel = supabase
      .channel('admin-stats-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' }, 
        () => fetchStats()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'jobs' }, 
        () => fetchStats()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'applications' }, 
        () => fetchStats()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'enrollments' }, 
        () => fetchStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
