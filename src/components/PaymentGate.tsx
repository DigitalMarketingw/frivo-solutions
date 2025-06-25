
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, CreditCard, Star } from 'lucide-react';

interface PaymentGateProps {
  onViewPlans: () => void;
}

export const PaymentGate: React.FC<PaymentGateProps> = ({ onViewPlans }) => {
  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200/50 shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900">
          Unlock Unlimited Job Applications
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <p className="text-center text-slate-600 text-lg">
          To apply for jobs, you need to choose one of our career plans. 
          This one-time payment gives you unlimited access to apply for any job on our platform.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-blue-200/30">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Basic Plan</h4>
            <p className="text-2xl font-bold text-blue-600">$499</p>
            <p className="text-xs text-slate-500">One-time payment</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg border-2 border-purple-300 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Popular</span>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Star className="h-4 w-4 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Premium Plan</h4>
            <p className="text-2xl font-bold text-purple-600">$699</p>
            <p className="text-xs text-slate-500">One-time payment</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg border border-amber-200/30">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Star className="h-4 w-4 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Enterprise Plan</h4>
            <p className="text-2xl font-bold text-amber-600">$799</p>
            <p className="text-xs text-slate-500">One-time payment</p>
          </div>
        </div>
        
        <Button
          onClick={onViewPlans}
          className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View All Plans & Features
        </Button>
        
        <p className="text-center text-sm text-slate-500">
          💡 <strong>One-time payment</strong> • No recurring fees • Unlimited applications forever
        </p>
      </CardContent>
    </Card>
  );
};
