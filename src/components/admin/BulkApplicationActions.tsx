
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Mail, Users } from 'lucide-react';
import { Application } from '@/types/admin';
import { Database } from '@/integrations/supabase/types';

type ApplicationStatus = Database['public']['Enums']['application_status'];

interface BulkApplicationActionsProps {
  selectedApplications: string[];
  applications: Application[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBulkStatusUpdate: (applicationIds: string[], status: ApplicationStatus) => Promise<void>;
  onBulkEmail: (applicationIds: string[], subject: string, message: string) => Promise<void>;
}

export const BulkApplicationActions: React.FC<BulkApplicationActionsProps> = ({
  selectedApplications,
  applications,
  open,
  onOpenChange,
  onBulkStatusUpdate,
  onBulkEmail,
}) => {
  const [action, setAction] = useState<'status' | 'email'>('status');
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('under_review');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedApps = applications.filter(app => selectedApplications.includes(app.id));

  const handleStatusUpdate = async () => {
    setLoading(true);
    try {
      await onBulkStatusUpdate(selectedApplications, newStatus);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSend = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) return;
    
    setLoading(true);
    try {
      await onBulkEmail(selectedApplications, emailSubject, emailMessage);
      onOpenChange(false);
      setEmailSubject('');
      setEmailMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Bulk Actions ({selectedApplications.length} selected)</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Applications Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Selected Applications:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedApps.slice(0, 5).map((app) => (
                <Badge key={app.id} variant="outline">
                  {app.profiles?.full_name || 'Unknown'}
                </Badge>
              ))}
              {selectedApps.length > 5 && (
                <Badge variant="secondary">+{selectedApps.length - 5} more</Badge>
              )}
            </div>
          </div>

          {/* Action Selection */}
          <div className="flex space-x-2">
            <Button
              variant={action === 'status' ? 'default' : 'outline'}
              onClick={() => setAction('status')}
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Update Status
            </Button>
            <Button
              variant={action === 'email' ? 'default' : 'outline'}
              onClick={() => setAction('email')}
              className="flex-1"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>

          {/* Status Update Form */}
          {action === 'status' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">New Status</Label>
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value as ApplicationStatus)}>
                  <SelectTrigger>
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
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={handleStatusUpdate} disabled={loading}>
                  {loading ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </div>
          )}

          {/* Email Form */}
          {action === 'email' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <input
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject"
                />
              </div>
              <div>
                <Label htmlFor="message">Email Message</Label>
                <Textarea
                  id="message"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Enter your message"
                  rows={6}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleEmailSend} 
                  disabled={loading || !emailSubject.trim() || !emailMessage.trim()}
                >
                  {loading ? 'Sending...' : 'Send Email'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
