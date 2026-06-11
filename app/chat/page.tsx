'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import ChatContainer from '@/components/chat/ChatContainer';

export default function Page() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === 'lawyer' || user.role === 'admin' || user.role === 'government') {
        router.replace('/dashboard');
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] dark:bg-[#121315]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B89868]"></div>
      </div>
    );
  }

  // If authenticated but unauthorized, render nothing while redirecting
  if (isAuthenticated && user && (user.role === 'lawyer' || user.role === 'admin' || user.role === 'government')) {
    return null;
  }

  return <ChatContainer />;
}

