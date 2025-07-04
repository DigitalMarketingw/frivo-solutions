
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Building, MapPin, Calendar, Briefcase, DollarSign, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface JobDetailsPanelProps {
  jobId: string | null;
  onApply: (jobId: string) => void;
  paymentStatus?: { has_paid: boolean; plan_type: string | null; paid_at: string | null } | null;
  paymentLoading: boolean;
}

export const JobDetailsPanel: React.FC<JobDetailsPanelProps> = ({
  jobId,
  onApply,
  paymentStatus,
  paymentLoading
}) => {
  const { user } = useAuth();
  
  const { data: job, isLoading } = useQuery({
    queryKey: ['job-detail', jobId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!jobId,
  });

  const getApplyButtonText = () => {
    if (!user) return 'Sign In to Apply';
    if (paymentLoading) return 'Loading...';
    if (paymentStatus?.has_paid) return 'Apply Now';
    return 'Apply Now ($499)';
  };

  const getPaymentStatusText = () => {
    if (!user) return 'Sign In Required';
    if (paymentStatus?.has_paid) return 'Ready to Apply';
    return 'Payment Required ($499)';
  };

  if (!jobId) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50/50 rounded-lg border-2 border-dashed border-slate-200">
        <div className="text-center p-8">
          <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">Select a job to view details</h3>
          <p className="text-slate-500">Choose a job from the list to see full details and apply</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) return null;

  // Safely handle requirements as Json type
  const getRequirements = () => {
    if (!job.requirements) return [];
    if (Array.isArray(job.requirements)) {
      return job.requirements.filter(req => typeof req === 'string') as string[];
    }
    return [];
  };

  const requirements = getRequirements();

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border shadow-sm">
      <CardHeader className="border-b bg-slate-50/50">
        <CardTitle className="text-2xl font-bold text-slate-900 mb-4">
          {job.title}
        </CardTitle>
        
        {/* Company Info */}
        <div className="flex flex-wrap items-center gap-4 text-slate-600">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <span className="font-medium text-lg">{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary border-primary/20">
              {job.field}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {/* Job Description */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Job Description</h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>
          </div>

          {/* Requirements */}
          {requirements.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Requirements</h3>
              <div className="grid gap-2">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {job.tags && job.tags.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-slate-900">Employment Type</h4>
            </div>
            <p className="text-slate-700">Full-time position</p>
          </div>
        </div>
      </ScrollArea>

      {/* Apply Button Section */}
      <div className="border-t bg-slate-50/50 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-medium">
              {getPaymentStatusText()}
            </span>
          </div>
          
          <Button
            onClick={() => onApply(job.id)}
            disabled={paymentLoading}
            size="lg"
            className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {getApplyButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
};
