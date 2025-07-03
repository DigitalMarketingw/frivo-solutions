
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Calendar, CheckCircle } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  field: string;
  created_at: string;
  description: string;
  requirements?: string[];
  tags?: string[];
}

interface JobListItemProps {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
  userHasPaid: boolean;
}

export const JobListItem: React.FC<JobListItemProps> = ({
  job,
  isSelected,
  onClick,
  userHasPaid
}) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 ${
        isSelected 
          ? 'border-l-primary bg-primary/5 shadow-md' 
          : 'border-l-transparent hover:border-l-primary/30'
      }`}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-slate-900 line-clamp-2">{job.title}</h3>
          <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
            <Building className="h-4 w-4" />
            <span className="font-medium">{job.company}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(job.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary border-primary/20">
            {job.field}
          </Badge>
          
          {userHasPaid && (
            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <CheckCircle className="h-3 w-3" />
              <span>Easily apply</span>
            </div>
          )}
        </div>

        <p className="text-sm text-slate-700 line-clamp-2">
          {job.description}
        </p>
      </div>
    </Card>
  );
};
