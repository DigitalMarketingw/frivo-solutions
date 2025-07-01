
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, ArrowRight, CheckCircle, ArrowLeft, Building, Users, Briefcase, Heart } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const BusinessTransformation = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/services/strategy-consulting" className="hover:text-primary">Strategy & Consulting</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Business Transformation</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Rocket className="h-4 w-4 mr-2" />
                Business Transformation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Enabling Business Transformation for Scalable Growth
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Business transformation can take many forms—but at its core, it's about reshaping operations to drive 
                efficiency, innovation, and sustainable growth. At Frivo Solutions, we help organizations adapt to 
                global disruption and unlock new potential through streamlined, future-ready operating models.
              </p>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Comprehensive Transformation Services
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our business process transformation services are designed to enhance performance across key corporate 
                functions—particularly in finance and accounting—while also serving industry verticals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="border border-slate-200">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-3">Industry Verticals</CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    Specialized expertise across multiple industries including recruitment & staffing, 
                    student housing, wine & spirits, and manufacturing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Recruitment & Staffing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Student Housing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Wine & Spirits</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Manufacturing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-3">Niche Domains</CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    Deep expertise in specialized domains that require unique knowledge and 
                    tailored approaches for optimal results.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Healthcare, IT/Technology, and Engineering recruitment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Dental and restaurant accounting</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Umbrella company compliance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Law firm financial management</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transformation Approach */}
            <div className="bg-slate-50 rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Our Transformation Approach
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Whether you're refining your core operations or preparing for large-scale digital transformation, 
                  Frivo Solutions is your partner in reimagining the way you work—smarter, leaner, and ready for the future.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Streamlined Operations</h4>
                  <p className="text-slate-600">Optimize processes to eliminate inefficiencies and enhance productivity across all business functions.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Future-Ready Models</h4>
                  <p className="text-slate-600">Build scalable operating models that adapt to changing market conditions and growth requirements.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Sustainable Growth</h4>
                  <p className="text-slate-600">Create foundations for long-term success with transformation that drives efficiency and innovation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Business Operations?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Let us help you adapt to global disruption and unlock new potential through 
              streamlined, future-ready operating models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg"
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
                className="border-white/30 text-white hover:bg-white/10"
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
