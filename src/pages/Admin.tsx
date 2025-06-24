
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { NotificationCenter } from '@/components/admin/NotificationCenter';
import { LiveStatusIndicator } from '@/components/admin/LiveStatusIndicator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAdminStats } from '@/hooks/useAdminStats';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import { useAdminJobs } from '@/hooks/useAdminJobs';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { Users, Briefcase, FileText, DollarSign, Edit, Trash2, RefreshCw } from 'lucide-react';
import { User, Job } from '@/types/admin';

const Admin = () => {
  const { stats, loading: statsLoading, refetch: refetchStats } = useAdminStats();
  
  // Users state
  const [usersParams, setUsersParams] = useState({ page: 1, limit: 10, search: '' });
  const { users, loading: usersLoading, updateUserRole, refetch: refetchUsers } = useAdminUsers(usersParams);
  
  // Jobs state  
  const [jobsParams, setJobsParams] = useState({ page: 1, limit: 10, search: '' });
  const { jobs, loading: jobsLoading, deleteJob, updateJobStatus, refetch: refetchJobs } = useAdminJobs(jobsParams);
  
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

  const userColumns = [
    { key: 'full_name', label: 'Name', render: (value: string, user: User) => value || 'Not provided' },
    { key: 'id', label: 'User ID' },
    { key: 'role', label: 'Role', render: (value: string) => <StatusBadge status={value} type="user" /> },
    { key: 'phone', label: 'Phone', render: (value: string) => value || 'Not provided' },
    { key: 'created_at', label: 'Joined', render: (value: string) => new Date(value).toLocaleDateString() },
  ];

  const jobColumns = [
    { key: 'title', label: 'Title' },
    { key: 'company', label: 'Company' },
    { key: 'location', label: 'Location' },
    { key: 'field', label: 'Field' },
    { key: 'status', label: 'Status', render: (value: string) => <StatusBadge status={value} type="job" /> },
    { key: 'created_at', label: 'Posted', render: (value: string) => new Date(value).toLocaleDateString() },
  ];

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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : stats?.total_users || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {statsLoading ? '...' : stats?.admin_users || 0} admins
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : stats?.active_jobs || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              of {statsLoading ? '...' : stats?.total_jobs || 0} total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : stats?.total_applications || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {statsLoading ? '...' : stats?.pending_applications || 0} pending
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : stats?.total_enrollments || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={users.data}
                columns={userColumns}
                loading={usersLoading}
                search={{
                  value: usersParams.search,
                  onChange: (value) => setUsersParams(prev => ({ ...prev, search: value, page: 1 })),
                  placeholder: "Search users by name or ID..."
                }}
                pagination={{
                  currentPage: users.page,
                  totalPages: users.totalPages,
                  totalItems: users.total,
                  pageSize: users.limit,
                  onPageChange: (page) => setUsersParams(prev => ({ ...prev, page })),
                  onPageSizeChange: (limit) => setUsersParams(prev => ({ ...prev, limit, page: 1 })),
                }}
                actions={(user: User) => (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateUserRole(user)}
                  >
                    {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                  </Button>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Job Management</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={jobs.data}
                columns={jobColumns}
                loading={jobsLoading}
                search={{
                  value: jobsParams.search,
                  onChange: (value) => setJobsParams(prev => ({ ...prev, search: value, page: 1 })),
                  placeholder: "Search jobs by title, company, or location..."
                }}
                pagination={{
                  currentPage: jobs.page,
                  totalPages: jobs.totalPages,
                  totalItems: jobs.total,
                  pageSize: jobs.limit,
                  onPageChange: (page) => setJobsParams(prev => ({ ...prev, page })),
                  onPageSizeChange: (limit) => setJobsParams(prev => ({ ...prev, limit, page: 1 })),
                }}
                actions={(job: Job) => (
                  <>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteJob(job)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Application Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Application management coming soon...
              </div>
            </CardContent>
          </Card>
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
