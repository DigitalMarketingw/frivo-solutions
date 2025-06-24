import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, MapPin, Building, Calendar, DollarSign, Briefcase, Star, TrendingUp, Filter } from 'lucide-react';

const Jobs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [applying, setApplying] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to apply for jobs.",
        variant: "destructive",
      });
      return;
    }

    setApplying(jobId);

    try {
      // Check if user already has an enrollment for this job
      const { data: existingEnrollment, error: enrollmentCheckError } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .single();

      if (enrollmentCheckError && enrollmentCheckError.code !== 'PGRST116') {
        throw enrollmentCheckError;
      }

      let enrollmentId;

      if (existingEnrollment) {
        enrollmentId = existingEnrollment.id;
      } else {
        // Create enrollment first
        const { data: enrollment, error: enrollmentError } = await supabase
          .from('enrollments')
          .insert({
            user_id: user.id,
            job_id: jobId,
            enrollment_status: 'pending'
          })
          .select('id')
          .single();

        if (enrollmentError) throw enrollmentError;
        enrollmentId = enrollment.id;
      }

      // Check if application already exists
      const { data: existingApplication, error: applicationCheckError } = await supabase
        .from('applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .single();

      if (applicationCheckError && applicationCheckError.code !== 'PGRST116') {
        throw applicationCheckError;
      }

      if (existingApplication) {
        toast({
          title: "Already Applied",
          description: "You have already applied for this position.",
          variant: "destructive",
        });
        return;
      }

      // Create application
      const { error: applicationError } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          job_id: jobId,
          enrollment_id: enrollmentId,
          status: 'applied',
          payment_required: true,
          payment_amount: 49900 // $499 in cents
        });

      if (applicationError) throw applicationError;

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully. You will be contacted soon with next steps.",
      });

    } catch (error: any) {
      console.error('Application error:', error);
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setApplying(null);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-slate-600 animate-pulse">Loading premium opportunities...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <Star className="h-4 w-4 mr-2 fill-current" />
              Premium Opportunities
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-slate-900">Available</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover your next career move with our premium job placement program. 
              Exclusive positions from top-tier companies waiting for talented individuals like you.
            </p>
          </div>

          {/* Enhanced Search */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search jobs by title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-primary/5 rounded-xl"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-0">
              <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{filteredJobs.length}</p>
                    <p className="text-sm text-slate-600">Available Jobs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">95%</p>
                    <p className="text-sm text-slate-600">Success Rate</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">Premium</p>
                    <p className="text-sm text-slate-600">Quality Jobs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Jobs Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-slate-600 font-medium">
                        <div className="w-6 h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                          <Building className="h-3 w-3 text-slate-600" />
                        </div>
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary border-primary/30 font-medium">
                      {job.field}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 bg-slate-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-3 w-3" />
                      </div>
                      {job.location}
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-3 w-3" />
                      </div>
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.tags.slice(0, 3).map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                      {job.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                          +{job.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-emerald-700">Premium Placement</p>
                          <p className="text-xs text-emerald-600">Guaranteed process</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleApply(job.id)}
                        disabled={applying === job.id}
                        className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      >
                        {applying === job.id ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Applying...</span>
                          </div>
                        ) : (
                          'Apply Now'
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No jobs found</h3>
              <p className="text-slate-600 text-lg">Try adjusting your search criteria to find more opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Jobs;
