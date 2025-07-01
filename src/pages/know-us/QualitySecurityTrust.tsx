
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Shield, Award, Lock, Eye } from 'lucide-react';

const QualitySecurityTrust: React.FC = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Frivo Quality, Security & Trust
            </h1>
            <p className="text-xl text-slate-600">
              Upholding the Highest Standards of Quality and Data Protection
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  HOW DOES FRIVO SOLUTIONS UPHOLD THE HIGHEST STANDARDS OF QUALITY AND DATA PROTECTION?
                </h2>
              </div>

              <div className="mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                  <Award className="h-8 w-8 text-primary mr-3" />
                  Quality Management at Frivo Solutions
                </h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                  At Frivo Solutions, we prioritize measurable performance, continuous improvement, and operational excellence through a robust Quality Management System (QMS). Aligned with the globally recognized ISO 9001:2015 standard and accredited by BSI, our QMS enables us to embed best practices into every process we follow.
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  We uphold strict quality standards through regular training, internal audits, and third-party evaluations, ensuring our procedures are both efficient and aligned with evolving business goals. Our internal audit teams assess the effectiveness of workflows and implement enhancements where needed, ensuring that our operations stay responsive, reliable, and client-focused.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  By adhering to a rigorous quality framework, Frivo Solutions not only delivers consistent, high-quality service, but also empowers clients with the confidence that their business needs are met with precision and care. This structured approach allows us to better allocate resources—whether it's people, technology, or data—and reinforce our commitment to excellence at every level.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                  <Lock className="h-8 w-8 text-primary mr-3" />
                  Information Security Management System (ISMS)
                </h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Following a successful audit conducted by the British Standards Institution (BSI), Frivo Solutions has been awarded the internationally recognized ISO 27001:2022 certification, the gold standard for Information Security Management Systems (ISMS). This certification reflects our deep commitment to protecting sensitive data and maintaining a secure environment for all stakeholders.
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  At Frivo Solutions, we implement strict information security protocols, including:
                </p>
                <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
                  <li>Controlled access to data, limited to authorized personnel only</li>
                  <li>Secure, monitored channels for all external data transfers</li>
                  <li>Restrictions on removable devices such as USB drives and smartphones at workstations</li>
                  <li>Firewall-based restrictions on access to external internet platforms like personal email, FTPs, or cloud storage</li>
                  <li>Enterprise-grade antivirus solutions deployed and updated across all workstations</li>
                  <li>Secure operations zones with magnetic door locks and access granted only to relevant team members</li>
                  <li>24/7 physical security with CCTV surveillance and manned security at all entry points</li>
                  <li>Ongoing awareness programs to educate users on IT policies and security practices</li>
                </ul>
                <p className="text-slate-700 leading-relaxed">
                  By adhering to ISO 27001:2022, we ensure that data confidentiality, integrity, and availability are consistently maintained. At Frivo Solutions, we recognize that information is one of our most valuable assets, and we continuously assess and enhance our systems to provide the highest level of protection for our clients and partners.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <Eye className="h-6 w-6 text-primary mr-3" />
                  Transparency and Trust
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  We believe that trust is built through transparency. Our clients have full visibility into our processes, 
                  and we maintain open communication channels throughout every engagement. This commitment to transparency 
                  ensures that our clients can trust us with their most critical business operations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default QualitySecurityTrust;
