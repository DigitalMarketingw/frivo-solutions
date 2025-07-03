
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CompanyDashboard } from '@/components/company/CompanyDashboard';

const CompanyDashboardPage: React.FC = () => {
  return (
    <AppLayout>
      <CompanyDashboard />
    </AppLayout>
  );
};

export default CompanyDashboardPage;
