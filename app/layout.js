import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Free Shaadi Biodata Maker Online | Create & Download PDF Biodata',
    template: '%s | FreeShaadiBiodata',
  },
  description: 'Create beautiful bio data for marriage in minutes. Free online shaadi biodata maker with modern templates, photo upload, and instant PDF download. Best biodata maker for Hindu, Marathi, Hindi marriage. No signup required.',
  keywords: 'free shaadi biodata, free biodata maker, marriage biodata maker, biodata for marriage, shaadi biodata maker, online biodata maker, marriage biodata format, shaadi biodata, matrimonial biodata, biodata maker online free, free marriage biodata maker pdf, Hindu marriage biodata format, simple biodata format, modern biodata design for marriage, biodata for boy, biodata for girl, Indian marriage biodata template, biodata download pdf free, shaadi biodata format, marriage biodata pdf download, free biodata creator, biodata banane wala app',
  metadataBase: new URL('https://freeshaadibiodata.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Shaadi Biodata Maker Online | Create & Download PDF Biodata',
    description: 'Create stunning matrimonial biodata for marriage in minutes. Modern templates with photo upload and instant PDF download. No signup required.',
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'FreeShaadiBiodata',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Shaadi Biodata - Create Your Matrimonial Profile Instantly',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Shaadi Biodata Maker Online | PDF Download',
    description: 'Create beautiful shaadi biodata in minutes. Free online maker with modern templates and instant PDF download.',
    images: ['/og-image.jpg'],
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
  // verification: {
  //   google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE',
  // },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FreeShaadiBiodata',
    description: 'Free online shaadi biodata maker. Create beautiful bio data for marriage with modern templates, photo upload, and instant PDF download.',
    url: 'https://freeshaadibiodata.in',
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
        name: 'Is FreeShaadiBiodata really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, FreeShaadiBiodata is 100% free. No hidden charges, no watermarks on your PDF, and no signup or registration required. Create unlimited biodata downloads.',
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
    <html lang="en" className={`${jakarta.variable} ${cormorant.variable}`}>
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
      <body className={`${jakarta.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
