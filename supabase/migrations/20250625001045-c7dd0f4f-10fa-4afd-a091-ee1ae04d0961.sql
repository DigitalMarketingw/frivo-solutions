
-- Create user_payments table to track one-time payment status
CREATE TABLE public.user_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'premium', 'enterprise')),
  amount INTEGER NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_payment_id TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_payments
ALTER TABLE public.user_payments ENABLE ROW LEVEL SECURITY;

-- Create policies for user_payments
CREATE POLICY "Users can view their own payments" 
  ON public.user_payments 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "System can insert payments" 
  ON public.user_payments 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "System can update payments" 
  ON public.user_payments 
  FOR UPDATE 
  USING (true);

-- Add a function to check if user has paid
CREATE OR REPLACE FUNCTION public.user_has_paid(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_payments 
    WHERE user_id = user_uuid AND status = 'completed'
  );
$$;

-- Add a function to get user payment info
CREATE OR REPLACE FUNCTION public.get_user_payment_status(user_uuid UUID)
RETURNS TABLE (
  has_paid BOOLEAN,
  plan_type TEXT,
  paid_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 
    CASE WHEN up.id IS NOT NULL THEN true ELSE false END as has_paid,
    up.plan_type,
    up.paid_at
  FROM public.user_payments up
  WHERE up.user_id = user_uuid AND up.status = 'completed'
  ORDER BY up.paid_at DESC
  LIMIT 1;
$$;
