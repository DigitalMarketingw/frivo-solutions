
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface FieldAnalyticsChartProps {
  data: Array<{ field: string; count: number }>;
}

const chartConfig = {
  count: {
    label: 'Applications',
    color: '#8b5cf6',
  },
};

export const FieldAnalyticsChart: React.FC<FieldAnalyticsChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications by Field</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <BarChart data={data} layout="horizontal">
            <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              dataKey="field" 
              type="category" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
