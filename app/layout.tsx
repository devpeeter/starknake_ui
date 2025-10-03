import type { Metadata } from 'next';
import './globals.css';
import '../public/css/reset.css';
import '../public/css/main.css';
import '../public/css/orientation_utils.css';
import '../public/css/ios_fullscreen.css';

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
