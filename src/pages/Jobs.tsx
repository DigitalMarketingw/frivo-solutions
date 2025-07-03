
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaymentGate } from '@/components/PaymentGate';
import { usePaymentStatus } from '@/hooks/usePaymentStatus';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Search, DollarSign, Briefcase } from 'lucide-react';
import { JobListItem } from '@/components/jobs/JobListItem';
import { JobDetailsPanel } from '@/components/jobs/JobDetailsPanel';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Only call payment status hook if user is authenticated
  const { data: paymentStatus, isLoading: paymentLoading } = usePaymentStatus();
  const shouldCheckPayment = !!user;

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .is('deleted_at', null)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = selectedField === 'all' || job.field === selectedField;
    return matchesSearch && matchesField;
  });

  // Auto-select first job when jobs load
  useEffect(() => {
    if (filteredJobs && filteredJobs.length > 0 && !selectedJobId) {
      setSelectedJobId(filteredJobs[0].id);
    }
  }, [filteredJobs, selectedJobId]);

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const handleApplyClick = async (jobId: string) => {
    if (!user) {
      window.location.href = `/auth?returnUrl=${encodeURIComponent('/jobs')}`;
      return;
    }

    if (paymentLoading) return;

    if (!paymentStatus?.has_paid) {
      setShowPaymentGate(true);
      return;
    }

    // Proceed with application
    try {
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .single();

      if (existingApplication) {
        toast({
          title: "Already Applied",
          description: "You have already applied for this job.",
          variant: "destructive",
        });
        return;
      }

      // Create enrollment first
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          job_id: jobId,
          enrollment_status: 'enrolled'
        })
        .select()
        .single();

      if (enrollmentError) throw enrollmentError;

      // Create application
      const { error: applicationError } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          job_id: jobId,
          enrollment_id: enrollment.id,
          status: 'applied'
        });

      if (applicationError) throw applicationError;

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!",
      });

    } catch (error: any) {
      toast({
        title: "Application Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleViewPlans = () => {
    window.location.href = '/pricing';
  };

  if (showPaymentGate) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto p-6">
          <PaymentGate onViewPlans={handleViewPlans} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
            Available Jobs
          </h1>
          <p className="text-xl text-slate-600">
            Find your next career opportunity from our curated job listings
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search jobs, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-slate-300 focus:border-primary focus:ring-primary"
              />
            </div>
            
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="h-12 border-slate-300 focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg px-4 border border-green-200/50">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-medium">
                {user ? (shouldCheckPayment && paymentStatus?.has_paid ? 'Unlimited Applications' : 'Payment Required') : 'Sign In to Apply'}
              </span>
            </div>
          </div>
        </div>

        {/* Split Screen Layout */}
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6 h-[calc(100vh-400px)] min-h-[600px]">
            {/* Left Side - Job List */}
            <div className="lg:col-span-2 space-y-4 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  {filteredJobs?.length || 0} Jobs Found
                </h2>
              </div>
              
              <div className="space-y-3 overflow-y-auto h-full pr-2">
                {filteredJobs?.map((job) => (
                  <JobListItem
                    key={job.id}
                    job={job}
                    isSelected={selectedJobId === job.id}
                    onClick={() => handleJobClick(job.id)}
                    userHasPaid={shouldCheckPayment && paymentStatus?.has_paid || false}
                  />
                ))}
                
                {filteredJobs?.length === 0 && (
                  <div className="text-center py-12">
                    <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-600 mb-2">No Jobs Found</h3>
                    <p className="text-slate-500">
                      Try adjusting your search criteria or check back later for new opportunities.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Job Details */}
            <div className="lg:col-span-3">
              <JobDetailsPanel
                jobId={selectedJobId}
                onApply={handleApplyClick}
                paymentStatus={paymentStatus}
                paymentLoading={paymentLoading}
              />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Jobs;
