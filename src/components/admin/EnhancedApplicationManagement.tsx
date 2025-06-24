
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApplicationManagement } from '@/hooks/useApplicationManagement';
import { AdvancedSearchFilters } from '@/components/search/AdvancedSearchFilters';
import { BulkApplicationActions } from './BulkApplicationActions';
import { DataTable } from './DataTable';
import { Download, RefreshCw } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type ApplicationStatus = Database['public']['Enums']['application_status'];

export const EnhancedApplicationManagement: React.FC = () => {
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    status: [] as string[],
    field: [] as string[],
    company: '',
    location: '',
    dateRange: {} as { from?: Date; to?: Date },
    paymentRequired: null as boolean | null,
    assignmentCompleted: null as boolean | null,
    sortBy: 'applied_at',
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  const {
    applications,
    isLoading,
    filters,
    setFilters,
    updateApplicationStatus,
    bulkUpdateStatus,
    sendBulkEmail,
    getApplicationStats,
    refetch,
  } = useApplicationManagement();

  const stats = getApplicationStats();

  const handleFiltersChange = (newFilters: any) => {
    setSearchFilters(newFilters);
    setFilters({
      status: newFilters.status.length > 0 ? newFilters.status[0] as ApplicationStatus : undefined,
      search: newFilters.search,
      dateRange: newFilters.dateRange.from && newFilters.dateRange.to ? {
        from: newFilters.dateRange.from,
        to: newFilters.dateRange.to,
      } : undefined,
    });
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      search: '',
      status: [],
      field: [],
      company: '',
      location: '',
      dateRange: {},
      paymentRequired: null,
      assignmentCompleted: null,
      sortBy: 'applied_at',
      sortOrder: 'desc' as 'asc' | 'desc',
    };
    setSearchFilters(defaultFilters);
    setFilters({});
  };

  const exportApplications = () => {
    const csvContent = [
      ['Applicant', 'Job', 'Company', 'Status', 'Applied Date', 'Assignment', 'Payment'].join(','),
      ...applications.map(app => [
        (app.profiles as any)?.full_name || 'N/A',
        (app.jobs as any)?.title || 'N/A',
        (app.jobs as any)?.company || 'N/A',
        app.status,
        new Date(app.applied_at).toLocaleDateString(),
        app.assignment_completed ? 'Completed' : 'Pending',
        app.payment_required ? 'Required' : 'Not Required'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleBulkUpdate = async (status: ApplicationStatus) => {
    await bulkUpdateStatus(selectedApplications, status);
    setSelectedApplications([]);
    setShowBulkActions(false);
  };

  const handleBulkEmail = async (applicationIds: string[], subject: string, message: string) => {
    await sendBulkEmail(applicationIds, subject, message);
    setShowBulkActions(false);
  };

  const availableFields = [...new Set(applications.map(app => (app.jobs as any)?.title).filter(Boolean))];
  const availableCompanies = [...new Set(applications.map(app => (app.jobs as any)?.company).filter(Boolean))];

  const columns = [
    {
      key: 'select',
      label: 'Select',
      header: ({ table }: any) => (
        <input
          type="checkbox"
          checked={table?.getIsAllPageRowsSelected?.() || false}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedApplications(applications.map(app => app.id));
            } else {
              setSelectedApplications([]);
            }
          }}
        />
      ),
      cell: ({ row }: any) => (
        <input
          type="checkbox"
          checked={selectedApplications.includes(row.original.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedApplications([...selectedApplications, row.original.id]);
            } else {
              setSelectedApplications(selectedApplications.filter(id => id !== row.original.id));
            }
          }}
        />
      ),
    },
    {
      key: 'applicant',
      label: 'Applicant',
      accessorKey: 'profiles.full_name',
      header: 'Applicant',
      cell: ({ row }: any) => (row.original.profiles as any)?.full_name || 'N/A',
    },
    {
      key: 'job',
      label: 'Job Title',
      accessorKey: 'jobs.title',
      header: 'Job Title',
      cell: ({ row }: any) => (row.original.jobs as any)?.title || 'N/A',
    },
    {
      key: 'company',
      label: 'Company',
      accessorKey: 'jobs.company',
      header: 'Company',
      cell: ({ row }: any) => (row.original.jobs as any)?.company || 'N/A',
    },
    {
      key: 'status',
      label: 'Status',
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={
          row.original.status === 'approved' ? 'default' :
          row.original.status === 'rejected' ? 'destructive' : 'secondary'
        }>
          {row.original.status.replace('_', ' ').toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'applied_at',
      label: 'Applied Date',
      accessorKey: 'applied_at',
      header: 'Applied Date',
      cell: ({ row }: any) => new Date(row.original.applied_at).toLocaleDateString(),
    },
    {
      key: 'assignment',
      label: 'Assignment',
      accessorKey: 'assignment_completed',
      header: 'Assignment',
      cell: ({ row }: any) => (
        <Badge variant={row.original.assignment_completed ? 'default' : 'secondary'}>
          {row.original.assignment_completed ? 'Completed' : 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Select
            value={row.original.status}
            onValueChange={(value: ApplicationStatus) => updateApplicationStatus(row.original.id, value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="test_assigned">Test Assigned</SelectItem>
              <SelectItem value="test_completed">Test Completed</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading applications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Application Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportApplications}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {Object.entries(stats).map(([key, value]) => (
            <Card key={key}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {key.replace('_', ' ')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AdvancedSearchFilters
        filters={searchFilters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        availableFields={availableFields}
        availableCompanies={availableCompanies}
      />

      {selectedApplications.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium">
            {selectedApplications.length} applications selected
          </span>
          <Button
            size="sm"
            onClick={() => setShowBulkActions(true)}
          >
            Bulk Actions
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedApplications([])}
          >
            Clear Selection
          </Button>
        </div>
      )}

      <BulkApplicationActions
        selectedApplications={selectedApplications}
        applications={applications}
        open={showBulkActions}
        onOpenChange={setShowBulkActions}
        onBulkStatusUpdate={handleBulkUpdate}
        onBulkEmail={handleBulkEmail}
      />

      <Card>
        <CardHeader>
          <CardTitle>Applications ({applications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={applications}
            search={{
              value: searchFilters.search,
              onChange: (value) => setSearchFilters(prev => ({ ...prev, search: value })),
              placeholder: "Search applications..."
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
