// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Check both localStorage and Supabase session
  const getSession = async () => {
    // First check localStorage for admin session
    const localAdmin = localStorage.getItem('wis_admin');
    
    if (localAdmin) {
      setUser(JSON.parse(localAdmin));
      setLoading(false);
      return;
    }

    // Fallback to Supabase auth session
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
  };

  getSession();

  // Listen for changes on auth state (login, logout, etc.)
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
    setLoading(false);
  });

  return () => subscription.unsubscribe();
}, []);

  // Sign in with username and password (custom table)
const signIn = async (username, password) => {
  try {
    // First, get all users with this username
    const { data: users, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username);

    if (error) throw error;
    
    if (!users || users.length === 0) {
      throw new Error('Invalid username');
    }

    // Then check password manually (for debugging)
    const user = users.find(u => u.password === password);
    
    if (!user) {
      console.log('Password comparison failed');
      console.log('Expected:', users[0].password);
      console.log('Received:', password);
      throw new Error('Invalid password');
    }

    // Store admin session in localStorage
    localStorage.setItem('wis_admin', JSON.stringify(user));
    setUser(user);
    
    return { data: user, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

  // Sign out
const signOut = async () => {
  try {
    // Clear localStorage
    localStorage.removeItem('wis_admin');
    
    // Also sign out from Supabase if using it
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    setUser(null);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

  const value = {
    user,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};