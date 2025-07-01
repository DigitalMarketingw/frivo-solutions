
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, ArrowRight, CheckCircle, ArrowLeft, Building, Users, Briefcase, Heart } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const BusinessTransformation = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/40">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/services/strategy-consulting" className="hover:text-primary">Strategy & Consulting</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Business Transformation</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-indigo-500/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200/50 text-blue-700 font-semibold text-sm shadow-sm mb-8">
                <Rocket className="h-4 w-4 mr-2" />
                Business Transformation
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                Enabling Business Transformation for
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Scalable Growth
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                Business transformation can take many forms—but at its core, it's about reshaping operations to drive 
                efficiency, innovation, and sustainable growth. At Frivo Solutions, we help organizations adapt to 
                global disruption and unlock new potential through streamlined, future-ready operating models.
              </p>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Comprehensive 
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Transformation Services</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our business process transformation services are designed to enhance performance across key corporate 
                functions—particularly in finance and accounting—while also serving industry verticals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-xl rounded-3xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 mb-4">Industry Verticals</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Specialized expertise across multiple industries including recruitment & staffing, 
                    student housing, wine & spirits, and manufacturing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Recruitment & Staffing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Student Housing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Wine & Spirits</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Manufacturing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-xl rounded-3xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 mb-4">Niche Domains</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Deep expertise in specialized domains that require unique knowledge and 
                    tailored approaches for optimal results.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-slate-700">Healthcare, IT/Technology, and Engineering recruitment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-slate-700">Dental and restaurant accounting</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-slate-700">Umbrella company compliance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-slate-700">Law firm financial management</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transformation Approach */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-3xl p-12 shadow-inner">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Our Transformation Approach
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Whether you're refining your core operations or preparing for large-scale digital transformation, 
                  Frivo Solutions is your partner in reimagining the way you work—smarter, leaner, and ready for the future.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-xl">Streamlined Operations</h4>
                  <p className="text-slate-600">Optimize processes to eliminate inefficiencies and enhance productivity across all business functions.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-xl">Future-Ready Models</h4>
                  <p className="text-slate-600">Build scalable operating models that adapt to changing market conditions and growth requirements.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-xl">Sustainable Growth</h4>
                  <p className="text-slate-600">Create foundations for long-term success with transformation that drives efficiency and innovation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-700 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ready to Transform Your Business Operations?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let us help you adapt to global disruption and unlock new potential through 
              streamlined, future-ready operating models.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/contact">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-6 h-auto border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                asChild
              >
                <Link to="/services/strategy-consulting">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Strategy & Consulting
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default BusinessTransformation;
