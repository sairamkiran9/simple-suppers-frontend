import React from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthScreen from '@/components/AuthScreen';
import ProfileScreen from '@/components/ProfileScreen';

export default function HomeTab() {
  const { user } = useAuth();

  return user ? <ProfileScreen /> : <AuthScreen />;
}