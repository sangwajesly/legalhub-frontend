import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { AppLayout } from '@/components/layout/app-layout';
import { ThemeProvider } from '@/components/providers/theme-provider';

export const metadata: Metadata = {
  title: 'LegalHub - Legal Assistance Made Simple',
  description: 'Access legal services through an AI-powered ChatGPT-like interface. Connect with lawyers, read legal articles, and report cases securely.',
  keywords: 'legal assistance, lawyer, legal services, AI legal advisor, case reporting',
  openGraph: {
    title: 'LegalHub - Legal Assistance Made Simple',
    description: 'Democratizing access to legal services through modern technology',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col transition-colors duration-300">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-right" />
            <AppLayout>
              {children}
            </AppLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
