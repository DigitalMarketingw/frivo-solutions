
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowRight, CheckCircle, ArrowLeft, TrendingUp, Shield, Zap, Users } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const FinanceTransformation = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/services/strategy-consulting" className="hover:text-primary">Strategy & Consulting</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Finance Transformation</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-green-500/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200/50 text-emerald-700 font-semibold text-sm shadow-sm mb-8">
                <DollarSign className="h-4 w-4 mr-2" />
                Finance Transformation
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                Finance Transformation for the
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Modern Enterprise
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                In today's disruptive economic landscape, the role of the CFO has evolved dramatically. 
                In a post-pandemic world, finance leaders are no longer just managing numbers—they are at the 
                forefront of risk management, cash flow optimization, and business continuity.
              </p>
            </div>
          </div>
        </section>

        {/* Modern CFO Challenges */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                The 
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Modern Finance Function</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                The finance function must now operate with greater speed and precision to keep up with 
                rapidly changing market conditions. At Frivo Solutions, we empower CFOs and finance teams 
                to embrace this transformation with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl rounded-3xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 mb-4">Risk Management & Compliance</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Build resilient, agile finance functions anchored in streamlined and scalable operating models 
                    that support strategic decision-making.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700">Enhanced risk assessment frameworks</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700">Automated compliance monitoring</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700">Real-time reporting capabilities</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl rounded-3xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 mb-4">Cash Flow Optimization</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Leverage our proven 3P framework—People, Processes, and cutting-edge Platforms—to 
                    deliver tailored outsourcing and business process solutions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Advanced forecasting models</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Working capital optimization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Liquidity management solutions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3P Framework */}
            <div className="bg-gradient-to-r from-slate-50 to-emerald-50/50 rounded-3xl p-12 shadow-inner">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Our Proven 3P Framework
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Leveraging our proven 3P framework—People, Processes, and cutting-edge Platforms—we deliver 
                  tailored outsourcing and business process solutions that modernize financial operations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-xl">People</h4>
                  <p className="text-slate-600">Expert finance professionals with deep industry knowledge and proven track records in transformation initiatives.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-xl">Processes</h4>
                  <p className="text-slate-600">Streamlined, efficient processes that eliminate inefficiencies and enhance productivity across finance operations.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-xl">Platforms</h4>
                  <p className="text-slate-600">Cutting-edge technology platforms that enable automation, analytics, and strategic decision-making capabilities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Value */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-8">
                Enabling CFOs to Become 
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Strategic Advisors</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Frivo Solutions enables CFOs to become strategic advisors to the CEO and board, driving long-term value 
                and organizational agility in a fast-evolving business world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-emerald-600 mb-2">40%</div>
                <div className="text-slate-600 font-medium">Faster Financial Reporting</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-emerald-600 mb-2">60%</div>
                <div className="text-slate-600 font-medium">Reduction in Manual Tasks</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-emerald-600 mb-2">25%</div>
                <div className="text-slate-600 font-medium">Cost Savings</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-emerald-600 mb-2">99%</div>
                <div className="text-slate-600 font-medium">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-700 to-green-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ready to Transform Your Finance Function?
            </h2>
            <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let us help you build a resilient, agile finance function that drives strategic value 
              and organizational agility in today's fast-evolving business world.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/contact">
                  Transform Your Finance Function
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

export default FinanceTransformation;
