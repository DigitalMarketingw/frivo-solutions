
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { JobForm } from '@/components/admin/JobForm';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Edit, Trash2, Copy, Plus, MoreHorizontal } from 'lucide-react';
import { Job, PaginatedResponse } from '@/types/admin';
import { useJobManagement } from '@/hooks/useJobManagement';

interface EnhancedJobManagementProps {
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
  onRefresh: () => void;
}

export const EnhancedJobManagement: React.FC<EnhancedJobManagementProps> = ({
  jobs,
  loading,
  searchParams,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onDeleteJob,
  onRefresh,
}) => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<Job['status']>('open');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const { createJob, updateJob, duplicateJob, bulkUpdateJobStatus, loading: managementLoading } = useJobManagement();

  const handleCreateJob = useCallback(async (jobData: any) => {
    try {
      await createJob(jobData);
      setShowJobForm(false);
      onRefresh();
    } catch (error) {
      // Error handling is done in the hook
    }
  }, [createJob, onRefresh]);

  const handleUpdateJob = useCallback(async (jobData: any) => {
    if (!editingJob) return;
    
    try {
      await updateJob(editingJob.id, jobData);
      setEditingJob(null);
      onRefresh();
    } catch (error) {
      // Error handling is done in the hook
    }
  }, [updateJob, editingJob, onRefresh]);

  const handleDuplicateJob = useCallback(async (job: Job) => {
    try {
      await duplicateJob(job.id);
      onRefresh();
    } catch (error) {
      // Error handling is done in the hook
    }
  }, [duplicateJob, onRefresh]);

  const handleBulkStatusUpdate = useCallback(async () => {
    if (selectedJobs.length === 0) return;
    
    try {
      await bulkUpdateJobStatus(selectedJobs, bulkStatus);
      setSelectedJobs([]);
      setShowBulkActions(false);
      onRefresh();
    } catch (error) {
      // Error handling is done in the hook
    }
  }, [bulkUpdateJobStatus, selectedJobs, bulkStatus, onRefresh]);

  const handleSelectJob = useCallback((jobId: string, selected: boolean) => {
    setSelectedJobs(prev => 
      selected 
        ? [...prev, jobId]
        : prev.filter(id => id !== jobId)
    );
  }, []);

  const handleSelectAll = useCallback((selected: boolean) => {
    setSelectedJobs(selected ? jobs.data.map(job => job.id) : []);
  }, [jobs.data]);

  const confirmDelete = useCallback((job: Job) => {
    setJobToDelete(job);
    setShowDeleteDialog(true);
  }, []);

  const handleDelete = useCallback(() => {
    if (jobToDelete) {
      onDeleteJob(jobToDelete);
      setJobToDelete(null);
      setShowDeleteDialog(false);
    }
  }, [jobToDelete, onDeleteJob]);

  const jobColumns = [
    {
      key: 'select',
      label: 'Select',
      render: (value: any, job: Job) => (
        <Checkbox
          checked={selectedJobs.includes(job.id)}
          onCheckedChange={(checked) => handleSelectJob(job.id, checked as boolean)}
        />
      ),
    },
    { key: 'title', label: 'Title' },
    { key: 'company', label: 'Company' },
    { key: 'location', label: 'Location' },
    { key: 'field', label: 'Field' },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value: string) => <StatusBadge status={value} type="job" /> 
    },
    { 
      key: 'created_at', 
      label: 'Posted', 
      render: (value: string) => new Date(value).toLocaleDateString() 
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Job Management</CardTitle>
            <div className="flex gap-2">
              {selectedJobs.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowBulkActions(true)}
                >
                  Bulk Actions ({selectedJobs.length})
                </Button>
              )}
              <Button onClick={() => setShowJobForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            </div>
          </div>
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
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingJob(job)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDuplicateJob(job)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => confirmDelete(job)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* Create Job Dialog */}
      <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
          </DialogHeader>
          <JobForm
            onSubmit={handleCreateJob}
            onCancel={() => setShowJobForm(false)}
            loading={managementLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={!!editingJob} onOpenChange={(open) => !open && setEditingJob(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
          </DialogHeader>
          {editingJob && (
            <JobForm
              job={editingJob}
              onSubmit={handleUpdateJob}
              onCancel={() => setEditingJob(null)}
              loading={managementLoading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Actions Dialog */}
      <Dialog open={showBulkActions} onOpenChange={setShowBulkActions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Actions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Update status for {selectedJobs.length} selected jobs:</p>
            <Select value={bulkStatus} onValueChange={(value) => setBulkStatus(value as Job['status'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="filled">Filled</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBulkActions(false)}>
                Cancel
              </Button>
              <Button onClick={handleBulkStatusUpdate} disabled={managementLoading}>
                Update Jobs
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Job"
        description={`Are you sure you want to delete "${jobToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        variant="destructive"
      />
    </div>
  );
};
