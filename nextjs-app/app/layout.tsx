import type { Metadata } from 'next';
import '../styles/globals.css';

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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
