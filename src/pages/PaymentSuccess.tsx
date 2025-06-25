
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Briefcase, Star } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'basic';

  const planDetails = {
    basic: { name: 'Basic', color: 'from-blue-500 to-blue-600' },
    premium: { name: 'Premium', color: 'from-purple-500 to-purple-600' },
    enterprise: { name: 'Enterprise', color: 'from-amber-500 to-amber-600' }
  };

  const currentPlan = planDetails[plan as keyof typeof planDetails] || planDetails.basic;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className={`w-20 h-20 bg-gradient-to-br ${currentPlan.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
              Payment Successful! 🎉
            </CardTitle>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Congratulations! You've successfully purchased the <strong>{currentPlan.name} Plan</strong>. 
              You now have unlimited access to apply for any job on our platform.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="bg-white rounded-xl p-6 border border-green-200/30">
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">What's Next?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Browse Jobs</h4>
                  <p className="text-sm text-slate-600">Explore thousands of job opportunities</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Apply Unlimited</h4>
                  <p className="text-sm text-slate-600">No restrictions on applications</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Track Progress</h4>
                  <p className="text-sm text-slate-600">Monitor your applications</p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <Button
                onClick={() => window.location.href = '/jobs'}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
              >
                Start Applying to Jobs
              </Button>
              
              <p className="text-sm text-slate-600">
                Need help? Contact our support team anytime.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default PaymentSuccess;
