
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApplicationManagement } from '@/hooks/useApplicationManagement';
import { AdvancedSearchFilters } from '@/components/search/AdvancedSearchFilters';
import { BulkApplicationActions } from './BulkApplicationActions';
import { DataTable } from './DataTable';
import { Download, Search, Filter, RefreshCw } from 'lucide-react';

export const EnhancedApplicationManagement: React.FC = () => {
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState({
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
      status: newFilters.status.length > 0 ? newFilters.status[0] : undefined,
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
        app.profiles?.full_name || 'N/A',
        app.jobs?.title || 'N/A',
        app.jobs?.company || 'N/A',
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

  const columns = [
    {
      id: 'select',
      header: ({ table }: any) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => {
            table.toggleAllPageRowsSelected(e.target.checked);
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
      accessorKey: 'profiles.full_name',
      header: 'Applicant',
      cell: ({ row }: any) => row.original.profiles?.full_name || 'N/A',
    },
    {
      accessorKey: 'jobs.title',
      header: 'Job Title',
      cell: ({ row }: any) => row.original.jobs?.title || 'N/A',
    },
    {
      accessorKey: 'jobs.company',
      header: 'Company',
      cell: ({ row }: any) => row.original.jobs?.company || 'N/A',
    },
    {
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
      accessorKey: 'applied_at',
      header: 'Applied Date',
      cell: ({ row }: any) => new Date(row.original.applied_at).toLocaleDateString(),
    },
    {
      accessorKey: 'assignment_completed',
      header: 'Assignment',
      cell: ({ row }: any) => (
        <Badge variant={row.original.assignment_completed ? 'default' : 'secondary'}>
          {row.original.assignment_completed ? 'Completed' : 'Pending'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Select
            value={row.original.status}
            onValueChange={(value) => updateApplicationStatus(row.original.id, value)}
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
          <Button variant="outline" onClick={refetch}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
              <div className="text-sm text-muted-foreground">Applied</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.under_review}</div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.test_assigned}</div>
              <div className="text-sm text-muted-foreground">Test Assigned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">{stats.test_completed}</div>
              <div className="text-sm text-muted-foreground">Test Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Advanced Search and Filters */}
      <AdvancedSearchFilters
        filters={searchFilters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        availableFields={[...new Set(applications.map(app => app.jobs?.title).filter(Boolean))]}
        availableCompanies={[...new Set(applications.map(app => app.jobs?.company).filter(Boolean))]}
      />

      {/* Bulk Actions */}
      {selectedApplications.length > 0 && (
        <BulkApplicationActions
          selectedCount={selectedApplications.length}
          onBulkUpdate={(status) => bulkUpdateStatus(selectedApplications, status)}
          onBulkEmail={(subject, message) => sendBulkEmail(selectedApplications, subject, message)}
          onClearSelection={() => setSelectedApplications([])}
        />
      )}

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({applications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={applications}
            searchKey="profiles.full_name"
          />
        </CardContent>
      </Card>
    </div>
  );
};
