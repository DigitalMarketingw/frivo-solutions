
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminStats } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the database function for efficient stats fetching
      const { data, error } = await supabase.rpc('get_admin_stats');

      if (error) throw error;

      // Type cast the Json response to AdminStats
      setStats(data as AdminStats);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch admin statistics';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
