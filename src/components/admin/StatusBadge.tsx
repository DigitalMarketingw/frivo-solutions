
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
  type?: 'application' | 'job' | 'user' | 'payment';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'application' }) => {
  const getVariant = () => {
    if (type === 'user') {
      switch (status) {
        case 'admin':
          return 'default';
        case 'company':
          return 'secondary';
        case 'user':
          return 'outline';
        default:
          return 'outline';
      }
    }
    
    if (type === 'application') {
      switch (status) {
        case 'applied':
          return 'outline';
        case 'under_review':
          return 'secondary';
        case 'test_assigned':
          return 'secondary';
        case 'test_completed':
          return 'secondary';
        case 'approved':
          return 'default';
        case 'rejected':
          return 'destructive';
        default:
          return 'outline';
      }
    }
    
    if (type === 'job') {
      switch (status) {
        case 'open':
          return 'default';
        case 'closed':
          return 'secondary';
        case 'under_review':
          return 'outline';
        case 'filled':
          return 'destructive';
        default:
          return 'outline';
      }
    }
    
    if (type === 'payment') {
      switch (status) {
        case 'completed':
          return 'default';
        case 'pending':
          return 'secondary';
        case 'failed':
          return 'destructive';
        case 'refunded':
          return 'outline';
        default:
          return 'outline';
      }
    }
    
    return 'outline';
  };

  const getDisplayText = () => {
    if (type === 'user') {
      switch (status) {
        case 'admin':
          return 'Super Admin';
        case 'company':
          return 'Company Admin';
        case 'user':
          return 'User';
        default:
          return status;
      }
    }
    
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Badge variant={getVariant()}>
      {getDisplayText()}
    </Badge>
  );
};
