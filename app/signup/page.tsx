'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';

import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const { register, loginWithGoogle, isLoading, error: authError, clearError } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    clearError();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await register({ name, email, password, role: 'citizen' }); // Default role
      router.push('/dashboard');
    } catch (err: any) {
      // Error handled by store
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    clearError();
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      // Error handled by store
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="h-10 w-10 bg-blue-600 dark:bg-teal-600 rounded-lg flex items-center justify-center">
            <Scale className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">LegalHub</span>
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Join LegalHub today</p>
        </div>

        <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6">
          {error && (
            <div className="mb-4 p-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSignup} className="space-y-3.5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 disabled:bg-gray-100 dark:disabled:bg-slate-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 disabled:bg-gray-100 dark:disabled:bg-slate-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 disabled:bg-gray-100 dark:disabled:bg-slate-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 disabled:bg-gray-100 dark:disabled:bg-slate-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 hover:bg-blue-700 dark:hover:from-teal-700 dark:hover:to-emerald-700 text-white font-semibold rounded-lg transition disabled:bg-gray-300 dark:disabled:bg-slate-700 text-sm"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-slate-800/50 text-gray-500 dark:text-slate-400">Or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="mt-4 w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-900 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 dark:text-teal-400 hover:text-blue-500 dark:hover:text-teal-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
