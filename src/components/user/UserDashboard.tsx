
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ApplicationTimeline } from './ApplicationTimeline';
import { NotificationCenter } from './NotificationCenter';
import { PaymentHandler } from './PaymentHandler';
import { Clock, CheckCircle, XCircle, AlertCircle, DollarSign, FileText, Bell, Briefcase, TrendingUp, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const UserDashboard: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ['user-applications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs!applications_job_id_fkey(title, company, field)
        `)
        .eq('user_id', user.id)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: notifications } = useQuery({
    queryKey: ['user-notifications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'under_review':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'applied': return 25;
      case 'under_review': return 50;
      case 'test_assigned': return 75;
      case 'approved': return 100;
      case 'rejected': return 0;
      default: return 0;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-500';
      case 'under_review': return 'bg-amber-500';
      case 'test_assigned': return 'bg-purple-500';
      case 'approved': return 'bg-emerald-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const handlePayment = async (applicationId: string, amount: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { applicationId, amount }
      });

      if (error) throw error;
      
      window.open(data.url, '_blank');
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
            My Dashboard
          </h1>
          <p className="text-slate-600 text-lg">Track your applications and manage your career journey</p>
        </div>
        <NotificationCenter notifications={notifications || []} />
      </div>

      {/* Enhanced Stats Overview */}
      {applications && applications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium mb-1">Total Applications</p>
                  <p className="text-3xl font-bold text-blue-900">{applications.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 text-sm font-medium mb-1">Approved</p>
                  <p className="text-3xl font-bold text-emerald-900">
                    {applications.filter(app => app.status === 'approved').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-600 text-sm font-medium mb-1">Under Review</p>
                  <p className="text-3xl font-bold text-amber-900">
                    {applications.filter(app => app.status === 'under_review').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-purple-900">
                    {applications.length > 0 ? Math.round((applications.filter(app => app.status === 'approved').length / applications.length) * 100) : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="bg-white border shadow-sm">
          <TabsTrigger value="applications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            My Applications
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Application Timeline
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {applications?.length === 0 ? (
            <Card className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">No Applications Yet</h3>
                <p className="text-slate-600 mb-8 text-lg">Start your career journey by browsing available jobs and submitting your first application.</p>
                <Button 
                  onClick={() => window.location.href = '/jobs'}
                  className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Browse Jobs
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {applications?.map((application) => (
                <Card key={application.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-xl text-slate-900">{application.jobs?.title}</CardTitle>
                        <p className="text-slate-600 font-medium">{application.jobs?.company}</p>
                        <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary border-primary/20">
                          {application.jobs?.field}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(application.status)}
                        <Badge 
                          variant={
                            application.status === 'approved' ? 'default' :
                            application.status === 'rejected' ? 'destructive' : 'secondary'
                          }
                          className="shadow-sm"
                        >
                          {application.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex justify-between text-sm mb-3">
                        <span className="font-medium text-slate-700">Application Progress</span>
                        <span className="font-bold text-primary">{getStatusProgress(application.status)}%</span>
                      </div>
                      <Progress 
                        value={getStatusProgress(application.status)} 
                        className="h-3 bg-slate-200" 
                      />
                    </div>

                    <div className="flex justify-between text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                      <span>Applied: {new Date(application.applied_at).toLocaleDateString()}</span>
                      <span className="flex items-center">
                        Assignment: 
                        <Badge 
                          variant={application.assignment_completed ? "default" : "secondary"} 
                          className="ml-2 text-xs"
                        >
                          {application.assignment_completed ? 'Completed' : 'Pending'}
                        </Badge>
                      </span>
                    </div>

                    {application.payment_required && application.payment_status !== 'completed' && (
                      <div className="border-t pt-4">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-green-900">Payment Required</p>
                                <p className="text-sm text-green-700">Complete payment to proceed</p>
                              </div>
                            </div>
                            <PaymentHandler
                              applicationId={application.id}
                              amount={application.payment_amount || 0}
                              onPayment={handlePayment}
                            />
                          </div>
                          {application.payment_due_date && (
                            <p className="text-xs text-green-600 mt-2 ml-13">
                              Due: {new Date(application.payment_due_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedApplication(application.id)}
                        className="flex-1 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                      >
                        View Timeline
                      </Button>
                      {application.hackerrank_link && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(application.hackerrank_link, '_blank')}
                          className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        >
                          View Assignment
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline">
          {selectedApplication ? (
            <ApplicationTimeline applicationId={selectedApplication} />
          ) : (
            <Card className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Select an Application</h3>
                <p className="text-slate-600">Choose an application from the list to view its detailed timeline</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications">
          <div className="space-y-4">
            {notifications?.map((notification) => (
              <Card key={notification.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 text-lg">{notification.title}</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">{notification.message}</p>
                      <p className="text-xs text-slate-400 mt-3 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
