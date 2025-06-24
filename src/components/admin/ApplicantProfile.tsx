
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Phone, Calendar, FileText, ExternalLink } from 'lucide-react';
import { Application } from '@/types/admin';

interface ApplicantProfileProps {
  application: Application;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApplicantProfile: React.FC<ApplicantProfileProps> = ({
  application,
  open,
  onOpenChange,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Applicant Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {getInitials(application.profiles?.full_name || 'Unknown')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{application.profiles?.full_name || 'Unknown Applicant'}</h2>
              <p className="text-muted-foreground">Applied for {application.jobs?.title} at {application.jobs?.company}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Applied {new Date(application.applied_at).toLocaleDateString()}</span>
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Application Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Application Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current Status:</span>
                  <Badge variant={
                    application.status === 'approved' ? 'default' :
                    application.status === 'rejected' ? 'destructive' :
                    application.status === 'under_review' ? 'secondary' :
                    'outline'
                  }>
                    {application.status?.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Assignment Status:</span>
                  <Badge variant={
                    application.assignment_completed ? 'default' : 'outline'
                  }>
                    {application.assignment_completed ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Documents & Links</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {application.hackerrank_link && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">HackerRank:</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(application.hackerrank_link!, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Resume:</span>
                  <Button variant="outline" size="sm" disabled>
                    <FileText className="h-3 w-3 mr-1" />
                    View Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Applied For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Position:</span>
                  <span>{application.jobs?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Company:</span>
                  <span>{application.jobs?.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Applied Date:</span>
                  <span>{new Date(application.applied_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button>
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
