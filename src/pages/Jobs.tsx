
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaymentGate } from '@/components/PaymentGate';
import { usePaymentStatus } from '@/hooks/usePaymentStatus';
import { useToast } from '@/hooks/use-toast';
import { Search, MapPin, Building, Calendar, Briefcase, DollarSign } from 'lucide-react';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const { toast } = useToast();
  const { data: paymentStatus, isLoading: paymentLoading } = usePaymentStatus();

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

  const handleApplyClick = async (jobId: string) => {
    if (paymentLoading) return;

    if (!paymentStatus?.has_paid) {
      setShowPaymentGate(true);
      return;
    }

    // Proceed with application
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to apply for jobs.",
          variant: "destructive",
        });
        return;
      }

      // Check if user already applied
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
            Available Jobs
          </h1>
          <p className="text-xl text-slate-600">
            Find your next career opportunity from our curated job listings
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6 mb-8">
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
                {paymentStatus?.has_paid ? 'Unlimited Applications' : 'Payment Required'}
              </span>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs?.map((job) => (
              <Card key={job.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-slate-900">{job.title}</CardTitle>
                      <div className="flex items-center gap-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(job.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary border-primary/20">
                        {job.field}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-slate-700 line-clamp-3">{job.description}</p>
                  
                  {job.requirements && Array.isArray(job.requirements) && job.requirements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{job.requirements.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Full-time position</span>
                    </div>
                    
                    <Button
                      onClick={() => handleApplyClick(job.id)}
                      className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {paymentStatus?.has_paid ? 'Apply Now' : 'Apply Now (Payment Required)'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredJobs?.length === 0 && (
              <Card className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Briefcase className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">No Jobs Found</h3>
                  <p className="text-slate-600 text-lg">
                    Try adjusting your search criteria or check back later for new opportunities.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Jobs;
