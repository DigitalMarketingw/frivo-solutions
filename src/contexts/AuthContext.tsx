
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  skills: string[];
  resume_url: string | null;
  employment_history: any[];
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating default profile');
          const { data: userData } = await supabase.auth.getUser();
          const user = userData.user;
          
          if (user) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
                role: 'user'
              });
            
            if (insertError) {
              console.error('Error creating profile:', insertError);
            } else {
              // Retry fetching the profile
              await fetchProfile(userId);
            }
          }
        }
        return;
      }

      // Convert the database data to match UserProfile interface
      const profileData: UserProfile = {
        id: data.id,
        full_name: data.full_name,
        phone: data.phone,
        skills: Array.isArray(data.skills) ? data.skills.map((skill: any) => String(skill)) : [],
        resume_url: data.resume_url,
        employment_history: Array.isArray(data.employment_history) ? data.employment_history : [],
        role: data.role as 'user' | 'admin',
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      console.log('Profile fetched successfully:', profileData);
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user && event !== 'SIGNED_OUT') {
            // Delay profile fetch slightly to ensure database is ready
            setTimeout(() => {
              if (mounted) {
                fetchProfile(session.user.id);
              }
            }, 100);
          } else {
            setProfile(null);
          }
          
          // Only set loading to false after handling the auth state
          if (event !== 'INITIAL_SESSION') {
            setLoading(false);
          }
        }
      }
    );

    // Get initial session
    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Please check your email to confirm your account.",
      });
    }

    setLoading(false);
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    setLoading(true);
    
    await supabase.auth.signOut();
    
    // Clear state
    setUser(null);
    setSession(null);
    setProfile(null);
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    
    setLoading(false);
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
