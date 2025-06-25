import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { Footer } from '@/components/layout/Footer';
import { WorldMapBackground } from '@/components/layout/WorldMapBackground';
import { Briefcase, Users, Award, ArrowRight, CheckCircle, Star, Trophy, Target, Play, Brain, Rocket, DollarSign, Cog, Cpu } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/40">
      <PublicHeader />

      {/* Modern Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-indigo-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-20">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 text-purple-700 font-medium text-sm shadow-sm">
                <Star className="h-4 w-4 mr-2 fill-current" />
                Grow Fast
              </div>
              
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-slate-900">Welcome to</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Your Career
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Success
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl font-light">
                  Transform your professional journey with Frivo Solutions. Access premium opportunities, 
                  complete skill assessments, and accelerate your career growth with our proven platform.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
                  asChild
                >
                  <Link to="/auth">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-6 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Expert support</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Feature Card */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-blue-50 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-slate-900">Career Dashboard</CardTitle>
                          <CardDescription className="text-slate-600">Track your progress</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">Job Applications</span>
                        <span className="text-2xl font-bold text-primary">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">Interviews Scheduled</span>
                        <span className="text-2xl font-bold text-green-600">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">Skill Assessments</span>
                        <span className="text-2xl font-bold text-blue-600">12</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">75% Profile Completion</p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Floating Success Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  <Trophy className="h-4 w-4 inline mr-1" />
                  95% Success Rate
                </div>
              </div>
              
              {/* Background Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 text-purple-700 font-semibold text-sm shadow-sm mb-8">
              <Trophy className="h-4 w-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              Three Reasons to 
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Choose Frivo</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Discover why thousands of professionals trust Frivo Solutions for their career advancement journey.
            </p>
          </div>

          {/* Feature Section 1 - Premium Job Listings */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/30 text-purple-600 font-medium text-sm">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Premium Access
                </div>
                <div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    Exclusive Job
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Opportunities</span>
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed mb-8 font-light">
                    Access premium job listings from Fortune 500 companies and innovative startups. 
                    Our curated opportunities are exclusively available to Frivo members, giving you 
                    a competitive edge in your job search.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Verified company profiles and salary ranges</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Direct connection with hiring managers</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Priority application processing</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-blue-50 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                          <Briefcase className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-slate-900">Job Board</CardTitle>
                          <CardDescription className="text-slate-600 text-lg">Premium listings</CardDescription>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        New
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-800">Senior Developer</span>
                          <span className="text-2xl font-bold text-purple-600">$120K</span>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">Tech Startup • Remote</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-800">Product Manager</span>
                          <span className="text-2xl font-bold text-blue-600">$95K</span>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">Fortune 500 • Hybrid</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-800">UX Designer</span>
                          <span className="text-2xl font-bold text-indigo-600">$85K</span>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">Design Agency • On-site</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  500+ Jobs
                </div>
              </div>
            </div>
          </div>

          {/* Feature Section 2 - Skill Assessments */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                          <Award className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-slate-900">Skill Assessment</CardTitle>
                          <CardDescription className="text-slate-600 text-lg">Prove your expertise</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">JavaScript</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{width: '92%'}}></div>
                          </div>
                          <span className="text-sm font-semibold text-green-600">92%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">React</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{width: '88%'}}></div>
                          </div>
                          <span className="text-sm font-semibold text-blue-600">88%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">Python</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span className="text-sm font-semibold text-purple-600">85%</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl text-center">
                        <p className="text-green-700 font-semibold">Certified Expert Level</p>
                        <p className="text-green-600 text-sm">Top 10% of all candidates</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Expert Level
                </div>
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/30 text-amber-600 font-medium text-sm">
                  <Award className="h-4 w-4 mr-2" />
                  Skill Validation
                </div>
                <div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    Comprehensive
                    <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"> Assessments</span>
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed mb-8 font-light">
                    Demonstrate your technical expertise through industry-standard assessments and coding challenges. 
                    Our comprehensive evaluation system helps employers understand your true capabilities and 
                    gives you the recognition you deserve.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Industry-standard coding challenges</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Real-time performance analytics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Verified skill certifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Section 3 - Expert Support */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/30 text-emerald-600 font-medium text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Expert Guidance
                </div>
                <div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    Dedicated Career
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent"> Support</span>
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed mb-8 font-light">
                    Get personalized guidance from industry experts and career coaches. Our dedicated support team 
                    is available 24/7 to help you navigate your career journey and achieve your professional goals.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">One-on-one career coaching sessions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Resume and portfolio optimization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">24/7 expert support availability</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <CardHeader className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                          <Users className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-slate-900">Support Team</CardTitle>
                          <CardDescription className="text-slate-600 text-lg">Expert guidance</CardDescription>
                        </div>
                      </div>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          SC
                        </div>
                        <div className="flex-1 bg-emerald-50 rounded-2xl p-4">
                          <p className="text-slate-700 text-sm">Great work on your profile! I've reviewed your resume and have some suggestions to improve your interview success rate.</p>
                          <p className="text-emerald-600 text-xs mt-2 font-medium">Sarah - Career Coach</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 justify-end">
                        <div className="flex-1 bg-blue-50 rounded-2xl p-4 max-w-xs">
                          <p className="text-slate-700 text-sm">Thank you! When can we schedule our next session?</p>
                          <p className="text-blue-600 text-xs mt-2 font-medium text-right">You</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          Y
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          SC
                        </div>
                        <div className="flex-1 bg-emerald-50 rounded-2xl p-4">
                          <p className="text-slate-700 text-sm">How about tomorrow at 2 PM? I'll send you a calendar invite.</p>
                          <p className="text-emerald-600 text-xs mt-2 font-medium">Sarah - Career Coach</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  24/7 Support
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Success Metrics */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-3xl p-12 shadow-inner mb-16 relative overflow-hidden">
            <WorldMapBackground />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
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

          {/* Contact Us CTA Section */}
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200/50 text-emerald-700 font-semibold text-sm shadow-sm mb-8">
              <Target className="h-4 w-4 mr-2" />
              Ready to Get Started?
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Ready to Take the Next Step in Your Career?
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light mb-8">
              Share your career goals with us and let our expert team connect you with opportunities that match your aspirations.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 h-auto bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
              asChild
            >
              <Link to="/contact">
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Services Section */}
      <section className="py-32 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 text-purple-700 font-semibold text-sm shadow-sm mb-8">
              <Briefcase className="h-4 w-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              Comprehensive Solutions for
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Business Growth</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              From strategic consulting to digital transformation, we deliver end-to-end solutions 
              that drive efficiency, innovation, and sustainable growth for your organization.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Strategy & Consulting */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              <CardHeader className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-900 mb-4">Strategy & Consulting</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Flexible delivery models, deep industry expertise, and proprietary frameworks to drive measurable transformation.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/services/strategy-consulting">
                    Know More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Business Transformation */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-900 mb-4">Business Transformation</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Reshape operations to drive efficiency, innovation, and sustainable growth through streamlined operating models.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/services/business-transformation">
                    Know More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Finance Transformation */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              <CardHeader className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-900 mb-4">Finance Transformation</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Build resilient, agile finance functions with streamlined operating models and modern technology platforms.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/services/finance-transformation">
                    Know More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Business Process Management */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Cog className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-900 mb-4">Business Process Management</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Streamline operations across finance, recruitment, HR, marketing, and IT to boost efficiency and productivity.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/services/business-process-management">
                    Know More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Digital & Automation */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl md:col-span-2 lg:col-span-1">
              <CardHeader className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-900 mb-4">Digital & Automation</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Accelerate digital transformation with AI, ML, RPA, and custom software solutions for future-ready operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/services/digital-automation">
                    Know More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Service Stats */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-3xl p-12 shadow-inner">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">15+</div>
                <div className="text-slate-600 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">200+</div>
                <div className="text-slate-600 font-medium">Clients Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">50+</div>
                <div className="text-slate-600 font-medium">Industries</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">98%</div>
                <div className="text-slate-600 font-medium">Client Satisfaction</div>
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
      <Footer />
    </div>
  );
};

export default Index;
