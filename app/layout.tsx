import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'HKBP Mahanaim Batam',
  description: 'Huria Kristen Batak Protestan - Kibing, Batu Aji',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
