
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { UserDashboard } from '@/components/user/UserDashboard';

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <UserDashboard />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
