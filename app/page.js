import BiodataApp from '@/components/BiodataApp';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Server-rendered h1 for SEO — visually integrated as page hero above the app */}
      <section className="gradient-bg pt-6 pb-2 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold font-playfair gradient-text mb-2">
          Free Shaadi Biodata Maker Online
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Create beautiful marriage biodata with modern templates, photo upload, live preview &amp; instant PDF download. 100% free, no signup required.
        </p>
      </section>

      <BiodataApp />

      {/* Server-rendered SEO content visible to search engines */}
      <section className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        {/* How it works */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">How to Create Your Marriage Biodata</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold gradient-primary">1</div>
              <h3 className="font-semibold mb-1">Fill Your Details</h3>
              <p className="text-sm text-muted-foreground">Enter personal, education, career, and family information in our easy-to-use form.</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold gradient-primary">2</div>
              <h3 className="font-semibold mb-1">Preview in Real-Time</h3>
              <p className="text-sm text-muted-foreground">See your biodata update live as you type. Choose from 6 beautiful themes and upload photos.</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold gradient-primary">3</div>
              <h3 className="font-semibold mb-1">Download PDF Free</h3>
              <p className="text-sm text-muted-foreground">Click download to get a high-quality PDF biodata — no watermark, no signup required.</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Why Choose FreeShaadiBiodata?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: '100% Free Forever', desc: 'No hidden charges, no premium plans. Create unlimited biodata downloads for free.' },
              { title: 'No Signup Required', desc: 'Start creating immediately. No email, no phone number, no registration needed.' },
              { title: 'Privacy First', desc: 'Your data never leaves your browser. We don\'t store any personal information on servers.' },
              { title: 'Modern Templates', desc: '6 beautiful themes — Classic Gold, Royal Navy, Rose Elegance, Midnight Purple, Emerald Charm, and Sunset Warm.' },
              { title: 'Photo Gallery', desc: 'Upload up to 4 photos that appear on a separate gallery page in your PDF.' },
              { title: 'Instant PDF Download', desc: 'Generate and download a professional PDF biodata in seconds. Print-ready quality.' },
            ].map((feature) => (
              <div key={feature.title} className="border rounded-lg p-4 bg-white/60">
                <h3 className="font-semibold mb-1 text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO description block */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Best Free Online Biodata Maker for Indian Marriage</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            FreeShaadiBiodata is India&apos;s most trusted free online biodata maker for marriage. Whether you need a Hindu biodata format,
            Marathi biodata, biodata for boy, biodata for girl, or a simple modern biodata design — our tool creates professional
            matrimonial biodata PDFs in minutes. The biodata includes all essential sections: personal details, education &amp; career,
            family information, contact details, and a photo gallery page. Perfect for sharing with prospective families, matrimonial
            sites, and matchmakers. Your data is never stored on any server — everything stays private in your browser.
          </p>
        </div>

        {/* Biodata formats section with internal links */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Popular Biodata Formats</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { href: '/marriage-biodata-format', label: 'Marriage Biodata Format' },
              { href: '/hindu-biodata-format', label: 'Hindu Biodata Format' },
              { href: '/biodata-for-boy', label: 'Biodata for Boy' },
              { href: '/biodata-for-girl', label: 'Biodata for Girl' },
              { href: '/simple-biodata-format', label: 'Simple Biodata Format' },
              { href: '/modern-biodata-design', label: 'Modern Biodata Design' },
              { href: '/marathi-biodata-format', label: 'Marathi Biodata Format' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-3 rounded-lg border bg-white/60 hover:bg-purple-50 hover:border-purple-200 transition-colors text-sm font-medium text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ section for rich snippets */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="border rounded-lg p-4 bg-white/60">
              <h3 className="font-semibold mb-1">Is FreeShaadiBiodata really free?</h3>
              <p className="text-sm text-muted-foreground">Yes, FreeShaadiBiodata is 100% free. No hidden charges, no watermarks on your PDF, and no signup or registration required. Create unlimited biodata downloads.</p>
            </div>
            <div className="border rounded-lg p-4 bg-white/60">
              <h3 className="font-semibold mb-1">Can I download my biodata as PDF?</h3>
              <p className="text-sm text-muted-foreground">Yes, you can download your completed biodata as a high-quality PDF file instantly. The PDF includes your information page and photo gallery page.</p>
            </div>
            <div className="border rounded-lg p-4 bg-white/60">
              <h3 className="font-semibold mb-1">Is my personal data safe?</h3>
              <p className="text-sm text-muted-foreground">Absolutely. Your data never leaves your browser. We do not store any personal information on servers. Everything is processed locally on your device.</p>
            </div>
            <div className="border rounded-lg p-4 bg-white/60">
              <h3 className="font-semibold mb-1">What details can I include in my marriage biodata?</h3>
              <p className="text-sm text-muted-foreground">You can include personal details (name, age, height, complexion, religion, caste, gotra), education &amp; career information, family details (parents, siblings), contact information, about me section, hobbies, and up to 4 photos.</p>
            </div>
            <div className="border rounded-lg p-4 bg-white/60">
              <h3 className="font-semibold mb-1">Does it work for all Indian communities?</h3>
              <p className="text-sm text-muted-foreground">Yes, our biodata format works for all communities — Hindu, Muslim, Christian, Sikh, Jain, Buddhist. It includes fields for religion, caste, sub-caste, gotra, and mother tongue.</p>
            </div>
            <div className="border rounded-lg p-4 bg-white/60">
              <h3 className="font-semibold mb-1">Can I use this on mobile?</h3>
              <p className="text-sm text-muted-foreground">Yes, FreeShaadiBiodata works perfectly on mobile phones, tablets, and desktops. The responsive design adapts to any screen size.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
