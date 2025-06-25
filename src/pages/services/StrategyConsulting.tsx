
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ArrowRight, CheckCircle, Rocket, DollarSign, ArrowLeft, Target, Users } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const StrategyConsulting = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/40">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Strategy & Consulting</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-indigo-500/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 text-purple-700 font-semibold text-sm shadow-sm mb-8">
                <Brain className="h-4 w-4 mr-2" />
                Strategy & Consulting
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Strategic Transformation
                </span>
                <br />
                That Delivers Results
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                At Frivo Solutions, we combine flexible delivery models, deep industry expertise, 
                proprietary frameworks, and strong technology alliances to drive real, measurable transformation for our clients.
              </p>
            </div>
          </div>
        </section>

        {/* Core Areas Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Our Strategy and Consulting Services Focus on 
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Three Core Areas</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Through tailored solutions and collaborative execution, we help organizations unlock efficiency, 
                accelerate innovation, and build scalable, future-ready operations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-xl rounded-3xl overflow-hidden">
                  <CardHeader className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Rocket className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-slate-900 mb-4">Business Transformation</CardTitle>
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      Reshape operations to drive efficiency, innovation, and sustainable growth through 
                      streamlined, future-ready operating models.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800">
                      <Link to="/services/business-transformation">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl rounded-3xl overflow-hidden">
                  <CardHeader className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-slate-900 mb-4">Finance Transformation</CardTitle>
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      Build resilient, agile finance functions with streamlined operating models and 
                      cutting-edge technology platforms.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <Button asChild className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800">
                      <Link to="/services/finance-transformation">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-3xl p-12 shadow-inner">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Why Choose Frivo Solutions for Strategic Consulting?
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Flexible Delivery Models</h4>
                  <p className="text-sm text-slate-600">Tailored approaches that adapt to your unique business needs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Deep Industry Expertise</h4>
                  <p className="text-sm text-slate-600">Proven experience across multiple industries and sectors</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Proprietary Frameworks</h4>
                  <p className="text-sm text-slate-600">Battle-tested methodologies for consistent results</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Strong Technology Alliances</h4>
                  <p className="text-sm text-slate-600">Partnerships with leading technology providers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-blue-700 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ready to Transform Your Business Strategy?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let our strategic consulting experts help you unlock efficiency, accelerate innovation, 
              and build scalable, future-ready operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/contact">
                  Get Started Today
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

export default StrategyConsulting;
