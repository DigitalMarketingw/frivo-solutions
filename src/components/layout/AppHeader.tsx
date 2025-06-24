
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationCenter } from '@/components/user/NotificationCenter';
import { Bell, Menu, User, LogOut, Settings, Shield, Sparkles } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = profile?.role === 'admin';
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Jobs', href: '/jobs', icon: '💼' },
    { name: 'Profile', href: '/profile', icon: '👤' },
    ...(isAdmin ? [{ name: 'Admin', href: '/admin', icon: '⚙️' }] : []),
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <img 
                src="/lovable-uploads/2f3c626a-f04b-488a-8711-bd0932156754.png" 
                alt="Frivo Solutions" 
                className="h-8 w-auto group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
                Frivo Solutions
              </span>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary/5 ${
                  isActivePath(item.href)
                    ? 'bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary border border-primary/20 shadow-sm'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Enhanced Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Notifications */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="relative hover:bg-primary/5 rounded-xl transition-colors">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-lg">
                  3
                </Badge>
              </Button>
            </div>

            {/* Enhanced User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:ring-2 hover:ring-primary/20 transition-all">
                  <Avatar className="h-8 w-8 ring-2 ring-white shadow-md">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-xs font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl p-2" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-3 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl mb-2">
                  <p className="text-sm font-semibold text-slate-900 leading-none">
                    {profile?.full_name || user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs leading-none text-slate-600">
                    {user?.email}
                  </p>
                  {isAdmin && (
                    <Badge variant="secondary" className="w-fit text-xs mt-2 bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary border-primary/20">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
                <DropdownMenuSeparator className="bg-slate-200/50" />
                <DropdownMenuItem asChild className="rounded-lg hover:bg-primary/5 cursor-pointer">
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild className="rounded-lg hover:bg-primary/5 cursor-pointer">
                    <Link to="/admin">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="rounded-lg hover:bg-primary/5 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-200/50" />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer rounded-lg hover:bg-red-50 text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Enhanced Mobile menu trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden hover:bg-primary/5 rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center space-x-3 pb-6 border-b border-slate-200/50">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20 shadow-md">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900">{profile?.full_name || user?.user_metadata?.full_name || 'User'}</p>
                      <p className="text-sm text-slate-600">{user?.email}</p>
                      {isAdmin && (
                        <Badge variant="secondary" className="text-xs mt-2 bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary border-primary/20">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActivePath(item.href)
                            ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg'
                            : 'text-slate-600 hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>

                  <div className="pt-6 border-t border-slate-200/50">
                    <Button 
                      variant="ghost" 
                      onClick={handleSignOut}
                      className="w-full justify-start hover:bg-red-50 text-red-600 rounded-xl"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
