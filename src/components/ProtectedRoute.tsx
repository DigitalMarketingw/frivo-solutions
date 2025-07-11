
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  companyOnly?: boolean;
  superAdminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false, 
  companyOnly = false,
  superAdminOnly = false 
}) => {
  const { user, profile, loading } = useAuth();

  console.log('ProtectedRoute - Loading:', loading, 'User:', !!user, 'Profile:', profile?.role);

  // Show loading spinner while authentication is being determined
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

  // If no user, redirect to auth page
  if (!user) {
    console.log('No user found, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  // If super admin access is required but user is not super admin
  if (superAdminOnly && profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. Super Admin access is required.
            </p>
            <div className="space-y-3">
              <a 
                href="/dashboard" 
                className="block w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
              >
                Go to Dashboard
              </a>
              <p className="text-sm text-gray-500">
                Current role: {profile?.role || 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If admin access is required but user is not admin or company
  if (adminOnly && !['admin', 'company'].includes(profile?.role || '')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. Admin or Company access is required.
            </p>
            <div className="space-y-3">
              <a 
                href="/dashboard" 
                className="block w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
              >
                Go to Dashboard
              </a>
              <p className="text-sm text-gray-500">
                Current role: {profile?.role || 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If company access is required but user is not company
  if (companyOnly && profile?.role !== 'company') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. Company access is required.
            </p>
            <div className="space-y-3">
              <a 
                href="/dashboard" 
                className="block w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
              >
                Go to Dashboard
              </a>
              <p className="text-sm text-gray-500">
                Current role: {profile?.role || 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
