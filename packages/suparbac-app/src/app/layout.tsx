import type { Metadata } from 'next';
import type { FC } from 'react';
import './globals.css';
import type { ChildrenProps } from '@/helpers/react/ChildrenProps';

export const metadata: Metadata = {
  title: 'Suparbac',
  description: 'Suparbac is an open source, self-hosted service for developers to add RBAC to their Supabase apps.',
};

const RootLayout: FC<ChildrenProps> = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
