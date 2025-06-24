
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useUserPerformanceMetrics } from '@/hooks/useAnalytics';
import { EmptyAnalyticsState } from './EmptyAnalyticsState';
import { User, TrendingUp, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const UserPerformanceMetrics: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: metrics, isLoading, error, refetch } = useUserPerformanceMetrics(user?.id);

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Success",
        description: "Performance metrics refreshed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh performance metrics",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading your performance metrics...</p>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <User className="h-8 w-8 text-destructive" />
          <p className="text-muted-foreground text-center">
            Failed to load your performance metrics
          </p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const hasData = metrics.total_applications > 0 || metrics.applications_by_field.length > 0;

  if (!hasData) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Performance</h2>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        <EmptyAnalyticsState 
          title="No Personal Data Available"
          description="Your personal performance metrics will appear here once you start applying for jobs. Track your application success rate, popular fields, and recent activity."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Performance</h2>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total_applications}</div>
            <p className="text-xs text-muted-foreground">applications submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.success_rate}%</div>
            <p className="text-xs text-muted-foreground">applications approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.approved_applications}</div>
            <p className="text-xs text-muted-foreground">successful applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.pending_applications}</div>
            <p className="text-xs text-muted-foreground">awaiting response</p>
          </CardContent>
        </Card>
      </div>

      {/* Applications by Field */}
      {metrics.applications_by_field.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Applications by Field</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.applications_by_field.map((field, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{field.field}</span>
                  <Badge variant="secondary">{field.count} applications</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      {metrics.recent_activity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.recent_activity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.job_title}</p>
                    <p className="text-sm text-muted-foreground">{activity.company}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={activity.status === 'approved' ? 'default' : 
                              activity.status === 'rejected' ? 'destructive' : 'secondary'}
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.applied_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
