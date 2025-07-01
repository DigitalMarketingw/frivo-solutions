
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Users, 
  Globe, 
  ArrowRight, 
  Award,
  Building,
  UserCheck,
  TrendingUp
} from 'lucide-react';

const About = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                About Frivo Solutions
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We are a leading provider of IT consulting, staffing, and business process management solutions, 
                dedicated to helping organizations achieve their digital transformation goals.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Founded with a vision to bridge the gap between technology and business success, 
                  Frivo Solutions has grown from a small consultancy to a trusted partner for 
                  organizations worldwide.
                </p>
                <p className="text-lg text-slate-600 mb-6">
                  We believe that the right combination of talented people, streamlined processes, 
                  and cutting-edge technology can transform any business. This philosophy drives 
                  everything we do.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Our Mission</h3>
                    <p className="text-slate-600">Empowering businesses through innovative technology solutions</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">500+</div>
                    <div className="text-slate-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">15+</div>
                    <div className="text-slate-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">50+</div>
                    <div className="text-slate-600">Countries Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">98%</div>
                    <div className="text-slate-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                These core values guide our decisions and shape our culture
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border border-slate-200">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center">
                    We strive for excellence in everything we do, delivering solutions that exceed expectations 
                    and drive meaningful business results.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center">
                    We believe in the power of teamwork, working closely with our clients as true partners 
                    to achieve shared goals and success.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center">
                    We embrace new technologies and approaches, constantly evolving to provide our clients 
                    with cutting-edge solutions and competitive advantages.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Approach</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                We follow a proven methodology that ensures successful outcomes for every project
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Understand</h3>
                <p className="text-slate-600 text-sm">
                  We begin by thoroughly understanding your business, challenges, and objectives
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Design</h3>
                <p className="text-slate-600 text-sm">
                  We create tailored solutions that align with your specific needs and goals
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Implement</h3>
                <p className="text-slate-600 text-sm">
                  We execute the solution with precision, ensuring minimal disruption to your operations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Optimize</h3>
                <p className="text-slate-600 text-sm">
                  We continuously monitor and optimize to ensure sustained success and growth
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work with Us?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business and achieve your goals together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/know-us/our-purpose">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default About;
