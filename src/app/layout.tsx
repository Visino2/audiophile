import type { Metadata } from 'next';
import './globals.css';
import { ConvexClientProvider } from './ConvexClientProvider';

export const metadata: Metadata = {
  title: 'Audiophile',
  description: 'Premium audio equipment store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}