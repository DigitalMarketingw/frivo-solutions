
import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseRealTimeUpdatesProps {
  onUserUpdate?: () => void;
  onJobUpdate?: () => void;
  onApplicationUpdate?: () => void;
  onStatsUpdate?: () => void;
}

// Global subscription manager to prevent duplicate subscriptions
const activeSubscriptions = new Map<string, any>();

export const useRealTimeUpdates = ({
  onUserUpdate,
  onJobUpdate,
  onApplicationUpdate,
  onStatsUpdate,
}: UseRealTimeUpdatesProps = {}) => {
  const { toast } = useToast();
  const callbacksRef = useRef({ onUserUpdate, onJobUpdate, onApplicationUpdate, onStatsUpdate });
  
  // Update callbacks ref when props change
  callbacksRef.current = { onUserUpdate, onJobUpdate, onApplicationUpdate, onStatsUpdate };

  // Debounced notification function
  const showNotification = useCallback((message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    if (typeof (window as any).addNotification === 'function') {
      (window as any).addNotification(message, type);
    } else {
      toast({
        title: "Real-time Update",
        description: message,
        variant: type === 'warning' ? 'destructive' : 'default',
      });
    }
  }, [toast]);

  // Debounced update functions
  const debouncedCallbacks = useRef<{[key: string]: NodeJS.Timeout}>({});
  
  const debounceCallback = useCallback((key: string, callback: () => void, delay = 1000) => {
    if (debouncedCallbacks.current[key]) {
      clearTimeout(debouncedCallbacks.current[key]);
    }
    
    debouncedCallbacks.current[key] = setTimeout(() => {
      callback();
      delete debouncedCallbacks.current[key];
    }, delay);
  }, []);

  useEffect(() => {
    console.log('Setting up optimized real-time subscriptions...');

    // Subscribe to profiles (users) changes
    if (onUserUpdate && !activeSubscriptions.has('profiles')) {
      const profilesChannel = supabase
        .channel('profiles-changes-optimized')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'profiles'
          },
          (payload) => {
            console.log('Profile change detected:', payload.eventType);
            
            debounceCallback('userUpdate', () => {
              callbacksRef.current.onUserUpdate?.();
              callbacksRef.current.onStatsUpdate?.();
            });
            
            if (payload.eventType === 'INSERT') {
              showNotification('New user registered', 'success');
            } else if (payload.eventType === 'UPDATE') {
              showNotification('User profile updated', 'info');
            }
          }
        )
        .subscribe((status) => {
          console.log('Profiles subscription status:', status);
        });
      
      activeSubscriptions.set('profiles', profilesChannel);
    }

    // Subscribe to jobs changes
    if (onJobUpdate && !activeSubscriptions.has('jobs')) {
      const jobsChannel = supabase
        .channel('jobs-changes-optimized')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'jobs'
          },
          (payload) => {
            console.log('Job change detected:', payload.eventType);
            
            debounceCallback('jobUpdate', () => {
              callbacksRef.current.onJobUpdate?.();
              callbacksRef.current.onStatsUpdate?.();
            });
            
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
          }
        )
        .subscribe((status) => {
          console.log('Jobs subscription status:', status);
        });
      
      activeSubscriptions.set('jobs', jobsChannel);
    }

    // Subscribe to applications changes
    if (onApplicationUpdate && !activeSubscriptions.has('applications')) {
      const applicationsChannel = supabase
        .channel('applications-changes-optimized')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'applications'
          },
          (payload) => {
            console.log('Application change detected:', payload.eventType);
            
            debounceCallback('applicationUpdate', () => {
              callbacksRef.current.onApplicationUpdate?.();
              callbacksRef.current.onStatsUpdate?.();
            });
            
            if (payload.eventType === 'INSERT') {
              showNotification('New job application received', 'success');
            } else if (payload.eventType === 'UPDATE') {
              showNotification('Application status updated', 'info');
            }
          }
        )
        .subscribe((status) => {
          console.log('Applications subscription status:', status);
        });
      
      activeSubscriptions.set('applications', applicationsChannel);
    }

    // Cleanup function
    return () => {
      console.log('Cleaning up real-time subscriptions...');
      
      // Clear all debounced callbacks
      Object.values(debouncedCallbacks.current).forEach(timeout => clearTimeout(timeout));
      debouncedCallbacks.current = {};
    };
  }, [onUserUpdate, onJobUpdate, onApplicationUpdate, onStatsUpdate, showNotification, debounceCallback]);

  return {
    showNotification,
  };
};
