import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    db: {
      schema: 'public'
    }
  }
);

export interface User {
  id: string;
  email: string;
  role: 'donor' | 'receiver';
  name: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'donor' | 'receiver', name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserLocation: (latitude: number, longitude: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (profile) {
        return {
          id: userId,
          email: profile.email,
          role: profile.role,
          name: profile.name,
          location: profile.location,
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          if (profile) {
            setUser(profile);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        if (profile) {
          setUser(profile);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        if (profile) {
          setUser(profile);
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: 'donor' | 'receiver', name: string) => {
    setIsLoading(true);
    try {
      const { data: { user: newUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError || !newUser) throw signUpError;

      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: newUser.id,
            email,
            role,
            name,
            location: null,
          }
        ]);

      if (profileError) throw profileError;

      setUser({
        id: newUser.id,
        email,
        role,
        name,
        location: null,
      });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserLocation = async (latitude: number, longitude: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          location: { latitude, longitude }
        })
        .eq('id', user.id);

      if (error) throw error;

      setUser(prev => prev ? {
        ...prev,
        location: { latitude, longitude }
      } : null);
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
      updateUserLocation,
    }}>
      {children}
    </AuthContext.Provider>
  );
};