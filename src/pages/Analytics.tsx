
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { UserPerformanceMetrics } from '@/components/analytics/UserPerformanceMetrics';

const Analytics = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Analytics Dashboard</h1>
            <p className="text-xl text-muted-foreground">Track your performance and insights</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Analytics Overview</TabsTrigger>
              <TabsTrigger value="performance">My Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="performance">
              <UserPerformanceMetrics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
