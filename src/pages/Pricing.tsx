
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { usePaymentStatus } from '@/hooks/usePaymentStatus';

const Pricing = () => {
  const { toast } = useToast();
  const { data: paymentStatus, isLoading } = usePaymentStatus();

  const plans = [
    {
      name: 'Basic',
      price: 499,
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      color: 'from-blue-50 to-blue-100/50',
      borderColor: 'border-blue-200/50',
      features: [
        'Apply to unlimited jobs',
        'Basic profile creation',
        'Application tracking',
        'Email notifications',
        'Standard support'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: 699,
      icon: <Star className="h-8 w-8 text-purple-500" />,
      color: 'from-purple-50 to-purple-100/50',
      borderColor: 'border-purple-200/50',
      features: [
        'All Basic features',
        'Priority application review',
        'Advanced analytics dashboard',
        'Resume optimization tips',
        'Interview preparation resources',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 799,
      icon: <Crown className="h-8 w-8 text-amber-500" />,
      color: 'from-amber-50 to-amber-100/50',
      borderColor: 'border-amber-200/50',
      features: [
        'All Premium features',
        'Dedicated career consultant',
        'Personal brand building',
        'Salary negotiation guidance',
        'Exclusive job opportunities',
        '24/7 VIP support'
      ],
      popular: false
    }
  ];

  const handlePayment = async (planType: string, amount: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { planType, amount }
      });

      if (error) throw error;
      
      // Open payment in new tab
      window.open(data.url, '_blank');
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  if (paymentStatus?.has_paid) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">You're All Set!</h1>
            <p className="text-lg text-slate-600 mb-8">
              You have already purchased the {paymentStatus.plan_type?.toUpperCase()} plan. 
              You can now apply to unlimited jobs!
            </p>
            <Button 
              onClick={() => window.location.href = '/jobs'}
              className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90"
              size="lg"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
            Choose Your Career Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Unlock unlimited job applications with our one-time payment plans. 
            Choose the plan that best fits your career goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative bg-gradient-to-br ${plan.color} ${plan.borderColor} border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                plan.popular ? 'scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-slate-600">one-time</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handlePayment(plan.name.toLowerCase(), plan.price * 100)}
                  className={`w-full py-6 text-lg font-semibold ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' 
                      : 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Get Started with {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-200/30">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Our Platform?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">One-Time Payment</h4>
                  <p className="text-slate-600 text-sm">No recurring fees. Pay once, apply forever.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Unlimited Applications</h4>
                  <p className="text-slate-600 text-sm">Apply to as many jobs as you want.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Premium Features</h4>
                  <p className="text-slate-600 text-sm">Access advanced tools and support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Pricing;
