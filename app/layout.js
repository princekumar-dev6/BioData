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
  keywords: 'free matrimonial biodata maker, marriage biodata format, biodata for marriage, online biodata maker, indian marriage biodata template, shaadi biodata, vivah biodata, marriage resume, biodata PDF download',
  metadataBase: new URL('https://biodatamaker.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Marriage Biodata Maker | Create Beautiful Biodata Online',
    description: 'Create stunning matrimonial biodata for marriage in minutes. Premium template with instant PDF download. No signup required.',
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'BiodataMaker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Marriage Biodata Maker | Create Beautiful Biodata Online',
    description: 'Create stunning matrimonial biodata for marriage in minutes. Premium template with instant PDF download.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BiodataMaker',
    description: 'Free online marriage biodata maker with premium templates, photo upload, and instant PDF download.',
    url: 'https://biodatamaker.in',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
