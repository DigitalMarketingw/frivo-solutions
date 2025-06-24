
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { EnhancedJobManagement } from '@/components/admin/EnhancedJobManagement';
import { AdminUserManagement } from '@/components/admin/AdminUserManagement';
import { EnhancedApplicationManagement } from '@/components/admin/EnhancedApplicationManagement';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { LiveStatusIndicator } from '@/components/admin/LiveStatusIndicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdminStats } from '@/hooks/useAdminStats';
import { useAdminJobs } from '@/hooks/useAdminJobs';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { Job, User } from '@/types/admin';
import { 
  Users, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Plus, 
  Settings,
  Activity,
  TrendingUp
} from 'lucide-react';

const Admin = () => {
  // Search and pagination states
  const [jobSearchParams, setJobSearchParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const [userSearchParams, setUserSearchParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  // Data hooks
  const { stats, loading: statsLoading, refetch: refetchStats } = useAdminStats();
  const { 
    jobs, 
    loading: jobsLoading, 
    refetch: refetchJobs, 
    deleteJob 
  } = useAdminJobs(jobSearchParams);
  const { 
    users, 
    loading: usersLoading, 
    refetch: refetchUsers,
    updateUserRole 
  } = useAdminUsers(userSearchParams);

  // Real-time updates
  useRealTimeUpdates({
    onUserUpdate: refetchUsers,
    onJobUpdate: refetchJobs,
    onStatsUpdate: refetchStats,
  });

  // Job management handlers
  const handleJobSearchChange = (search: string) => {
    setJobSearchParams(prev => ({ ...prev, search, page: 1 }));
  };

  const handleJobPageChange = (page: number) => {
    setJobSearchParams(prev => ({ ...prev, page }));
  };

  const handleJobPageSizeChange = (limit: number) => {
    setJobSearchParams(prev => ({ ...prev, limit, page: 1 }));
  };

  const handleDeleteJob = async (job: Job) => {
    await deleteJob(job.id);
  };

  // User management handlers
  const handleUserSearchChange = (search: string) => {
    setUserSearchParams(prev => ({ ...prev, search, page: 1 }));
  };

  const handleUserPageChange = (page: number) => {
    setUserSearchParams(prev => ({ ...prev, page }));
  };

  const handleUserPageSizeChange = (limit: number) => {
    setUserSearchParams(prev => ({ ...prev, limit, page: 1 }));
  };

  const handleUpdateUserRole = async (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    await updateUserRole(user.id, newRole);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Admin Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
                  <p className="text-xl text-muted-foreground">Complete platform management and analytics</p>
                </div>
              </div>
              
              {/* Quick Stats Summary */}
              {stats && (
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{stats.total_users} Total Users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{stats.total_jobs} Jobs Posted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>{stats.total_applications} Applications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>{stats.active_enrollments} Active Enrollments</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <LiveStatusIndicator />
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Activity className="h-3 w-3" />
                <span>Live Updates</span>
              </Badge>
            </div>
          </div>

          {/* Enhanced Stats Overview */}
          <AdminStatsCard stats={stats} loading={statsLoading} />

          {/* Main Admin Management Tabs */}
          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="jobs" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Job Management</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Applications</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>User Management</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5" />
                      <span>Job Management System</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{jobs.total} Total Jobs</Badge>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Quick Actions
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <EnhancedJobManagement
                    jobs={jobs}
                    loading={jobsLoading}
                    searchParams={jobSearchParams}
                    onSearchChange={handleJobSearchChange}
                    onPageChange={handleJobPageChange}
                    onPageSizeChange={handleJobPageSizeChange}
                    onDeleteJob={handleDeleteJob}
                    onRefresh={refetchJobs}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Application Management System</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <EnhancedApplicationManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>User Management System</span>
                    </CardTitle>
                    <Badge variant="outline">{users.total} Total Users</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <AdminUserManagement
                    users={users}
                    loading={usersLoading}
                    searchParams={userSearchParams}
                    onSearchChange={handleUserSearchChange}
                    onPageChange={handleUserPageChange}
                    onPageSizeChange={handleUserPageSizeChange}
                    onUpdateUserRole={handleUpdateUserRole}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Advanced Analytics Dashboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <AnalyticsDashboard />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default Admin;
