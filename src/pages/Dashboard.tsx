
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { UserDashboard } from '@/components/user/UserDashboard';
import { CompanyDashboard } from '@/components/company/CompanyDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect admin users to the admin panel
  if (profile?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  // Show company dashboard for company users
  if (profile?.role === 'company') {
    return (
      <AppLayout>
        <CompanyDashboard />
      </AppLayout>
    );
  }

  // Show user dashboard for regular users
  return (
    <AppLayout>
      <UserDashboard />
    </AppLayout>
  );
};

export default Dashboard;
