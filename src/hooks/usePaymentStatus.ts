
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePaymentStatus = () => {
  return useQuery({
    queryKey: ['payment-status'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase.rpc('get_user_payment_status', {
        user_uuid: user.id
      });

      if (error) throw error;
      
      return data?.[0] || { has_paid: false, plan_type: null, paid_at: null };
    },
  });
};
