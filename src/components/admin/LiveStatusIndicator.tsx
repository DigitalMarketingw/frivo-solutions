
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

export const LiveStatusIndicator: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    let heartbeatChannel: any;

    const setupHeartbeat = () => {
      heartbeatChannel = supabase
        .channel('heartbeat')
        .on('presence', { event: 'sync' }, () => {
          setIsConnected(true);
          setLastUpdate(new Date());
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setIsConnected(true);
            setLastUpdate(new Date());
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            setIsConnected(false);
          }
        });
    };

    setupHeartbeat();

    // Check connection status periodically
    const interval = setInterval(() => {
      const now = new Date();
      const timeSinceLastUpdate = now.getTime() - lastUpdate.getTime();
      
      // If no updates for more than 30 seconds, consider disconnected
      if (timeSinceLastUpdate > 30000) {
        setIsConnected(false);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (heartbeatChannel) {
        supabase.removeChannel(heartbeatChannel);
      }
    };
  }, [lastUpdate]);

  return (
    <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1">
      {isConnected ? (
        <>
          <Wifi className="h-3 w-3" />
          Live
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3" />
          Offline
        </>
      )}
    </Badge>
  );
};
