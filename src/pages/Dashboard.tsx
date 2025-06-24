
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  Settings, 
  LogOut, 
  Shield,
  FileText,
  Users,
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const calculateProfileCompletion = () => {
    if (!profile) return 0;
    let completed = 0;
    let total = 4;
    
    if (profile.full_name) completed++;
    if (profile.phone) completed++;
    if (profile.skills && profile.skills.length > 0) completed++;
    if (profile.resume_url) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const profileCompletion = calculateProfileCompletion();
  const isAdmin = profile?.role === 'admin';

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/3af85896-dbf9-4973-ac54-215e10c5b479.png" 
                alt="Frivo Solutions" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-primary">
                {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isAdmin ? 'default' : 'secondary'}>
                {isAdmin ? 'Administrator' : 'User'}
              </Badge>
              <Button variant="outline" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary">
            Welcome back, {profile.full_name || 'User'}!
          </h2>
          <p className="text-muted-foreground mt-2">
            {isAdmin 
              ? 'Manage your platform and oversee all operations' 
              : 'Manage your profile and explore job opportunities'
            }
          </p>
        </div>

        {/* Profile Completion Alert for Non-Admin Users */}
        {!isAdmin && profileCompletion < 100 && (
          <Card className="mb-6 border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Complete Your Profile
              </CardTitle>
              <CardDescription>
                Your profile is {profileCompletion}% complete. Complete it to improve your job application success rate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
                <Button asChild>
                  <Link to="/profile">Complete Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Management */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/profile')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                My Profile
              </CardTitle>
              <CardDescription>
                {isAdmin ? 'Manage your admin profile' : 'Update your professional information'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {profileCompletion}% complete
                </span>
                {profileCompletion === 100 ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Jobs */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/jobs')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                {isAdmin ? 'Manage Jobs' : 'Browse Jobs'}
              </CardTitle>
              <CardDescription>
                {isAdmin ? 'Oversee all job postings' : 'Find your next opportunity'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {isAdmin ? 'Review and manage job listings' : 'Explore available positions'}
              </p>
            </CardContent>
          </Card>

          {/* Admin Panel (Admin Only) */}
          {isAdmin && (
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Admin Panel
                </CardTitle>
                <CardDescription>
                  Full administrative control
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage users, jobs, and system settings
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Additional Admin Tools (Admin Only) */}
        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Overview</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin">View Analytics</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Management</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin">Manage Users</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Job Postings</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin">Manage Jobs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin">View Applications</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Stats for Regular Users */}
        {!isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{profileCompletion}%</div>
                <p className="text-sm text-muted-foreground">Profile completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {profile.skills?.length || 0}
                </div>
                <p className="text-sm text-muted-foreground">Skills added</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {profile.resume_url ? '✓' : '✗'}
                </div>
                <p className="text-sm text-muted-foreground">
                  Resume {profile.resume_url ? 'uploaded' : 'missing'}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
