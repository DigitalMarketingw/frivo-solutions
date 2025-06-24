
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, TrendingUp, Users, Briefcase, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { useApplicationAnalytics, useApplicationTrends } from '@/hooks/useAnalytics';
import { ApplicationMetricsChart } from './ApplicationMetricsChart';
import { StatusDistributionChart } from './StatusDistributionChart';
import { FieldAnalyticsChart } from './FieldAnalyticsChart';
import { TrendAnalysisChart } from './TrendAnalysisChart';
import { EmptyAnalyticsState } from './EmptyAnalyticsState';
import { useToast } from '@/hooks/use-toast';

interface DateRange {
  from?: Date;
  to?: Date;
}

export const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [selectedField, setSelectedField] = useState<string>('');
  const { toast } = useToast();

  const { data: analytics, isLoading, error, refetch } = useApplicationAnalytics({
    startDate: dateRange.from,
    endDate: dateRange.to,
    jobField: selectedField || undefined,
  });

  const { data: trends, refetch: refetchTrends } = useApplicationTrends();

  const handleRefresh = async () => {
    try {
      await Promise.all([refetch(), refetchTrends()]);
      toast({
        title: "Success",
        description: "Analytics data refreshed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh analytics data",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <p className="text-muted-foreground text-center">
            Failed to load analytics data. Using demo data for display.
          </p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Provide safe defaults for all analytics data
  const stats = analytics || {
    total_applications: 0,
    status_breakdown: [],
    field_breakdown: [],
    daily_applications: [],
    conversion_rate: 0
  };

  // Ensure all arrays are properly initialized
  const safeStats = {
    total_applications: stats.total_applications || 0,
    status_breakdown: Array.isArray(stats.status_breakdown) ? stats.status_breakdown : [],
    field_breakdown: Array.isArray(stats.field_breakdown) ? stats.field_breakdown : [],
    daily_applications: Array.isArray(stats.daily_applications) ? stats.daily_applications : [],
    conversion_rate: stats.conversion_rate || 0
  };

  // Check if we have any meaningful data
  const hasData = safeStats.total_applications > 0 || 
                  safeStats.status_breakdown.length > 0 || 
                  safeStats.field_breakdown.length > 0;

  if (!hasData) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        <EmptyAnalyticsState 
          title="No Application Data Found"
          description="Analytics will appear here once you have job applications in your system. The dashboard will show comprehensive insights about application trends, success rates, and user engagement."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        
        <div className="flex gap-4">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Select value={selectedField} onValueChange={setSelectedField}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Fields" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Fields</SelectItem>
              {safeStats.field_breakdown.map((field: any) => (
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
            <div className="text-2xl font-bold">{safeStats.total_applications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeStats.conversion_rate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Applications</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {safeStats.status_breakdown.find((s: any) => s.status === 'approved')?.count || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeStats.total_applications}</div>
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
            <StatusDistributionChart data={safeStats.status_breakdown} />
            <ApplicationMetricsChart data={safeStats.daily_applications} />
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <TrendAnalysisChart data={trends || []} />
        </TabsContent>

        <TabsContent value="fields" className="space-y-6">
          <FieldAnalyticsChart data={safeStats.field_breakdown} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Application Success Rate</h4>
                    <p className="text-2xl font-bold text-green-600">{safeStats.conversion_rate}%</p>
                    <p className="text-sm text-muted-foreground">of applications are approved</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Most Popular Field</h4>
                    <p className="text-lg font-semibold">
                      {safeStats.field_breakdown.length > 0 
                        ? safeStats.field_breakdown.sort((a, b) => b.count - a.count)[0]?.field || 'N/A'
                        : 'N/A'
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">highest application volume</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Total Volume</h4>
                    <p className="text-2xl font-bold text-blue-600">{safeStats.total_applications}</p>
                    <p className="text-sm text-muted-foreground">total applications received</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
