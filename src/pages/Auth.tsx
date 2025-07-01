
import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Auth = () => {
  const { user, signUp, signIn } = useAuth();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && returnUrl) {
      window.location.href = returnUrl;
    }
  }, [user, returnUrl]);

  if (user && !returnUrl) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      await signIn(formData.email, formData.password);
    } else {
      await signUp(formData.email, formData.password, formData.fullName);
    }

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/5e550e9d-5865-4e41-bf94-3e957f814d97.png" 
            alt="Frivo Solutions" 
            className="h-12 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-primary">Frivo Solutions</h1>
          {returnUrl && (
            <p className="text-sm text-slate-600 mt-2">
              Sign in to continue to job portal
            </p>
          )}
        </div>

        <Card className="frivo-card">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-900">
              {isLogin ? 'Welcome Back' : 'Join Frivo Solutions'}
            </CardTitle>
            <CardDescription className="text-slate-600">
              {isLogin 
                ? 'Sign in to access your career dashboard' 
                : 'Create your account and start your career journey'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-700">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full frivo-button" 
                disabled={loading}
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>
            
            <div className="text-center pt-4 border-t">
              <p className="text-slate-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Sign up here' : 'Sign in here'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-slate-600 hover:text-primary transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
