
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Award, ArrowRight, CheckCircle, Star, Trophy, Target } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Enhanced Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/2f3c626a-f04b-488a-8711-bd0932156754.png" 
                alt="Frivo Solutions" 
                className="h-10 w-auto"
              />
              <div className="text-xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                Frivo Solutions
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="hover:bg-primary/5">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button variant="default" asChild className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-md hover:shadow-lg transition-all duration-200">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-indigo-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-primary/20 text-primary font-medium text-sm mb-8 shadow-sm">
              <Star className="h-4 w-4 mr-2 fill-current" />
              Premium Career Platform
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="text-slate-900">Launch Your</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dream Career
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              Join Frivo Solutions' exclusive job portal and get access to premium career opportunities. 
              Complete assessments, showcase your skills, and land your ideal position with our 
              <span className="font-semibold text-primary"> proven success system</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 h-auto bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
                asChild
              >
                <Link to="/auth">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-6 h-auto border-2 hover:bg-slate-50 hover:border-primary/30 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Guaranteed Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Trophy className="h-4 w-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
              Why Choose 
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Frivo Solutions?</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              We provide a comprehensive solution for career advancement with premium features 
              and personalized support throughout your professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl text-slate-900 mb-4">Premium Job Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-slate-600">
                  Access exclusive job opportunities from top-tier companies 
                  that you won't find on traditional job boards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-10 w-10 text-amber-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900 mb-4">Skill Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-slate-600">
                  Complete comprehensive assessments and coding challenges 
                  to demonstrate your expertise to potential employers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900 mb-4">Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-slate-600">
                  Receive dedicated career guidance and support throughout 
                  your application process and professional development.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Success Metrics */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-3xl p-12 shadow-inner">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">95%</div>
                <div className="text-slate-600 font-medium">Success Rate</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">500+</div>
                <div className="text-slate-600 font-medium">Partner Companies</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">10k+</div>
                <div className="text-slate-600 font-medium">Successful Placements</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">24/7</div>
                <div className="text-slate-600 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary via-blue-700 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white/90 font-medium text-sm mb-8">
            <Target className="h-4 w-4 mr-2" />
            Ready to Get Started?
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Join thousands of professionals who have successfully launched their careers 
            through Frivo Solutions' comprehensive platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              asChild
            >
              <Link to="/auth">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/2f3c626a-f04b-488a-8711-bd0932156754.png" 
                alt="Frivo Solutions" 
                className="h-10 w-auto filter brightness-0 invert"
              />
              <div className="text-xl font-bold">Frivo Solutions</div>
            </div>
            <div className="text-slate-400 text-center md:text-right">
              <p>© 2024 Frivo Solutions. All rights reserved.</p>
              <p className="text-sm mt-1">Building careers, one success story at a time.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
