
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog, ArrowRight, CheckCircle, ArrowLeft, DollarSign, Users, Briefcase, TrendingUp, HeadphonesIcon } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const BusinessProcessManagement = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Business Process Management</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Cog className="h-4 w-4 mr-2" />
                Business Process Management
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Streamline Operations for Maximum Efficiency
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                At Frivo Solutions, we specialize in streamlining and optimizing business processes to boost 
                operational efficiency and drive productivity. Our end-to-end Business Process Management (BPM) 
                solutions span key functions including finance, recruitment, accounting, HR, marketing, IT support, 
                and overall process management.
              </p>
            </div>
          </div>
        </section>

        {/* Core Services Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Comprehensive BPM Solutions
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                With customized strategies tailored to your business needs, we help create smoother workflows, 
                reduce inefficiencies, and enhance team performance—so you can focus on scaling your business with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Finance & Accounts */}
              <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-slate-900 mb-3">Finance & Accounts Outsourcing</CardTitle>
                  <CardDescription className="text-slate-600">
                    Transform finance operations with scalable teams, modern technology, and optimized workflows 
                    across recruitment, healthcare, and manufacturing.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Recruitment Services */}
              <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-slate-900 mb-3">Outsourced Recruitment Services</CardTitle>
                  <CardDescription className="text-slate-600">
                    Full-cycle recruitment, locum services, sourcing, and admin support to scale your talent 
                    acquisition and reduce hiring timelines.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* HR Outsourcing */}
              <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-slate-900 mb-3">Human Resources Outsourcing</CardTitle>
                  <CardDescription className="text-slate-600">
                    Technology-enabled HR services built for modern workforce realities, from recruitment 
                    to employee engagement and development.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Marketing Services */}
              <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-slate-900 mb-3">Marketing Services</CardTitle>
                  <CardDescription className="text-slate-600">
                    Cost-effective marketing solutions for CMOs seeking agility and measurable impact, 
                    reducing overhead while amplifying ROI.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* IT Support */}
              <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <HeadphonesIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-slate-900 mb-3">IT Support Services</CardTitle>
                  <CardDescription className="text-slate-600">
                    Advanced IT support with 24/7 service desk, custom software development, and 
                    comprehensive infrastructure management.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Service Sections */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Finance & Accounts Detailed */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Finance & Accounts Outsourcing
                </h3>
                <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                  Finance teams today are under growing pressure to play a more strategic role—while still managing 
                  resource-heavy tasks such as reconciliation, compliance, and payroll. At Frivo Solutions, we offer 
                  a smarter path forward with outsourced finance and accounting services.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">The Challenge</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Delayed reporting and increased compliance risks</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Teams stretched too thin to adapt to market changes</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Missed opportunities for growth and innovation</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Our Solution</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Scalable team of experienced professionals</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Modern technology and optimized workflows</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Intelligent automation for transformation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recruitment Services Detailed */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Outsourced Recruitment Services
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border border-slate-200">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base text-slate-900 mb-2">Full Cycle Recruitment</CardTitle>
                    <CardDescription className="text-slate-600 text-sm">
                      Scale smarter with complete recruitment lifecycle management and high-quality candidates.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white border border-slate-200">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base text-slate-900 mb-2">Locum Recruitment</CardTitle>
                    <CardDescription className="text-slate-600 text-sm">
                      Round-the-clock support for urgent placements, cancellations, and seamless operations.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white border border-slate-200">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base text-slate-900 mb-2">Sourcing</CardTitle>
                    <CardDescription className="text-slate-600 text-sm">
                      Executive search, market mapping, and strategic headhunting for urgent and future needs.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white border border-slate-200">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base text-slate-900 mb-2">Admin Support</CardTitle>
                    <CardDescription className="text-slate-600 text-sm">
                      CV formatting, portal management, timesheet chasing, and database maintenance.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Optimize Your Business Processes?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Let us help you create smoother workflows, reduce inefficiencies, and enhance team performance 
              so you can focus on scaling your business with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg"
                asChild
              >
                <Link to="/contact">
                  Optimize Your Processes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default BusinessProcessManagement;
