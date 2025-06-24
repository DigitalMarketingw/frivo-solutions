
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface StatusDistributionChartProps {
  data: Array<{ status: string; count: number }>;
}

const COLORS = {
  applied: '#3b82f6',
  under_review: '#f59e0b',
  test_assigned: '#8b5cf6',
  test_completed: '#06b6d4',
  approved: '#10b981',
  rejected: '#ef4444',
};

const chartConfig = {
  applied: { label: 'Applied', color: COLORS.applied },
  under_review: { label: 'Under Review', color: COLORS.under_review },
  test_assigned: { label: 'Test Assigned', color: COLORS.test_assigned },
  test_completed: { label: 'Test Completed', color: COLORS.test_completed },
  approved: { label: 'Approved', color: COLORS.approved },
  rejected: { label: 'Rejected', color: COLORS.rejected },
};

export const StatusDistributionChart: React.FC<StatusDistributionChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    name: item.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    fill: COLORS[item.status as keyof typeof COLORS] || '#8884d8',
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[400px]">
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="count"
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
