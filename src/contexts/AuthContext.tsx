
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
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

// Request deduplication cache
const pendingRequests = new Map<string, Promise<any>>();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Debounced profile fetch with request deduplication
  const fetchProfile = useCallback(async (userId: string, retryCount = 0) => {
    const cacheKey = `profile-${userId}-${retryCount}`;
    
    // Return existing promise if request is already in flight
    if (pendingRequests.has(cacheKey)) {
      return pendingRequests.get(cacheKey);
    }

    const fetchPromise = (async () => {
      try {
        console.log('Fetching profile for user:', userId);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          
          if (error.code === 'PGRST116' && retryCount === 0) {
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
                })
                .select()
                .single();
              
              if (!insertError) {
                return fetchProfile(userId, 1);
              }
            }
          }
          return null;
        }

        if (data) {
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
          return profileData;
        }
        
        setProfile(null);
        return null;
      } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
      } finally {
        pendingRequests.delete(cacheKey);
      }
    })();

    pendingRequests.set(cacheKey, fetchPromise);
    return fetchPromise;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  // Memoized auth functions to prevent re-renders
  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
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
  }, [toast]);

  const signIn = useCallback(async (email: string, password: string) => {
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
  }, [toast]);

  const signOut = useCallback(async () => {
    setLoading(true);
    
    await supabase.auth.signOut();
    
    setUser(null);
    setSession(null);
    setProfile(null);
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

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
            timeoutId = setTimeout(() => {
              if (mounted) {
                fetchProfile(session.user.id);
              }
            }, 100);
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user && event !== 'SIGNED_OUT') {
            if (timeoutId) clearTimeout(timeoutId);
            
            timeoutId = setTimeout(() => {
              if (mounted) {
                fetchProfile(session.user.id);
              }
            }, 200);
          } else {
            setProfile(null);
          }
          
          if (event !== 'INITIAL_SESSION') {
            setLoading(false);
          }
        }
      }
    );

    getInitialSession();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      subscription.unsubscribe();
      pendingRequests.clear();
    };
  }, [fetchProfile]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  }), [user, session, profile, loading, signUp, signIn, signOut, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
