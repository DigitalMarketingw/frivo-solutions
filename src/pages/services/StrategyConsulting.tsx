import React from 'react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  Award,
  Lightbulb 
} from 'lucide-react';

const StrategyConsulting = () => {
  const services = [
    {
      icon: Target,
      title: "Strategic Planning & Vision",
      description: "Develop comprehensive strategic roadmaps aligned with your business objectives and market opportunities."
    },
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Identify and implement operational improvements to maximize efficiency and drive sustainable growth."
    },
    {
      icon: Users,
      title: "Change Management",
      description: "Guide your organization through transformational changes with proven methodologies and frameworks."
    },
    {
      icon: Lightbulb,
      title: "Innovation Strategy",
      description: "Harness emerging technologies and market trends to create competitive advantages and new opportunities."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/40">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-indigo-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200/50 text-purple-700 font-semibold text-sm shadow-sm">
              <Brain className="h-4 w-4 mr-2" />
              Strategy & Consulting
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-slate-900">Strategic</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Transformation
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-light">
              Flexible delivery models, deep industry expertise, and proprietary frameworks 
              to drive measurable transformation and sustainable business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300" 
                asChild
              >
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Our Strategic
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <CardHeader className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 mb-4">{service.title}</CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Let our strategic consulting experts help you navigate complex challenges and unlock new opportunities.
          </p>
          
          <Button 
            variant="secondary" 
            size="lg" 
            className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-slate-50 shadow-lg transition-all duration-300"
            asChild
          >
            <Link to="/contact">
              Contact Our Experts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StrategyConsulting;
