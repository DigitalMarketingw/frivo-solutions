
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';

interface TrendAnalysisChartProps {
  data: Array<{ date: string; total: number; approved: number; rejected: number }>;
}

const chartConfig = {
  total: {
    label: 'Total Applications',
    color: '#3b82f6',
  },
  approved: {
    label: 'Approved',
    color: '#10b981',
  },
  rejected: {
    label: 'Rejected',
    color: '#ef4444',
  },
};

export const TrendAnalysisChart: React.FC<TrendAnalysisChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    date: format(new Date(item.date), 'MMM dd'),
  }));

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Trends</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">No trend data available</p>
            <p className="text-sm">Application trends will appear as data accumulates over time</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <LineChart data={formattedData}>
            <XAxis 
              dataKey="date" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              name="Total Applications"
            />
            <Line
              type="monotone"
              dataKey="approved"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Approved"
            />
            <Line
              type="monotone"
              dataKey="rejected"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name="Rejected"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
