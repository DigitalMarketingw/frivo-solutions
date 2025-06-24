import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { HiringPipeline } from '@/components/admin/HiringPipeline';
import { ApplicantProfile } from '@/components/admin/ApplicantProfile';
import { Eye, CheckCircle, XCircle, Clock, List, Kanban } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type ApplicationStatus = Database['public']['Enums']['application_status'];

type ApplicationRow = {
  id: string;
  user_id: string;
  job_id: string;
  status: ApplicationStatus;
  hackerrank_link: string | null;
  assignment_completed: boolean;
  assignment_status: string;
  test_results: any;
  applied_at: string;
  profiles: {
    full_name: string;
  } | null;
  jobs: {
    title: string;
    company: string;
  } | null;
};

export const AdminApplicationManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationRow | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'pipeline'>('table');
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
        data: (data || []) as unknown as ApplicationRow[],
        total: count || 0,
        page: currentPage,
        limit: pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
      };
    },
  });

  // Fetch all applications for pipeline view (not paginated)
  const { data: allApplicationsData } = useQuery({
    queryKey: ['all-applications', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('applications')
        .select(`
          *,
          profiles!inner(full_name),
          jobs!inner(title, company)
        `);

      if (searchTerm) {
        query = query.or(`profiles.full_name.ilike.%${searchTerm}%,jobs.title.ilike.%${searchTerm}%,jobs.company.ilike.%${searchTerm}%`);
      }

      query = query.order('applied_at', { ascending: false });

      const { data, error } = await query;
      
      if (error) throw error;
      
      return (data || []) as unknown as ApplicationRow[];
    },
    enabled: viewMode === 'pipeline',
  });

  const updateApplicationStatus = async (applicationId: string, newStatus: ApplicationStatus) => {
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
      render: (value: any, item: ApplicationRow) => item.profiles?.full_name || 'Unknown'
    },
    { 
      key: 'jobs.title', 
      label: 'Job',
      render: (value: any, item: ApplicationRow) => (
        <div>
          <div className="font-medium">{item.jobs?.title || 'Unknown Job'}</div>
          <div className="text-sm text-muted-foreground">{item.jobs?.company || 'Unknown Company'}</div>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value: ApplicationStatus) => <StatusBadge status={value} type="application" />
    },
    { 
      key: 'assignment_status', 
      label: 'Assignment',
      render: (value: string, item: ApplicationRow) => (
        <div className="flex items-center gap-2">
          {item.assignment_completed ? (
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Application Management</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4 mr-2" />
                Table View
              </Button>
              <Button
                variant={viewMode === 'pipeline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('pipeline')}
              >
                <Kanban className="h-4 w-4 mr-2" />
                Pipeline View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
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
                onPageSizeChange: () => {},
              }}
              actions={(item: ApplicationRow) => (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedApplication(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {item.status === 'applied' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateApplicationStatus(item.id, 'under_review')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Review
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateApplicationStatus(item.id, 'approved')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateApplicationStatus(item.id, 'rejected')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              )}
            />
          ) : (
            <HiringPipeline
              applications={allApplicationsData || []}
              onStatusChange={updateApplicationStatus}
              loading={isLoading}
            />
          )}
        </CardContent>
      </Card>

      {selectedApplication && (
        <ApplicantProfile
          application={selectedApplication}
          open={!!selectedApplication}
          onOpenChange={(open) => !open && setSelectedApplication(null)}
        />
      )}
    </div>
  );
};
