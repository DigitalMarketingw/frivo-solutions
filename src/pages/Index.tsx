
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLayout } from '@/components/layout/AppLayout';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Target, 
  Award,
  Building2,
  UserCheck,
  TrendingUp,
  Shield,
  Clock,
  Globe
} from 'lucide-react';

const Index = () => {
  return (
    <AppLayout>
      {/* Hero Section - Minimal and Professional */}
      <section className="professional-section py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Excellence in IT Consulting
              <br />
              <span className="text-primary">& Staffing Solutions</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Partner with Frivo Solutions for strategic IT consulting, expert staffing, 
              and comprehensive project management that drives measurable business results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" asChild className="frivo-button">
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Clean Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive IT solutions designed to accelerate your business growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="frivo-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Strategy & Consulting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Strategic guidance and expert consulting to optimize your IT infrastructure and business processes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="frivo-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Business Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  End-to-end transformation services to modernize operations and drive sustainable growth.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="frivo-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">IT Staffing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Connect with top-tier IT professionals who match your specific project requirements and culture.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Professional Stats */}
      <section className="professional-section py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Frivo Solutions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Proven expertise and commitment to excellence in every engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">500+</h3>
              <p className="text-slate-600">Projects Delivered</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">98%</h3>
              <p className="text-slate-600">Client Satisfaction</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">15+</h3>
              <p className="text-slate-600">Years Experience</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">50+</h3>
              <p className="text-slate-600">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean and Direct */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Connect with our experts to discuss your project requirements and discover 
            how we can help accelerate your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-slate-900">
              <Link to="/auth">
                Explore Opportunities
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
