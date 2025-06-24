
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminStats } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

// Request cache for deduplication
const statsCache = new Map<string, { data: AdminStats; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStats = useCallback(async (skipCache = false) => {
    const cacheKey = 'admin-stats';
    const now = Date.now();
    
    // Return cached data if available and not expired
    if (!skipCache && statsCache.has(cacheKey)) {
      const cached = statsCache.get(cacheKey)!;
      if (now - cached.timestamp < CACHE_DURATION) {
        setStats(cached.data);
        setLoading(false);
        return cached.data;
      }
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.rpc('get_admin_stats');

      if (error) throw error;

      const statsData = data as unknown as AdminStats;
      
      // Cache the result
      statsCache.set(cacheKey, { data: statsData, timestamp: now });
      
      setStats(statsData);
      return statsData;
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

  // Debounced refetch function
  const debouncedRefetch = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fetchStats(true), 300);
    };
  }, [fetchStats]);

  useEffect(() => {
    fetchStats();
    
    // Set up real-time subscription with debouncing
    const channel = supabase
      .channel('admin-stats-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' }, 
        debouncedRefetch
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'jobs' }, 
        debouncedRefetch
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'applications' }, 
        debouncedRefetch
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'enrollments' }, 
        debouncedRefetch
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStats, debouncedRefetch]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
