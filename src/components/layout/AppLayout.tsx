
import React from 'react';
import { AppHeader } from './AppHeader';
import { useAuth } from '@/contexts/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className = '' }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Only show AppHeader for authenticated users */}
      {user && <AppHeader />}
      <main className={`${className}`}>
        {children}
      </main>
    </div>
  );
};
