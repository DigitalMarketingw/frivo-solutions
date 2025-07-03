
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Building, MapPin, Calendar, Briefcase, DollarSign, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface JobDetailModalProps {
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
  onApply: (jobId: string) => void;
  paymentStatus?: { has_paid: boolean; plan_type: string | null; paid_at: string | null } | null;
  paymentLoading: boolean;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  jobId,
  isOpen,
  onClose,
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
    enabled: isOpen && !!jobId,
  });

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!job) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 mb-4">
            {job.title}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Company Info */}
            <div className="flex flex-wrap items-center gap-4 text-slate-600 bg-slate-50 rounded-lg p-4">
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
            {job.requirements && Array.isArray(job.requirements) && job.requirements.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Requirements</h3>
                <div className="grid gap-2">
                  {job.requirements.map((req: string, index: number) => (
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
                  {job.tags.map((tag: string, index: number) => (
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

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-medium">
              {getPaymentStatusText()}
            </span>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => onApply(job.id)}
              disabled={paymentLoading}
              className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {getApplyButtonText()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
