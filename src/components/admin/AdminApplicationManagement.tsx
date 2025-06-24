
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminApplicationManagement: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          Application management coming soon...
        </div>
      </CardContent>
    </Card>
  );
};
