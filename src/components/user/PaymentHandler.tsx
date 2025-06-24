
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

interface PaymentHandlerProps {
  applicationId: string;
  amount: number;
  onPayment: (applicationId: string, amount: number) => void;
}

export const PaymentHandler: React.FC<PaymentHandlerProps> = ({
  applicationId,
  amount,
  onPayment,
}) => {
  const formatAmount = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <Button
      size="sm"
      onClick={() => onPayment(applicationId, amount)}
      className="flex items-center gap-2"
    >
      <CreditCard className="h-4 w-4" />
      Pay {formatAmount(amount)}
    </Button>
  );
};
