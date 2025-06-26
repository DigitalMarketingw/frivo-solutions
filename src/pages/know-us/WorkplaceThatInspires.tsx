
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Heart, Users, BookOpen, Home, Globe, Lightbulb } from 'lucide-react';

const WorkplaceThatInspires: React.FC = () => {
  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              A Workplace That Inspires
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Where Innovation Meets Culture
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-2xl p-8 mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">SHAPE YOUR TOMORROW WITH FRIVO</h2>
                <p className="text-slate-700 leading-relaxed text-lg">
                  Take the next step in your career with a company that values growth, innovation, and people. At Frivo Solutions, we empower individuals to thrive through meaningful work, continuous learning, and a strong sense of community.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg font-medium mt-4">
                  Join us—and let's shape a brighter future, together.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">About Frivo Solutions</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Welcome to the Frivo Family—where bright minds come together to work on impactful projects for some of the world's most respected organizations.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  At Frivo Solutions, we foster a collaborative and inclusive environment that supports both professional growth and personal well-being. Our culture is rooted in continuous learning, innovation, and a healthy work-life balance—empowering every team member to grow, thrive, and make a real difference.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">LIFE AT FRIVO SOLUTIONS</h2>
                <p className="text-slate-700 leading-relaxed text-center mb-12">
                  At Frivo, we believe success starts with our people. That's why we're committed to creating a workplace that nurtures wellbeing, celebrates individuality, and supports your personal and professional journey.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">🌿 Wellbeing That Matters</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Your health and happiness matter to us. We actively promote wellbeing by encouraging every team member to take care of themselves—physically, mentally, and emotionally—through thoughtful resources and support systems.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">🤝 Accessible Leadership</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    At Frivo, our leaders are approachable, engaged, and eager to help you grow. You'll have regular opportunities to connect, learn, and gain insights directly from those who lead by example.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">📚 Grow With Us</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    We champion continuous learning and development. Whether you're deepening expertise or exploring new paths, we provide the tools, mentorship, and encouragement to help you thrive in your career.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                      <Home className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">🏡 A Culture That Feels Like Home</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    We're more than a workplace—we're a community. Our team is built on trust, shared values, and genuine care for one another, creating a culture that feels more like family than colleagues.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">🌍 Inclusive by Nature</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Diversity is our strength, and belonging is our goal. We foster a respectful, open environment where everyone has the freedom to be themselves and the support to succeed.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                      <Lightbulb className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">💡 Guided by Our Values</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Our core values shape everything we do—from how we collaborate, to how we serve our clients. They're not just words—they're the foundation of who we are and what we stand for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default WorkplaceThatInspires;
