
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { Application } from '@/types/admin';
import { ApplicantProfile } from './ApplicantProfile';

interface HiringPipelineProps {
  applications: Application[];
  onStatusChange: (applicationId: string, newStatus: Application['status']) => void;
  loading?: boolean;
}

const PIPELINE_STAGES = [
  { key: 'applied', title: 'Applied', color: 'bg-blue-50 border-blue-200' },
  { key: 'under_review', title: 'Under Review', color: 'bg-yellow-50 border-yellow-200' },
  { key: 'test_assigned', title: 'Test Assigned', color: 'bg-purple-50 border-purple-200' },
  { key: 'test_completed', title: 'Test Completed', color: 'bg-indigo-50 border-indigo-200' },
  { key: 'approved', title: 'Approved', color: 'bg-green-50 border-green-200' },
  { key: 'rejected', title: 'Rejected', color: 'bg-red-50 border-red-200' },
];

export const HiringPipeline: React.FC<HiringPipelineProps> = ({
  applications,
  onStatusChange,
  loading = false,
}) => {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const getApplicationsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleStatusChange = (application: Application, newStatus: Application['status']) => {
    onStatusChange(application.id, newStatus);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {PIPELINE_STAGES.map((stage) => (
          <Card key={stage.key} className={`${stage.color} min-h-[400px]`}>
            <CardHeader>
              <CardTitle className="text-sm">{stage.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageApplications = getApplicationsByStatus(stage.key);
          
          return (
            <Card key={stage.key} className={`${stage.color} min-h-[400px]`}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center justify-between">
                  {stage.title}
                  <Badge variant="secondary" className="ml-2">
                    {stageApplications.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stageApplications.map((application) => (
                  <Card key={application.id} className="p-3 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(application.profiles?.full_name || 'U')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">
                            {application.profiles?.full_name || 'Unknown'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {application.jobs?.title}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(application.applied_at).toLocaleDateString()}
                        </span>
                        {application.assignment_completed && (
                          <Badge variant="outline" className="text-xs">
                            Test Done
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        
                        {stage.key === 'applied' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
                              onClick={() => handleStatusChange(application, 'under_review')}
                            >
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                              onClick={() => handleStatusChange(application, 'approved')}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleStatusChange(application, 'rejected')}
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedApplication && (
        <ApplicantProfile
          application={selectedApplication}
          open={!!selectedApplication}
          onOpenChange={(open) => !open && setSelectedApplication(null)}
        />
      )}
    </>
  );
};
