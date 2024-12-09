"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Liste des routes publiques
  const publicRoutes = ['/', '/about', '/contact', '/login', '/register'];

  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.includes('token=');
      const isAuth = !!session || token;
      setIsAuthenticated(isAuth);
      setIsLoading(false);

      // Ne rediriger que si ce n'est pas une route publique
      if (!isAuth && !publicRoutes.includes(pathname)) {
        router.push('/login');
      }
    };

    if (status !== 'loading') {
      checkAuth();
    }
  }, [router, session, status, pathname]);

  return { 
    isAuthenticated, 
    isLoading: isLoading || status === 'loading' 
  };
} 