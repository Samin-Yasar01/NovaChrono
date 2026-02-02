import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { CartProvider } from '@/context/cart-context';
import { cn } from '@/lib/utils';
import FacebookPixel from '@/components/FacebookPixel';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NovaChrono | Luxury Timepieces',
  description: 'Discover the perfect moment with NovaChrono luxury watches.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-gunmetal-900 text-white min-h-screen flex flex-col")}>
        <FacebookPixel />
        <CartProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
