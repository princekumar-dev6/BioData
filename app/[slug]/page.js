import Link from 'next/link';
import { notFound } from 'next/navigation';

const SEO_PAGES = {
  'marriage-biodata-format': {
    h1: 'Marriage Biodata Format',
    title: 'Marriage Biodata Format 2025 | Free Download PDF & Word',
    description: 'Get the best marriage biodata format with modern design. Create your matrimonial biodata online for free with photo, personal details, family info and download as PDF instantly.',
    keywords: 'marriage biodata format, biodata format for marriage, marriage biodata format pdf, marriage biodata format word, matrimonial biodata format',
    content: `Looking for the perfect marriage biodata format? FreeShaadiBiodata offers a professionally designed biodata format that includes all essential sections — personal details, education & career, family information, contact details, and photo gallery. Our format is accepted across all matrimonial platforms and is perfect for sharing with family and matchmakers.`,
    features: [
      'Clean, modern design accepted everywhere',
      'Includes personal, career, family & contact sections',
      'Photo gallery page with up to 4 photos',
      'Instant PDF download — no watermark',
      'Works on mobile and desktop',
    ],
  },
  'hindu-biodata-format': {
    h1: 'Hindu Marriage Biodata Format',
    title: 'Hindu Marriage Biodata Format | Free Online Biodata Maker',
    description: 'Create Hindu marriage biodata with traditional design including Gotra, Caste, Religion details. Free online maker with Ganesh ji header and instant PDF download.',
    keywords: 'Hindu marriage biodata format, Hindu biodata for marriage, Hindu matrimonial biodata, biodata format for Hindu marriage, shaadi biodata Hindu',
    content: `Create a beautiful Hindu marriage biodata with our traditional yet modern format. Our biodata template includes all fields important for Hindu matrimonial profiles — Religion, Caste, Sub-Caste, Gotra, Mother Tongue, and more. The elegant design features a traditional "Shri Ganeshay Namah" header with ornamental borders.`,
    features: [
      'Traditional "|| श्री गणेशाय नमः ||" header',
      'Fields for Gotra, Caste, Sub-Caste, Religion',
      'Elegant gold & maroon color scheme',
      'Personal, Career, and Family details sections',
      'Free PDF download with no signup',
    ],
  },
  'biodata-for-boy': {
    h1: 'Marriage Biodata for Boy',
    title: 'Biodata for Boy | Marriage Biodata Format for Groom PDF',
    description: 'Create impressive marriage biodata for boy/groom. Professional biodata format highlighting education, career, family background. Free PDF download with modern design.',
    keywords: 'biodata for boy, marriage biodata for boy, groom biodata format, boy biodata for marriage pdf, marriage biodata format for boy',
    content: `Make a strong first impression with a professionally designed marriage biodata for boy. Our format helps showcase your education, career achievements, family values, and personality in an organized and elegant layout. Perfect for sharing with prospective families through matrimonial channels.`,
    features: [
      'Professional layout highlighting career & education',
      'Sections for work experience and company details',
      'Family background with father/mother occupation',
      'Upload up to 4 photos for photo page',
      'Modern design that stands out',
    ],
  },
  'biodata-for-girl': {
    h1: 'Marriage Biodata for Girl',
    title: 'Biodata for Girl | Marriage Biodata Format for Bride PDF',
    description: 'Create elegant marriage biodata for girl/bride. Beautiful biodata format with personal details, education, family info and photos. Free instant PDF download.',
    keywords: 'biodata for girl, marriage biodata for girl, bride biodata format, girl biodata for marriage pdf, marriage biodata format for girl',
    content: `Create an elegant and beautiful marriage biodata for girl that reflects your personality and achievements. Our carefully designed template presents personal details, educational background, career, and family information in a graceful format that leaves a lasting impression on prospective families.`,
    features: [
      'Elegant design with traditional touch',
      'Highlight education and career achievements',
      'Personal interests and hobbies section',
      'Beautiful photo gallery page',
      'Instant PDF — share digitally or print',
    ],
  },
  'simple-biodata-format': {
    h1: 'Simple Biodata Format for Marriage',
    title: 'Simple Biodata Format for Marriage | Clean & Easy PDF Download',
    description: 'Get a simple and clean biodata format for marriage. Easy to fill, professionally designed with all essential details. Create and download PDF in minutes for free.',
    keywords: 'simple biodata format, simple biodata format for marriage, simple marriage biodata, easy biodata maker, clean biodata format pdf',
    content: `Not everyone wants a flashy biodata. Our simple biodata format for marriage is clean, easy to read, and focuses on what matters — your details presented clearly and professionally. Just fill in your information, preview in real-time, and download a beautifully formatted PDF in minutes.`,
    features: [
      'Clean, clutter-free layout',
      'Only fill what you want — optional fields',
      'Real-time preview as you type',
      'Professional typography and spacing',
      'Download as PDF in one click',
    ],
  },
  'modern-biodata-design': {
    h1: 'Modern Biodata Design for Marriage',
    title: 'Modern Biodata Design for Marriage | Stylish Templates Free',
    description: 'Stand out with a modern biodata design for marriage. Contemporary styling with elegant borders, professional layout, and beautiful photo integration. Free PDF download.',
    keywords: 'modern biodata design, modern biodata for marriage, stylish biodata format, contemporary marriage biodata, designer biodata template',
    content: `Make your marriage biodata stand out with our modern design that combines contemporary aesthetics with traditional values. Featuring elegant gold accents, professional typography, ornamental dividers, and a beautiful photo gallery page — our design makes a memorable first impression.`,
    features: [
      'Contemporary design with gold accents',
      'Ornamental dividers and corner decorations',
      'Professional Playfair Display typography',
      'Separate photo gallery page',
      'Responsive — looks great printed or on screen',
    ],
  },

  'marathi-biodata-format': {
    h1: 'Marathi Marriage Biodata Format',
    title: 'Marathi Biodata Format for Marriage | Free PDF Download',
    description: 'Create Marathi marriage biodata (लग्नाचा बायोडाटा) with traditional format. Includes all details for Maharashtrian matrimonial profile. Free online maker with PDF download.',
    keywords: 'Marathi biodata format, Marathi marriage biodata, लग्नाचा बायोडाटा, Maharashtrian biodata, Marathi matrimonial biodata format',
    content: `Create a professionally designed Marathi marriage biodata perfect for Maharashtrian families. Our format includes all essential fields — personal details, Gotra, Caste, Sub-Caste, education, career, and family information. The elegant traditional design with modern aesthetics is perfect for sharing with prospective families.`,
    features: [
      'Traditional format suitable for Maharashtrian families',
      'Includes Gotra, Caste, Sub-Caste fields',
      'Complete family and contact information',
      'Elegant design with ornamental borders',
      'Instant PDF download — free forever',
    ],
  },
};

