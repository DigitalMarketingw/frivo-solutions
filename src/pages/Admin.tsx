
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { EnhancedJobManagement } from '@/components/admin/EnhancedJobManagement';
import { AdminUserManagement } from '@/components/admin/AdminUserManagement';
import { EnhancedApplicationManagement } from '@/components/admin/EnhancedApplicationManagement';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { LiveStatusIndicator } from '@/components/admin/LiveStatusIndicator';
import { NotificationCenter } from '@/components/admin/NotificationCenter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminStats } from '@/hooks/useAdminStats';
import { useAdminJobs } from '@/hooks/useAdminJobs';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { Job, User } from '@/types/admin';

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
    <AdminLayout 
      title="Admin Dashboard" 
      description="Manage jobs, applications, and users"
      actions={
        <div className="flex items-center space-x-4">
          <LiveStatusIndicator />
          <NotificationCenter />
        </div>
      }
    >
      <div className="space-y-8">
        {/* Stats Overview */}
        <AdminStatsCards stats={stats} loading={statsLoading} />

        {/* Main Admin Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <EnhancedApplicationManagement />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <AdminUserManagement
              users={users}
              loading={usersLoading}
              searchParams={userSearchParams}
              onSearchChange={handleUserSearchChange}
              onPageChange={handleUserPageChange}
              onPageSizeChange={handleUserPageSizeChange}
              onUpdateUserRole={handleUpdateUserRole}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Admin;
