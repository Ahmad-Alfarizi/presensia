import './globals.css';
import React from 'react';

// Root layout for admin dashboard (Next.js App Router)
export const metadata = {
  title: 'Presensia Admin',
  description: 'Admin dashboard for Presensia attendance system'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          {children}
        </div>
      </body>
    </html>
  );
}
