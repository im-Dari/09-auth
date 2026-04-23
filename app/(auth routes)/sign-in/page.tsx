'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';
import css from './SignIn.module.css';

export default function SignInPage() {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string) || '';
    const password = (formData.get('password') as string) || '';

    try {
      const data = await login({ email, password });
      setUser(data);
      toast.success('Welcome back!');
      router.push('/profile');
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : 'Login failed';
      setError(Array.isArray(message) ? message.join(', ') : message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Log in'}
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}