
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, ArrowRight, CheckCircle, ArrowLeft, Zap, BarChart3, Bot, Code } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const DigitalAutomation = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Digital & Automation</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Cpu className="h-4 w-4 mr-2" />
                Digital & Automation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Accelerate Your Digital Transformation
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                At Frivo Solutions, we empower organizations to move faster on their digital transformation journey 
                through intelligent technology and automation. Our team works closely with clients to design and 
                develop custom software solutions, enhance existing systems, and implement innovative technologies 
                that improve efficiency and future-proof operations.
              </p>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Comprehensive Digital Solutions
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Every solution is crafted to align with your unique business goals and drive meaningful, 
                measurable outcomes through advanced technology and intelligent automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Intelligent Automation */}
              <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-3">Intelligent Automation</CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    Harness AI, ML, and RPA to streamline business processes, enhance agility, and maximize 
                    your existing IT infrastructure for competitive advantage.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">AI/ML implementation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Process automation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Digital transformation acceleration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* RPA */}
              <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-3">Robotic Process Automation</CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    Build a hybrid workforce with software bots that automate repetitive, rule-based tasks, 
                    enabling your team to focus on higher-value work.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Automated data processing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Workflow optimization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Error reduction</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Analytics */}
              <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-3">Advanced Analytics</CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    Transform data into strategic assets with predictive modeling, machine learning, and 
                    analytics solutions that enable smarter, faster decision-making.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Predictive modeling</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Data mining</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Business intelligence</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Software Services */}
              <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-3">Software Services</CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    Custom software development with deep domain knowledge across recruitment, healthcare, 
                    finance, and manufacturing for meaningful business impact.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Custom software development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">System integrations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-slate-700">Platform modernization</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* RPA Detailed */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Building a Hybrid Workforce
                </h3>
                <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                  Robotic Process Automation (RPA) is reshaping the modern workplace, offering businesses the 
                  opportunity to build a hybrid workforce where human intelligence is supported by digital efficiency.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Repetitive Tasks</h4>
                  <p className="text-slate-600">Automate rule-based, high-volume tasks with speed and accuracy</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">System Integration</h4>
                  <p className="text-slate-600">Connect various systems and applications seamlessly</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Quality Assurance</h4>
                  <p className="text-slate-600">Reduce manual effort and minimize errors consistently</p>
                </div>
              </div>
            </div>

            {/* Industries Served */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Industries We Serve
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Our digital transformation solutions have helped organizations across various sectors achieve 
                  greater efficiency and scalability.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">Recruitment</div>
                  <div className="text-slate-600">Talent Acquisition</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">Healthcare</div>
                  <div className="text-slate-600">Patient Care</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">Finance</div>
                  <div className="text-slate-600">Financial Services</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">Manufacturing</div>
                  <div className="text-slate-600">Operations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Accelerate Your Digital Journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Let us help you implement intelligent technology and automation solutions that improve efficiency, 
              reduce manual effort, and future-proof your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg"
                asChild
              >
                <Link to="/contact">
                  Start Your Digital Transformation
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

export default DigitalAutomation;
