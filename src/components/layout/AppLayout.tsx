
import React from 'react';
import { AppHeader } from './AppHeader';
import { PublicHeader } from './PublicHeader';
import { Footer } from './Footer';
import { useAuth } from '@/contexts/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className = '' }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Show AppHeader for authenticated users, PublicHeader for non-authenticated users */}
      {user ? <AppHeader /> : <PublicHeader />}
      <main className={`${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
