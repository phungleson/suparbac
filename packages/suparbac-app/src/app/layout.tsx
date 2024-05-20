import type { Metadata } from 'next';
import type { FC } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'SupaRBAC',
  description: 'SupaRBAC is an open source, self-hosted service for developers to add RBAC to their Supabase apps.',
};

const RootLayout: FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
