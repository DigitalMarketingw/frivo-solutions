
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
  type?: 'job' | 'application' | 'enrollment' | 'payment' | 'user';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'job' }) => {
  const getVariant = () => {
    switch (type) {
      case 'job':
        switch (status) {
          case 'open': return 'default';
          case 'closed': return 'secondary';
          case 'filled': return 'outline';
          default: return 'secondary';
        }
      case 'application':
        switch (status) {
          case 'applied': return 'secondary';
          case 'under_review': return 'default';
          case 'approved': return 'default';
          case 'rejected': return 'destructive';
          default: return 'secondary';
        }
      case 'user':
        switch (status) {
          case 'admin': return 'default';
          case 'user': return 'secondary';
          default: return 'secondary';
        }
      default:
        return 'secondary';
    }
  };

  return (
    <Badge variant={getVariant()}>
      {status.replace('_', ' ').toUpperCase()}
    </Badge>
  );
};
