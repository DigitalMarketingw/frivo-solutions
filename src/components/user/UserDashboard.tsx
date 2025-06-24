
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ApplicationTimeline } from './ApplicationTimeline';
import { NotificationCenter } from './NotificationCenter';
import { PaymentHandler } from './PaymentHandler';
import { Clock, CheckCircle, XCircle, AlertCircle, DollarSign, FileText, Bell } from 'lucide-react';
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
          jobs!inner(title, company, field),
          application_timeline(status, message, created_at)
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
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
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

  const handlePayment = async (applicationId: string, amount: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { applicationId, amount }
      });

      if (error) throw error;
      
      // Open Stripe checkout in a new tab
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
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <NotificationCenter notifications={notifications || []} />
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="timeline">Application Timeline</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          {applications?.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
                <p className="text-gray-600 mb-4">Start by browsing available jobs and submitting your first application.</p>
                <Button onClick={() => window.location.href = '/jobs'}>
                  Browse Jobs
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {applications?.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{application.jobs.title}</CardTitle>
                        <p className="text-sm text-gray-600">{application.jobs.company}</p>
                        <Badge variant="outline" className="mt-1">
                          {application.jobs.field}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(application.status)}
                        <Badge variant={
                          application.status === 'approved' ? 'default' :
                          application.status === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {application.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Application Progress</span>
                          <span>{getStatusProgress(application.status)}%</span>
                        </div>
                        <Progress value={getStatusProgress(application.status)} className="h-2" />
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Applied: {new Date(application.applied_at).toLocaleDateString()}</span>
                        <span>
                          Assignment: {application.assignment_completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>

                      {application.payment_required && application.payment_status !== 'completed' && (
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium">Payment Required</span>
                            </div>
                            <PaymentHandler
                              applicationId={application.id}
                              amount={application.payment_amount || 0}
                              onPayment={handlePayment}
                            />
                          </div>
                          {application.payment_due_date && (
                            <p className="text-xs text-gray-500 mt-1">
                              Due: {new Date(application.payment_due_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedApplication(application.id)}
                        >
                          View Timeline
                        </Button>
                        {application.hackerrank_link && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(application.hackerrank_link, '_blank')}
                          >
                            View Assignment
                          </Button>
                        )}
                      </div>
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
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600">Select an application to view its timeline</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications">
          <div className="space-y-4">
            {notifications?.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
