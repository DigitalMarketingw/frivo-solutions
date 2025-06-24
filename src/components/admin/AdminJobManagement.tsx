
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Edit, Trash2 } from 'lucide-react';
import { Job, PaginatedResponse } from '@/types/admin';

interface AdminJobManagementProps {
  jobs: PaginatedResponse<Job>;
  loading: boolean;
  searchParams: {
    search: string;
    page: number;
    limit: number;
  };
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (limit: number) => void;
  onDeleteJob: (job: Job) => void;
}

export const AdminJobManagement: React.FC<AdminJobManagementProps> = ({
  jobs,
  loading,
  searchParams,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onDeleteJob,
}) => {
  const jobColumns = [
    { key: 'title', label: 'Title' },
    { key: 'company', label: 'Company' },
    { key: 'location', label: 'Location' },
    { key: 'field', label: 'Field' },
    { key: 'status', label: 'Status', render: (value: string) => <StatusBadge status={value} type="job" /> },
    { key: 'created_at', label: 'Posted', render: (value: string) => new Date(value).toLocaleDateString() },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Management</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={jobs.data}
          columns={jobColumns}
          loading={loading}
          search={{
            value: searchParams.search,
            onChange: onSearchChange,
            placeholder: "Search jobs by title, company, or location..."
          }}
          pagination={{
            currentPage: jobs.page,
            totalPages: jobs.totalPages,
            totalItems: jobs.total,
            pageSize: jobs.limit,
            onPageChange: onPageChange,
            onPageSizeChange: onPageSizeChange,
          }}
          actions={(job: Job) => (
            <>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDeleteJob(job)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        />
      </CardContent>
    </Card>
  );
};
