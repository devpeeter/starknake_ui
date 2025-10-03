import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SNAKE ATTACK',
  description: 'Classic snake game',
  icons: {
    icon: '/favicon.ico',
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
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,minimal-ui" />
        <meta name="msapplication-tap-highlight" content="no"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
