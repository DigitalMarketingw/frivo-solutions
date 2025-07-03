
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { EnhancedJobManagement } from '@/components/admin/EnhancedJobManagement';
import { AdminUserManagement } from '@/components/admin/AdminUserManagement';
import { EnhancedApplicationManagement } from '@/components/admin/EnhancedApplicationManagement';
import { AdminCompanyManagement } from '@/components/admin/AdminCompanyManagement';
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
  TrendingUp,
  Shield,
  Sparkles,
  Crown,
  Building2
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
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl border border-primary/20">
                  <Crown className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-primary to-blue-700 bg-clip-text text-transparent">
                      Admin Dashboard
                    </h1>
                    <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white border-0 shadow-lg">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                  <p className="text-xl text-slate-600">Complete platform management and analytics suite</p>
                </div>
              </div>
              
              {/* Enhanced Quick Stats Summary */}
              {stats && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-0">
                  <div className="flex items-center space-x-8 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{stats.total_users}</p>
                        <p className="text-slate-600">Total Users</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{stats.total_jobs}</p>
                        <p className="text-slate-600">Jobs Posted</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{stats.total_applications}</p>
                        <p className="text-slate-600">Applications</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{stats.total_enrollments}</p>
                        <p className="text-slate-600">Enrollments</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{stats.total_companies || 0}</p>
                        <p className="text-slate-600">Companies</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <LiveStatusIndicator />
              <Badge variant="secondary" className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200">
                <Activity className="h-3 w-3" />
                <span>Live Updates</span>
              </Badge>
            </div>
          </div>

          {/* Enhanced Stats Overview */}
          <AdminStatsCard stats={stats} loading={statsLoading} />

          {/* Enhanced Main Admin Management Tabs - Updated to include Company Management */}
          <Tabs defaultValue="jobs" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl p-2 h-16">
              <TabsTrigger 
                value="jobs" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 h-12"
              >
                <Briefcase className="h-4 w-4" />
                <span className="font-medium">Jobs</span>
              </TabsTrigger>
              <TabsTrigger 
                value="applications" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 h-12"
              >
                <FileText className="h-4 w-4" />
                <span className="font-medium">Applications</span>
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 h-12"
              >
                <Users className="h-4 w-4" />
                <span className="font-medium">Users</span>
              </TabsTrigger>
              <TabsTrigger 
                value="companies" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 h-12"
              >
                <Building2 className="h-4 w-4" />
                <span className="font-medium">Companies</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 h-12"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="font-medium">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <span>Job Management System</span>
                    </CardTitle>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-white/60 border-primary/30 text-primary">
                        {jobs.total} Total Jobs
                      </Badge>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg">
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
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-t-2xl">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span>Application Management System</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <EnhancedApplicationManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <span>User Management System</span>
                    </CardTitle>
                    <Badge variant="outline" className="bg-white/60 border-emerald-500/30 text-emerald-600">
                      {users.total} Total Users
                    </Badge>
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

            <TabsContent value="companies" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-t-2xl">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <span>Company Management System</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <AdminCompanyManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-t-2xl">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
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