export default function SEOPage({ params }) {
  const slug = params.slug;
  const page = SEO_PAGES[slug];

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center gradient-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
            </div>
            <div>
              <span className="text-lg font-bold font-playfair gradient-text">FreeShaadiBiodata</span>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Free Marriage Biodata Creator</p>
            </div>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 text-white gradient-primary hover:opacity-90 transition-opacity"
          >
            Create Biodata →
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article>
          <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-4 gradient-text">
            {page.h1}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {page.content}
          </p>

          {/* CTA */}
          <div className="rounded-xl p-6 mb-8 border bg-purple-50/50 border-purple-200">
            <h2 className="text-xl font-bold mb-2 gradient-text">
              Create Your {page.h1} Now — Free!
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              No signup required. Fill in your details, preview instantly, and download as PDF.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-semibold h-11 px-6 text-white gradient-primary hover:opacity-90 transition-opacity"
            >
              Start Creating Biodata →
            </Link>
          </div>

          {/* Features */}
          <h2 className="text-xl font-bold mb-4 text-foreground">
            What You Get
          </h2>
          <ul className="space-y-3 mb-8">
            {page.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 gradient-primary">✓</span>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* How It Works */}
          <h2 className="text-xl font-bold mb-4 text-foreground">
            How to Create Your Biodata
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { step: '1', title: 'Fill Details', desc: 'Enter your personal, career, and family information in the easy form.' },
              { step: '2', title: 'Preview Live', desc: 'See your biodata update in real-time as you type. Add photos.' },
              { step: '3', title: 'Download PDF', desc: 'Click download to get your beautifully formatted biodata as PDF.' },
            ].map((item) => (
              <div key={item.step} className="rounded-lg border border-border p-4 bg-white">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-2 gradient-primary">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <h2 className="text-xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 mb-8">
            <div className="border border-border rounded-lg p-4 bg-white">
              <h3 className="font-semibold mb-1">Is this biodata maker really free?</h3>
              <p className="text-sm text-muted-foreground">Yes, completely free. No hidden charges, no watermarks, no signup required. Create and download unlimited biodata PDFs.</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-white">
              <h3 className="font-semibold mb-1">Can I add photos to my biodata?</h3>
              <p className="text-sm text-muted-foreground">Yes, you can upload up to 4 photos. They appear on a separate photo gallery page in your PDF for a clean presentation.</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-white">
              <h3 className="font-semibold mb-1">Is my data safe?</h3>
              <p className="text-sm text-muted-foreground">Your data stays in your browser only. We do not store any personal information on our servers. Everything is processed locally.</p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center py-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md text-lg font-semibold h-12 px-8 text-white gradient-primary hover:opacity-90 transition-opacity"
            >
              Create Your Free Biodata Now
            </Link>
            <p className="text-xs text-muted-foreground mt-2">No signup • No watermark • 100% Free</p>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-white/60">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="font-bold mb-2 gradient-text">FreeShaadiBiodata</h3>
              <p className="text-sm text-muted-foreground">
                Free online marriage biodata maker trusted by thousands. Create, preview, and download your biodata in minutes.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 gradient-text">Biodata Formats</h3>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(SEO_PAGES).filter(([k]) => k !== slug).slice(0, 6).map(([key, val]) => (
                  <Link key={key} href={`/${key}`} className="text-sm text-muted-foreground hover:underline">
                    {val.h1}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center border-t border-border pt-4">
            FreeShaadiBiodata © {new Date().getFullYear()} | Free Shaadi Biodata Maker Online
          </p>
        </div>
      </footer>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(SEO_PAGES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const page = SEO_PAGES[params.slug];
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `/${params.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
      locale: 'en_IN',
      url: `/${params.slug}`,
      siteName: 'FreeShaadiBiodata',
    },
  };
}
