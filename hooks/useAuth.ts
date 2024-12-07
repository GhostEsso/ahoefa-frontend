"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.includes('token=');
      const isAuth = !!session || token;
      setIsAuthenticated(isAuth);
      setIsLoading(false);

      if (!isAuth) {
        router.push('/login');
      }
    };

    if (status !== 'loading') {
      checkAuth();
    }
  }, [router, session, status]);

  return { 
    isAuthenticated, 
    isLoading: isLoading || status === 'loading' 
  };
} 