'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore'; 
import { api } from '@/lib/api/api';
import { useRouter } from 'next/navigation';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const { isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout failed", error);
    }
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/notes" className={css.navigationLink}>Notes</Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/about" className={css.navigationLink}>About</Link>
          </li>
          <li className={css.navigationItem}>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/about" className={css.navigationLink}>About</Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );
} 