
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminStats } from '@/types/admin';
import { 
  Users, 
  Briefcase, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Activity 
} from 'lucide-react';

interface AdminStatsCardProps {
  stats: AdminStats | null;
  loading: boolean;
}

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-8 w-8 rounded mb-2" />
              <Skeleton className="h-6 w-16 mb-1" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statsConfig = [
    {
      label: 'Total Users',
      value: stats.total_users,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Jobs',
      value: stats.total_jobs,
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Applications',
      value: stats.total_applications,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Active Jobs',
      value: stats.active_jobs,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Pending',
      value: stats.pending_applications,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Total Enrollments',
      value: stats.total_enrollments,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-muted-foreground">Platform Overview</h3>
        <Badge variant="outline" className="flex items-center space-x-1">
          <Activity className="h-3 w-3" />
          <span>Real-time Data</span>
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsConfig.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
