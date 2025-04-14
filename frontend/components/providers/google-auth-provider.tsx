"use client"

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode, useEffect } from 'react';

interface GoogleAuthProviderProps {
  children: ReactNode;
}

export function GoogleAuthProvider({ children }: GoogleAuthProviderProps) {
  const clientId =  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  useEffect(() => {
    // Warn specifically about Google Client ID
    if (!clientId) {
      console.error('⚠️ NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set. Google Sign-In will not work.');
    }
  }, [clientId]);
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}