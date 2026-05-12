import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Free Marriage Biodata Maker | Create Beautiful Biodata Online',
  description: 'Create stunning matrimonial biodata for marriage in minutes. Free online biodata maker with premium template, photo upload, and instant PDF download. No signup required.',
  keywords: 'free matrimonial biodata maker, marriage biodata format, biodata for marriage, online biodata maker, indian marriage biodata template, shaadi biodata, vivah biodata, marriage resume',
  openGraph: {
    title: 'Free Marriage Biodata Maker | Create Beautiful Biodata Online',
    description: 'Create stunning matrimonial biodata for marriage in minutes. Premium template with instant PDF download.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
