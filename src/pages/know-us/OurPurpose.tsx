
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Target, Globe, Users } from 'lucide-react';

const OurPurpose: React.FC = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our Purpose
            </h1>
            <p className="text-xl text-slate-600">
              Fueling Innovation Through Excellence
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Purpose: Fueling Innovation</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Founded with a clear mission to support ambitious businesses in accounting, recruitment, and beyond, Frivo Solutions has been dedicated to helping organizations scale efficiently and sustainably. Drawing on the strength of our service model and the unique culture that defines us, we've expanded our capabilities across new sectors, services, and global markets.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  We continue to deliver lasting value to our clients, our teams, and the communities we work in—by combining expertise, innovation, and a people-first mindset.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">WE ARE FRIVO</h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  We harness the power of the right talent, streamlined processes, and smart technology to transform and elevate your business operations.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  Corporate Social Responsibility
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  At Frivo Solutions, sustainability is not an initiative—it's a mindset woven into everything we do. We are dedicated to creating a positive social and environmental impact by promoting diversity, inclusion, access to education, and community upliftment.
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Our commitment goes beyond business—we actively align with global sustainability efforts to help build a more equitable future. By embedding purpose into our operations, we aim to create lasting, meaningful change for our people and the world around us.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Corporate citizenship at Frivo is a continuous journey. Guided by our values, we integrate "Impact-Driven Outsourcing" into our day-to-day practices, staying focused on doing business that does good.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                  <Globe className="h-8 w-8 text-primary mr-3" />
                  Frivo Solutions and the United Nations' Sustainable Development Goals (SDGs)
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Now more than ever, our world needs collective action—and at Frivo Solutions, we are proud to play our part. Through our ongoing commitment to responsible business practices, we align our efforts with the United Nations' 17 Sustainable Development Goals (SDGs) to support meaningful global progress.
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  In partnership with impact-driven initiatives like the 'Business for Good' movement, we integrate our "Outsourcing with Impact" philosophy into the way we work every day. These efforts help us contribute directly to key goals such as eradicating poverty, improving access to clean water, advancing education, promoting health and literacy, and building more inclusive communities.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  The chart below highlights how Frivo Solutions is actively supporting the UN Global Goals and delivering measurable impact across areas that matter most.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default OurPurpose;
