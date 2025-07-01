
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowRight, CheckCircle, ArrowLeft, TrendingUp, Shield, Zap, Users } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const FinanceTransformation = () => {
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
            <span className="text-slate-900 font-medium">Finance Transformation</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <DollarSign className="h-4 w-4 mr-2" />
                Finance Transformation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Finance Transformation for the Modern Enterprise
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                In today's disruptive economic landscape, the role of the CFO has evolved dramatically. 
                In a post-pandemic world, finance leaders are no longer just managing numbers—they are at the 
                forefront of risk management, cash flow optimization, and business continuity.
              </p>
            </div>
          </div>
        </section>

        {/* Modern CFO Challenges */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                The Modern Finance Function
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                The finance function must now operate with greater speed and precision to keep up with 
                rapidly changing market conditions. At Frivo Solutions, we empower CFOs and finance teams 
                to embrace this transformation with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="border border-slate-200">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-3">Risk Management & Compliance</CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    Build resilient, agile finance functions anchored in streamlined and scalable operating models 
                    that support strategic decision-making.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Enhanced risk assessment frameworks</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Automated compliance monitoring</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Real-time reporting capabilities</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-3">Cash Flow Optimization</CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    Leverage our proven 3P framework—People, Processes, and cutting-edge Platforms—to 
                    deliver tailored outsourcing and business process solutions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Advanced forecasting models</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Working capital optimization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Liquidity management solutions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3P Framework */}
            <div className="bg-slate-50 rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Our Proven 3P Framework
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Leveraging our proven 3P framework—People, Processes, and cutting-edge Platforms—we deliver 
                  tailored outsourcing and business process solutions that modernize financial operations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">People</h4>
                  <p className="text-slate-600">Expert finance professionals with deep industry knowledge and proven track records in transformation initiatives.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Processes</h4>
                  <p className="text-slate-600">Streamlined, efficient processes that eliminate inefficiencies and enhance productivity across finance operations.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Platforms</h4>
                  <p className="text-slate-600">Cutting-edge technology platforms that enable automation, analytics, and strategic decision-making capabilities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Value */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Enabling CFOs to Become Strategic Advisors
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Frivo Solutions enables CFOs to become strategic advisors to the CEO and board, driving long-term value 
                and organizational agility in a fast-evolving business world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-primary mb-2">40%</div>
                <div className="text-slate-600 font-medium">Faster Financial Reporting</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-primary mb-2">60%</div>
                <div className="text-slate-600 font-medium">Reduction in Manual Tasks</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-primary mb-2">25%</div>
                <div className="text-slate-600 font-medium">Cost Savings</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-primary mb-2">99%</div>
                <div className="text-slate-600 font-medium">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Finance Function?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Let us help you build a resilient, agile finance function that drives strategic value 
              and organizational agility in today's fast-evolving business world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg"
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

export default FinanceTransformation;
