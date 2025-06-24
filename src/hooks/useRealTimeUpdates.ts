
import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseRealTimeUpdatesProps {
  onUserUpdate?: () => void;
  onJobUpdate?: () => void;
  onApplicationUpdate?: () => void;
  onStatsUpdate?: () => void;
}

export const useRealTimeUpdates = ({
  onUserUpdate,
  onJobUpdate,
  onApplicationUpdate,
  onStatsUpdate,
}: UseRealTimeUpdatesProps = {}) => {
  const { toast } = useToast();

  const showNotification = useCallback((message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    toast({
      title: "Real-time Update",
      description: message,
      variant: type === 'warning' ? 'destructive' : 'default',
    });
  }, [toast]);

  useEffect(() => {
    const channels: any[] = [];

    // Subscribe to profiles (users) changes
    if (onUserUpdate) {
      const profilesChannel = supabase
        .channel('profiles-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'profiles'
          },
          (payload) => {
            console.log('Profile change detected:', payload);
            onUserUpdate();
            
            if (payload.eventType === 'INSERT') {
              showNotification('New user registered', 'success');
            } else if (payload.eventType === 'UPDATE') {
              showNotification('User profile updated', 'info');
            }
            
            onStatsUpdate?.();
          }
        )
        .subscribe();
      
      channels.push(profilesChannel);
    }

    // Subscribe to jobs changes
    if (onJobUpdate) {
      const jobsChannel = supabase
        .channel('jobs-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'jobs'
          },
          (payload) => {
            console.log('Job change detected:', payload);
            onJobUpdate();
            
            if (payload.eventType === 'INSERT') {
              showNotification('New job posted', 'success');
            } else if (payload.eventType === 'UPDATE') {
              const newRecord = payload.new as any;
              if (newRecord?.deleted_at) {
                showNotification('Job deleted', 'warning');
              } else {
                showNotification('Job updated', 'info');
              }
            }
            
            onStatsUpdate?.();
          }
        )
        .subscribe();
      
      channels.push(jobsChannel);
    }

    // Subscribe to applications changes
    if (onApplicationUpdate) {
      const applicationsChannel = supabase
        .channel('applications-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'applications'
          },
          (payload) => {
            console.log('Application change detected:', payload);
            onApplicationUpdate();
            
            if (payload.eventType === 'INSERT') {
              showNotification('New job application received', 'success');
            } else if (payload.eventType === 'UPDATE') {
              showNotification('Application status updated', 'info');
            }
            
            onStatsUpdate?.();
          }
        )
        .subscribe();
      
      channels.push(applicationsChannel);
    }

    // Cleanup function
    return () => {
      channels.forEach(channel => {
        supabase.removeChannel(channel);
      });
    };
  }, [onUserUpdate, onJobUpdate, onApplicationUpdate, onStatsUpdate, showNotification]);

  return {
    showNotification,
  };
};
