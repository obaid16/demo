import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ReservationProvider } from '@/context/ReservationContext';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { Toaster } from 'sonner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'NOOR — Indian Dining | Contemporary Luxury Cuisine',
  description: 'Rooted in heritage. Reimagined for today. Experience contemporary Indian fine dining, 36-hour charcoal simmered gravies, sigri kebabs, and Awadhi royal gastronomy.',
  keywords: 'Noor Indian Dining, luxury Indian restaurant, fine dining, Awadhi kebabs, modern Indian cuisine, degustation',
  openGraph: {
    title: 'NOOR — Indian Dining',
    description: 'Modern luxury Indian gastronomy and fine dining experiences.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#171513] text-[#F4EFE6] font-sans antialiased min-h-screen flex flex-col selection:bg-[#A9573F] selection:text-[#FAF7F2]">
        <CartProvider>
          <ReservationProvider>
            <SmoothScroll>
              <div className="relative min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
                <CartDrawer />
              </div>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: '#211e1b',
                    color: '#F4EFE6',
                    border: '1px solid rgba(184, 154, 99, 0.3)',
                    fontFamily: 'var(--font-jakarta)',
                  },
                }}
              />
            </SmoothScroll>
          </ReservationProvider>
        </CartProvider>
      </body>
    </html>
  );
}
