
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, ArrowRight, CheckCircle, ArrowLeft, Zap, BarChart3, Bot, Code } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const DigitalAutomation = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/40">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Digital & Automation</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200/50 text-indigo-700 font-semibold text-sm shadow-sm mb-8">
                <Cpu className="h-4 w-4 mr-2" />
                Digital & Automation
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                Accelerate Your
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Digital Transformation
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                At Frivo Solutions, we empower organizations to move faster on their digital transformation journey 
                through intelligent technology and automation. Our team works closely with clients to design and 
                develop custom software solutions, enhance existing systems, and implement innovative technologies 
                that improve efficiency and future-proof operations.
              </p>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Comprehensive 
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Digital Solutions</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Every solution is crafted to align with your unique business goals and drive meaningful, 
                measurable outcomes through advanced technology and intelligent automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Intelligent Automation */}
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 mb-4">Intelligent Automation</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Harness AI, ML, and RPA to streamline business processes, enhance agility, and maximize 
                    your existing IT infrastructure for competitive advantage.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                      <span className="text-slate-700">AI/ML implementation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                      <span className="text-slate-700">Process automation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                      <span className="text-slate-700">Digital transformation acceleration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* RPA */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 mb-4">Robotic Process Automation</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Build a hybrid workforce with software bots that automate repetitive, rule-based tasks, 
                    enabling your team to focus on higher-value work.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Automated data processing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Workflow optimization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700">Error reduction</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Analytics */}
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 mb-4">Advanced Analytics</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Transform data into strategic assets with predictive modeling, machine learning, and 
                    analytics solutions that enable smarter, faster decision-making.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700">Predictive modeling</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700">Data mining</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700">Business intelligence</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Software Services */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 mb-4">Software Services</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    Custom software development with deep domain knowledge across recruitment, healthcare, 
                    finance, and manufacturing for meaningful business impact.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-slate-700">Custom software development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-slate-700">System integrations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-slate-700">Platform modernization</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* RPA Detailed */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Building a 
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Hybrid Workforce</span>
                </h3>
                <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                  Robotic Process Automation (RPA) is reshaping the modern workplace, offering businesses the 
                  opportunity to build a hybrid workforce where human intelligence is supported by digital efficiency.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">Repetitive Tasks</h4>
                  <p className="text-slate-600">Automate rule-based, high-volume tasks with speed and accuracy</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">System Integration</h4>
                  <p className="text-slate-600">Connect various systems and applications seamlessly</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">Quality Assurance</h4>
                  <p className="text-slate-600">Reduce manual effort and minimize errors consistently</p>
                </div>
              </div>
            </div>

            {/* Industries Served */}
            <div className="bg-gradient-to-r from-slate-50 to-indigo-50/50 rounded-3xl p-12 shadow-inner">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Industries We Serve
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Our digital transformation solutions have helped organizations across various sectors achieve 
                  greater efficiency and scalability.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Recruitment</div>
                  <div className="text-slate-600 font-medium">Talent Acquisition</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Healthcare</div>
                  <div className="text-slate-600 font-medium">Patient Care</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Finance</div>
                  <div className="text-slate-600 font-medium">Financial Services</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Manufacturing</div>
                  <div className="text-slate-600 font-medium">Operations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ready to Accelerate Your Digital Journey?
            </h2>
            <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let us help you implement intelligent technology and automation solutions that improve efficiency, 
              reduce manual effort, and future-proof your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300"
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

export default DigitalAutomation;
