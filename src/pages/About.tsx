
import React from 'react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Lightbulb, 
  Award, 
  ArrowRight, 
  Target, 
  Globe, 
  Handshake 
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Authenticity",
      description: "At Frivo Solutions, we believe that real impact begins with authentic collaboration. We partner with companies to bridge the gap between vision and execution—with honesty, clarity, and accountability at every step. Whether taking on full ownership or supporting specific phases of your project, we operate as an extension of your team—so you can stay focused on what matters most: your core business.",
      gradient: "from-red-500 to-pink-600"
    },
    {
      icon: Users,
      title: "Belonging",
      description: "At Frivo Solutions, belonging means everyone feels valued, respected, and empowered. We embrace diverse backgrounds and perspectives, creating an environment where people don't just fit in—they thrive together. Inclusion isn't a policy—it's our culture.",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "At Frivo Solutions, innovation drives everything we do. We challenge convention, embrace fresh ideas, and adapt quickly to change. As a modern, agile partner, we're not bound by tradition—we're built to move industries forward.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Award,
      title: "Meritocracy",
      description: "At Frivo Solutions, great ideas win—no matter where they come from. We empower individuals based on talent, contribution, and insight—not title or tenure. We listen openly, value constructive feedback, and let performance guide decisions.",
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/40">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-indigo-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 text-purple-700 font-semibold text-sm shadow-sm">
              <Globe className="h-4 w-4 mr-2" />
              About Frivo Solutions
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-slate-900">Empowering</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Global Success
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-light">
              At Frivo Solutions, we are committed to delivering top-tier IT consulting, staffing, and project management solutions that drive digital transformation and business success. Our expertise spans multiple industries, helping businesses leverage technology, optimize operations, and stay ahead in an evolving market.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/30 text-blue-600 font-medium text-sm">
                <Target className="h-4 w-4 mr-2" />
                Our Mission
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Building Meaningful
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Connections</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Frivo Solutions is dedicated to building meaningful global, cross-cultural connections that empower the careers of our employees and fuel the success of our clients. Our mission is to harness the strength of our international network to match the right talent with the right opportunities—always with fairness and without bias.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We deliver global workforce solutions infused with a personal, human-centered approach.
              </p>
            </div>
            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-12">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                      <Handshake className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Human-Centered Approach</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We are deeply grateful to our clients and team members who contribute daily to making us a trusted name in global talent solutions. We strive to make your experience with us a valuable one—worthy of your time, investment, knowledge, and hard-earned skills.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 text-purple-700 font-semibold text-sm shadow-sm mb-8">
              <Award className="h-4 w-4 mr-2" />
              Our Core Values
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              What Drives
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Our Success</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Our values guide every decision we make and every relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <CardContent className="p-8 space-y-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Creating Success Stories
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent"> Worth Sharing</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our goal is to do right by you and help create success stories you'll want to share with your peers, friends, and professional circles.
            </p>
          </div>

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

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary via-blue-700 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Discover opportunities that align with your skills and aspirations. Let's build your success story together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              asChild
            >
              <Link to="/auth">
                Explore Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-10 py-6 h-auto border-2 border-white text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
