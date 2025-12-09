'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      console.log('Requesting password reset for:', email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-center items-center py-12">
        <div className="max-w-md w-full mx-auto text-center px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="h-10 w-10 bg-blue-600 dark:bg-teal-600 rounded-lg flex items-center justify-center">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">LegalHub</span>
          </Link>

          <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Check Your Email</h1>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
              We have sent a password reset link to your email address. Please follow the link to reset your password.
            </p>
            <Link href="/login" className="font-medium text-blue-600 dark:text-teal-400 hover:text-blue-500 dark:hover:text-teal-300">
              &larr; Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-center items-center py-12">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 bg-blue-600 dark:bg-teal-600 rounded-lg flex items-center justify-center">
            <Scale className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">LegalHub</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Forgot Your Password?</h1>
          <p className="text-gray-600 dark:text-slate-400">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-slate-300">
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
                disabled={isSubmitting}
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 disabled:bg-gray-100 dark:disabled:bg-slate-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 hover:bg-blue-700 dark:hover:from-teal-700 dark:hover:to-emerald-700 text-white font-semibold rounded-lg transition disabled:bg-gray-300 dark:disabled:bg-slate-700"
              >
                {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 dark:text-slate-400">
              Remember your password?{' '}
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

export default ForgotPasswordPage;
