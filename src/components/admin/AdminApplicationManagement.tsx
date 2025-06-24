
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Application {
  id: string;
  user_id: string;
  job_id: string;
  status: string;
  hackerrank_link: string | null;
  assignment_completed: boolean;
  assignment_status: string;
  applied_at: string;
  profiles: {
    full_name: string;
  };
  jobs: {
    title: string;
    company: string;
  };
}

export const AdminApplicationManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { toast } = useToast();

  const { data: applicationsData, isLoading, refetch } = useQuery({
    queryKey: ['admin-applications', currentPage, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('applications')
        .select(`
          *,
          profiles!inner(full_name),
          jobs!inner(title, company)
        `, { count: 'exact' });

      if (searchTerm) {
        query = query.or(`profiles.full_name.ilike.%${searchTerm}%,jobs.title.ilike.%${searchTerm}%,jobs.company.ilike.%${searchTerm}%`);
      }

      query = query
        .order('applied_at', { ascending: false })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

      const { data, error, count } = await query;
      
      if (error) throw error;
      
      return {
        data: data || [],
        total: count || 0,
        page: currentPage,
        limit: pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
      };
    },
  });

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Application status updated successfully",
      });
      
      refetch();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || 'Failed to update application status',
        variant: "destructive",
      });
    }
  };

  const applicationColumns = [
    { 
      key: 'profiles.full_name', 
      label: 'Applicant',
      render: (value: string, app: Application) => app.profiles?.full_name || 'Unknown'
    },
    { 
      key: 'jobs.title', 
      label: 'Job',
      render: (value: string, app: Application) => (
        <div>
          <div className="font-medium">{app.jobs?.title}</div>
          <div className="text-sm text-muted-foreground">{app.jobs?.company}</div>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value: string) => <StatusBadge status={value} type="application" />
    },
    { 
      key: 'assignment_status', 
      label: 'Assignment',
      render: (value: string, app: Application) => (
        <div className="flex items-center gap-2">
          {app.assignment_completed ? (
            <Badge variant="default" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          ) : value === 'assigned' ? (
            <Badge variant="secondary">
              <Clock className="h-3 w-3 mr-1" />
              Assigned
            </Badge>
          ) : (
            <Badge variant="outline">Not Assigned</Badge>
          )}
        </div>
      )
    },
    { 
      key: 'applied_at', 
      label: 'Applied', 
      render: (value: string) => new Date(value).toLocaleDateString()
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Management</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={applicationsData?.data || []}
          columns={applicationColumns}
          loading={isLoading}
          search={{
            value: searchTerm,
            onChange: setSearchTerm,
            placeholder: "Search applications by applicant name, job title, or company..."
          }}
          pagination={{
            currentPage: applicationsData?.page || 1,
            totalPages: applicationsData?.totalPages || 1,
            totalItems: applicationsData?.total || 0,
            pageSize: applicationsData?.limit || pageSize,
            onPageChange: setCurrentPage,
            onPageSizeChange: () => {}, // Not implemented for simplicity
          }}
          actions={(app: Application) => (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              {app.status === 'applied' && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateApplicationStatus(app.id, 'under_review')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Review
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateApplicationStatus(app.id, 'approved')}
                    className="text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateApplicationStatus(app.id, 'rejected')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};
