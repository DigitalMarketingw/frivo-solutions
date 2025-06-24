
import React from 'react';
import { UserDashboard } from '@/components/user/UserDashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <UserDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
