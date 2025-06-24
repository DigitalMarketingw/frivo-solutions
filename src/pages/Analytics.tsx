
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { UserPerformanceMetrics } from '@/components/analytics/UserPerformanceMetrics';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
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
  );
};

export default Analytics;
