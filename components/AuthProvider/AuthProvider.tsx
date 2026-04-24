'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      try {
        const sessionData = await checkSession();
        if (sessionData) {
          const { getMe } = await import('@/lib/api/clientApi');
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [pathname, setUser, clearIsAuthenticated]);

  useEffect(() => {
    if (loading) return;

    const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
    const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

    if (!isAuthenticated && isPrivateRoute) {
      clearIsAuthenticated();
      router.replace('/sign-in');
      return;
    }

    if (isAuthenticated && isAuthRoute) {
      router.replace('/profile');
      return;
    }
  }, [loading, isAuthenticated, pathname, router, clearIsAuthenticated]);

  if (loading) {
    const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
    if (isAuthRoute) {
      return <>{children}</>;
    }
    const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
    if (isPrivateRoute) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>;
    }
    return <>{children}</>;
  }

  return <>{children}</>;
}