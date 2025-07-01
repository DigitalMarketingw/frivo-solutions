
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
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <Brain className="h-4 w-4 mr-2" />
              Strategy & Consulting
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
              Strategic Transformation
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Flexible delivery models, deep industry expertise, and proprietary frameworks 
              to drive measurable transformation and sustainable business growth.
            </p>
            
            <div className="pt-4">
              <Button size="lg" asChild>
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Strategic Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-3">{service.title}</CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let our strategic consulting experts help you navigate complex challenges and unlock new opportunities.
          </p>
          
          <Button 
            variant="secondary" 
            size="lg"
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
