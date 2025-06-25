
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog, ArrowRight, CheckCircle, ArrowLeft, DollarSign, Users, Briefcase, TrendingUp, HeadphonesIcon } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const BusinessProcessManagement = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/40">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Business Process Management</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200/50 text-amber-700 font-semibold text-sm shadow-sm mb-8">
                <Cog className="h-4 w-4 mr-2" />
                Business Process Management
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                Streamline Operations for
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Maximum Efficiency
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                At Frivo Solutions, we specialize in streamlining and optimizing business processes to boost 
                operational efficiency and drive productivity. Our end-to-end Business Process Management (BPM) 
                solutions span key functions including finance, recruitment, accounting, HR, marketing, IT support, 
                and overall process management.
              </p>
            </div>
          </div>
        </section>

        {/* Core Services Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Comprehensive 
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"> BPM Solutions</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                With customized strategies tailored to your business needs, we help create smoother workflows, 
                reduce inefficiencies, and enhance team performance—so you can focus on scaling your business with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Finance & Accounts */}
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-4">Finance & Accounts Outsourcing</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Transform finance operations with scalable teams, modern technology, and optimized workflows 
                    across recruitment, healthcare, and manufacturing.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Recruitment Services */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-4">Outsourced Recruitment Services</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Full-cycle recruitment, locum services, sourcing, and admin support to scale your talent 
                    acquisition and reduce hiring timelines.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* HR Outsourcing */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-4">Human Resources Outsourcing</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Technology-enabled HR services built for modern workforce realities, from recruitment 
                    to employee engagement and development.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Marketing Services */}
              <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-4">Marketing Services</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Cost-effective marketing solutions for CMOs seeking agility and measurable impact, 
                    reducing overhead while amplifying ROI.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* IT Support */}
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <HeadphonesIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-4">IT Support Services</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Advanced IT support with 24/7 service desk, custom software development, and 
                    comprehensive infrastructure management.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Service Sections */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-amber-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Finance & Accounts Detailed */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Finance & Accounts 
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Outsourcing</span>
                </h3>
                <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                  Finance teams today are under growing pressure to play a more strategic role—while still managing 
                  resource-heavy tasks such as reconciliation, compliance, and payroll. At Frivo Solutions, we offer 
                  a smarter path forward with outsourced finance and accounting services.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">The Challenge</h4>
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
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">Our Solution</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Scalable team of experienced professionals</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Modern technology and optimized workflows</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Intelligent automation for transformation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recruitment Services Detailed */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Outsourced 
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Recruitment Services</span>
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border-0 shadow-lg rounded-2xl">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg text-slate-900">Full Cycle Recruitment</CardTitle>
                    <CardDescription className="text-slate-600">
                      Scale smarter with complete recruitment lifecycle management and high-quality candidates.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white border-0 shadow-lg rounded-2xl">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg text-slate-900">Locum Recruitment</CardTitle>
                    <CardDescription className="text-slate-600">
                      Round-the-clock support for urgent placements, cancellations, and seamless operations.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white border-0 shadow-lg rounded-2xl">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg text-slate-900">Sourcing</CardTitle>
                    <CardDescription className="text-slate-600">
                      Executive search, market mapping, and strategic headhunting for urgent and future needs.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white border-0 shadow-lg rounded-2xl">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg text-slate-900">Admin Support</CardTitle>
                    <CardDescription className="text-slate-600">
                      CV formatting, portal management, timesheet chasing, and database maintenance.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-700 to-yellow-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ready to Optimize Your Business Processes?
            </h2>
            <p className="text-xl text-amber-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let us help you create smoother workflows, reduce inefficiencies, and enhance team performance 
              so you can focus on scaling your business with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300"
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
                className="text-lg px-10 py-6 h-auto border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
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
