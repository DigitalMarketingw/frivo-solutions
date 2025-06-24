
-- Update applications table to support payment workflow
ALTER TABLE public.applications 
ADD COLUMN IF NOT EXISTS payment_required boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS payment_amount integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'not_required',
ADD COLUMN IF NOT EXISTS payment_due_date timestamp with time zone;

-- Create notifications table for user notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  read boolean DEFAULT false,
  action_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" 
  ON public.notifications 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" 
  ON public.notifications 
  FOR UPDATE 
  USING (user_id = auth.uid());

-- Create policy for system to insert notifications
CREATE POLICY "System can insert notifications" 
  ON public.notifications 
  FOR INSERT 
  WITH CHECK (true);

-- Create application timeline table for tracking application progress
CREATE TABLE IF NOT EXISTS public.application_timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL,
  message text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on application timeline
ALTER TABLE public.application_timeline ENABLE ROW LEVEL SECURITY;

-- Create policies for application timeline
CREATE POLICY "Users can view timeline for their applications" 
  ON public.application_timeline 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.applications 
      WHERE id = application_id AND user_id = auth.uid()
    )
  );

-- Admin can view all timelines
CREATE POLICY "Admins can view all timelines" 
  ON public.application_timeline 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- System can insert timeline entries
CREATE POLICY "System can insert timeline entries" 
  ON public.application_timeline 
  FOR INSERT 
  WITH CHECK (true);
