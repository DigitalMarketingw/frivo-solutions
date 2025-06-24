
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, TrendingUp, Users, Briefcase, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useApplicationAnalytics, useApplicationTrends } from '@/hooks/useAnalytics';
import { ApplicationMetricsChart } from './ApplicationMetricsChart';
import { StatusDistributionChart } from './StatusDistributionChart';
import { FieldAnalyticsChart } from './FieldAnalyticsChart';
import { TrendAnalysisChart } from './TrendAnalysisChart';

interface DateRange {
  from?: Date;
  to?: Date;
}

export const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [selectedField, setSelectedField] = useState<string>('');

  const { data: analytics, isLoading } = useApplicationAnalytics({
    startDate: dateRange.from,
    endDate: dateRange.to,
    jobField: selectedField || undefined,
  });

  const { data: trends } = useApplicationTrends();

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading analytics...</div>;
  }

  const stats = analytics || {
    total_applications: 0,
    status_breakdown: [],
    field_breakdown: [],
    daily_applications: [],
    conversion_rate: 0
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        
        <div className="flex gap-4">
          <Select value={selectedField} onValueChange={setSelectedField}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Fields" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Fields</SelectItem>
              {stats.field_breakdown.map((field: any) => (
                <SelectItem key={field.field} value={field.field}>
                  {field.field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange.from && dateRange.to ? { from: dateRange.from, to: dateRange.to } : undefined}
                onSelect={(range) => setDateRange(range || {})}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_applications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversion_rate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Applications</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.status_breakdown.find((s: any) => s.status === 'approved')?.count || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_applications}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="fields">By Field</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatusDistributionChart data={stats.status_breakdown} />
            <ApplicationMetricsChart data={stats.daily_applications} />
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <TrendAnalysisChart data={trends || []} />
        </TabsContent>

        <TabsContent value="fields" className="space-y-6">
          <FieldAnalyticsChart data={stats.field_breakdown} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="text-center p-8 text-gray-500">
            Performance metrics will be displayed here based on user-specific data.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
