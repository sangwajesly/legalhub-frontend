'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// import { apiClient } from '@/lib/api-client';
// import { useRouter } from 'next/navigation';

const SignupPage: React.FC = () => {
  // const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      // await apiClient.signup({ name, email, password });
      // router.push('/login?signup=success');
      console.log('Signing up with:', { name, email, password });
      alert('Signup successful! (This is a placeholder)');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGoogleSignup = () => {
    // This would typically redirect to a Google OAuth flow
    // window.location.href = apiClient.getGoogleAuthUrl();
    console.log('Redirecting to Google signup...');
    alert('Redirecting to Google signup... (This is a placeholder)');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="text-gray-600">Join LegalHub today to get started</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
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
                disabled={isSubmitting}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
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
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
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
                disabled={isSubmitting}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-semibold text-gray-700"
              >
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
                disabled={isSubmitting}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:bg-gray-300"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
            >
              <span className="sr-only">Sign up with Google</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path d="M488 261.8C488 403.3 381.5 512 244 512 110.1 512 0 401.9 0 265.8 0 143.1 94.8 38.6 221.3 26.3c27.4-2.6 48.3 11.4 56.4 33.4 8.1 22 2.1 48.3-19.1 61.3-21.2 13-46.7 8.1-61.3-13.1-14.6-21.2-39.6-32.3-64.8-24.2-25.2 8.1-45.2 32.3-48.3 59.8-3.1 27.4 12.5 54.9 39.6 66 27.1 11.1 57.9 1.5 75.9-20.6 18-22.1 22.8-51.9 14.1-78-8.7-26.1-33.3-44.5-59.8-41.4-26.5 3.1-48.3 22.8-55.8 48.3-7.5 25.5-2.1 53.6 14.6 74.3 16.7 20.7 44.2 29.8 69.4 23.3 25.2-6.5 45.2-28.3 52.7-53.6 7.5-25.3 1.5-53.6-15.6-73.3-17.1-19.7-43.1-28.3-66-23.3-22.9 5-41.4 22.8-48.3 45.2-6.9 22.4-1.5 47.9 13.1 66 14.6 18.1 37.3 26.6 59.8 23.3 22.5-3.3 42.5-17.8 53.6-38.6 11.1-20.8 15.6-45.2 12.5-69.4-3.1-24.2-17.8-46.7-38.6-57.9-20.8-11.2-46.7-12.5-68.4-4.5-21.7 8-39.6 26.6-47.9 48.3-8.3 21.7-4.5 47.9 8.1 66 12.6 18.1 33.3 28.3 54.9 28.3 21.6 0 42.5-10.2 55.8-28.3 13.3-18.1 17.8-41.4 12.5-63.7-5.3-22.3-22.8-41.4-45.2-47.9-22.4-6.5-46.7 0-63.7 13.1-17 13.1-28.3 33.3-28.3 55.8 0 22.5 11.3 43.4 28.3 55.8 17 12.4 38.6 17.8 59.8 12.5 21.2-5.3 39.6-20.8 48.3-41.4 8.7-20.6 11.2-44.2 6.5-66-4.7-21.8-19.1-41.4-38.6-52.7-19.5-11.3-42.5-14.6-63.7-8.1-21.2 6.5-38.6 22.8-46.7 44.2-8.1 21.4-8.1 45.2 0 66 8.1 20.8 24.2 38.6 44.2 47.9 20 9.3 42.5 12.5 63.7 8.1 21.2-4.4 39.6-17.8 50.8-35.5 11.2-17.7 15.6-39.6 12.5-60.8-3.1-21.2-14.6-40.5-31.3-52.7-16.7-12.2-37.3-17.8-57.9-15.6-20.6 2.2-39.6 12.5-50.8 29.3-11.2 16.8-15.6 37.3-12.5 57.9 3.1 20.6 14.6 38.6 31.3 49.8 16.7 11.2 37.3 15.6 57.9 12.5 20.6-3.1 38.6-14.6 49.8-31.3 11.2-16.7 15.6-37.3 12.5-57.9-3.1-20.6-14.6-38.6-31.3-49.8-16.7-11.2-37.3-15.6-57.9-12.5-20.6 3.1-38.6 14.6-49.8 31.3-11.2 16.7-15.6 37.3-12.5 57.9 3.1 20.6 14.6 38.6 31.3 49.8 16.7 11.2 37.3 15.6 57.9 12.5 20.6-3.1 38.6-14.6 49.8-31.3 11.2-16.7 15.6-37.3 12.5-57.9C482.7 341.3 488 300.9 488 261.8z" fill="#4285F4"/>
              </svg>
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
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
