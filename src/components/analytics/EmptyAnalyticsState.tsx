
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, TrendingUp, FileText } from 'lucide-react';

interface EmptyAnalyticsStateProps {
  title?: string;
  description?: string;
  showCreateAction?: boolean;
  onCreateClick?: () => void;
}

export const EmptyAnalyticsState: React.FC<EmptyAnalyticsStateProps> = ({
  title = "No Analytics Data Available",
  description = "Once you have applications and job data, detailed analytics will appear here.",
  showCreateAction = false,
  onCreateClick
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
          <BarChart3 className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-muted/30">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-sm font-medium">User Analytics</p>
            <p className="text-xs text-muted-foreground">Track application patterns</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <FileText className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <p className="text-sm font-medium">Application Metrics</p>
            <p className="text-xs text-muted-foreground">Monitor success rates</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <p className="text-sm font-medium">Trend Analysis</p>
            <p className="text-xs text-muted-foreground">View performance over time</p>
          </div>
        </div>

        {showCreateAction && (
          <Button onClick={onCreateClick} className="mt-4">
            Create Sample Data
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
