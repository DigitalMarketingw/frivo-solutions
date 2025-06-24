
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { AdminUserManagement } from '@/components/admin/AdminUserManagement';
import { AdminJobManagement } from '@/components/admin/AdminJobManagement';
import { AdminApplicationManagement } from '@/components/admin/AdminApplicationManagement';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { NotificationCenter } from '@/components/admin/NotificationCenter';
import { LiveStatusIndicator } from '@/components/admin/LiveStatusIndicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAdminStats } from '@/hooks/useAdminStats';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import { useAdminJobs } from '@/hooks/useAdminJobs';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { RefreshCw } from 'lucide-react';
import { User, Job } from '@/types/admin';

const Admin = () => {
  const { stats, loading: statsLoading, refetch: refetchStats } = useAdminStats();
  
  // Users state
  const [usersParams, setUsersParams] = useState({ page: 1, limit: 10, search: '' });
  const { users, loading: usersLoading, updateUserRole, refetch: refetchUsers } = useAdminUsers(usersParams);
  
  // Jobs state  
  const [jobsParams, setJobsParams] = useState({ page: 1, limit: 10, search: '' });
  const { jobs, loading: jobsLoading, deleteJob, refetch: refetchJobs } = useAdminJobs(jobsParams);
  
  // Real-time updates
  useRealTimeUpdates({
    onUserUpdate: refetchUsers,
    onJobUpdate: refetchJobs,
    onStatsUpdate: refetchStats,
  });

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    loading: boolean;
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
    loading: false,
  });

  const handleDeleteJob = (job: Job) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Job',
      description: `Are you sure you want to delete "${job.title}" at ${job.company}? This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, loading: true }));
        await deleteJob(job.id);
        setConfirmDialog(prev => ({ ...prev, open: false, loading: false }));
      },
      loading: false,
    });
  };

  const handleUpdateUserRole = (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    setConfirmDialog({
      open: true,
      title: 'Update User Role',
      description: `Are you sure you want to ${newRole === 'admin' ? 'promote' : 'demote'} ${user.full_name || user.id} to ${newRole}?`,
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, loading: true }));
        await updateUserRole(user.id, newRole);
        setConfirmDialog(prev => ({ ...prev, open: false, loading: false }));
      },
      loading: false,
    });
  };

  const handleManualRefresh = () => {
    refetchStats();
    refetchUsers();
    refetchJobs();
  };

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      description="Manage users, jobs, and applications"
      actions={
        <div className="flex items-center gap-2">
          <LiveStatusIndicator />
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={statsLoading || usersLoading || jobsLoading}
          >
            <RefreshCw className={`h-4 w-4 ${(statsLoading || usersLoading || jobsLoading) ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <NotificationCenter />
        </div>
      }
    >
      <AdminStatsCards stats={stats} loading={statsLoading} />

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <AdminUserManagement
            users={users}
            loading={usersLoading}
            searchParams={usersParams}
            onSearchChange={(value) => setUsersParams(prev => ({ ...prev, search: value, page: 1 }))}
            onPageChange={(page) => setUsersParams(prev => ({ ...prev, page }))}
            onPageSizeChange={(limit) => setUsersParams(prev => ({ ...prev, limit, page: 1 }))}
            onUpdateUserRole={handleUpdateUserRole}
          />
        </TabsContent>

        <TabsContent value="jobs">
          <AdminJobManagement
            jobs={jobs}
            loading={jobsLoading}
            searchParams={jobsParams}
            onSearchChange={(value) => setJobsParams(prev => ({ ...prev, search: value, page: 1 }))}
            onPageChange={(page) => setJobsParams(prev => ({ ...prev, page }))}
            onPageSizeChange={(limit) => setJobsParams(prev => ({ ...prev, limit, page: 1 }))}
            onDeleteJob={handleDeleteJob}
          />
        </TabsContent>

        <TabsContent value="applications">
          <AdminApplicationManagement />
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
        loading={confirmDialog.loading}
        variant="destructive"
      />
    </AdminLayout>
  );
};

export default Admin;
