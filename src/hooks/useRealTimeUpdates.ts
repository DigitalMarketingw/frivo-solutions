
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RealTimeUpdateHandlers {
  onUserUpdate?: () => void;
  onJobUpdate?: () => void;
  onStatsUpdate?: () => void;
  onApplicationUpdate?: () => void;
}

export const useRealTimeUpdates = (handlers: RealTimeUpdateHandlers) => {
  useEffect(() => {
    const channels: any[] = [];

    // Listen for user updates
    if (handlers.onUserUpdate) {
      const userChannel = supabase
        .channel('admin-users-realtime')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'profiles' }, 
          handlers.onUserUpdate
        )
        .subscribe();
      channels.push(userChannel);
    }

    // Listen for job updates
    if (handlers.onJobUpdate) {
      const jobChannel = supabase
        .channel('admin-jobs-realtime')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'jobs' }, 
          handlers.onJobUpdate
        )
        .subscribe();
      channels.push(jobChannel);
    }

    // Listen for application updates
    if (handlers.onApplicationUpdate) {
      const appChannel = supabase
        .channel('admin-applications-realtime')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'applications' }, 
          handlers.onApplicationUpdate
        )
        .subscribe();
      channels.push(appChannel);
    }

    // Listen for general stats updates
    if (handlers.onStatsUpdate) {
      const statsChannel = supabase
        .channel('admin-stats-realtime')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'enrollments' }, 
          handlers.onStatsUpdate
        )
        .subscribe();
      channels.push(statsChannel);
    }

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [handlers.onUserUpdate, handlers.onJobUpdate, handlers.onStatsUpdate, handlers.onApplicationUpdate]);
};
