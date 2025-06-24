
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ApplicationTimelineProps {
  applicationId: string;
}

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({ applicationId }) => {
  const { data: timeline, isLoading } = useQuery({
    queryKey: ['application-timeline', applicationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('application_timeline')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'under_review':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading timeline...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline?.map((entry, index) => (
            <div key={entry.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                {getStatusIcon(entry.status)}
                {index < timeline.length - 1 && (
                  <div className="w-px h-8 bg-gray-200 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">
                    {entry.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(entry.created_at).toLocaleString()}
                  </span>
                </div>
                {entry.message && (
                  <p className="text-sm text-gray-700 mb-2">{entry.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
