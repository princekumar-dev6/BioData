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
  title: {
    default: 'Free Marriage Biodata Maker Online | Create & Download PDF Biodata',
    template: '%s | BiodataMaker',
  },
  description: 'Create beautiful bio data for marriage in minutes. Free online biodata maker with modern templates, photo upload, and instant PDF download. Best biodata maker for Hindu, Marathi, Hindi marriage. No signup required.',
  keywords: 'free biodata maker, marriage biodata maker, biodata for marriage, online biodata maker, marriage biodata format, shaadi biodata, matrimonial biodata, biodata maker online, free marriage biodata maker pdf, Hindu marriage biodata format, simple biodata format, modern biodata design for marriage, biodata for boy, biodata for girl, Indian marriage biodata template, biodata download pdf',
  metadataBase: new URL('https://biodatamaker.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Marriage Biodata Maker Online | Create & Download PDF Biodata',
    description: 'Create stunning matrimonial biodata for marriage in minutes. Modern templates with photo upload and instant PDF download. No signup required.',
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'BiodataMaker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Marriage Biodata Maker Online | PDF Download',
    description: 'Create beautiful marriage biodata in minutes. Free online maker with modern templates and instant PDF download.',
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
    description: 'Free online marriage biodata maker. Create beautiful bio data for marriage with modern templates, photo upload, and instant PDF download.',
    url: 'https://biodatamaker.in',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2450',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is BiodataMaker really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, BiodataMaker is 100% free. No hidden charges, no watermarks on your PDF, and no signup or registration required. Create unlimited biodata downloads.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I download my biodata as PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can download your completed biodata as a high-quality PDF file instantly. The PDF includes your information page and photo gallery page.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my personal data safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Your data never leaves your browser. We do not store any personal information on servers. Everything is processed locally on your device.',
        },
      },
      {
        '@type': 'Question',
        name: 'What details can I include in my marriage biodata?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can include personal details (name, age, height, complexion, religion, caste, gotra), education & career information, family details (parents, siblings), contact information, about me section, hobbies, and up to 4 photos.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does it work for all communities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our biodata format works for all communities. It includes fields for religion, caste, sub-caste, gotra, and mother tongue.',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
