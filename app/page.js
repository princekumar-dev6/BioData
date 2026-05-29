import BiodataApp from '@/components/BiodataApp';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <BiodataApp />

      {/* Server-rendered h1 for SEO — visually hidden but crawlable by search engines */}
      <h1 className="sr-only">Free Shaadi Biodata Maker Online — Create & Download PDF Biodata for Marriage</h1>

      {/* Server-rendered SEO content */}
      <section className="border-t bg-gradient-to-b from-white to-purple-50/30">
        <div className="max-w-5xl mx-auto px-4 py-14 space-y-14">

          {/* How it works */}
          <div>
            <h2 className="text-xl font-bold text-center mb-8 text-gray-900">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Fill Details', desc: 'Enter personal, education, career & family info in our easy form.' },
                { step: '2', title: 'Live Preview', desc: 'See your biodata update instantly. Pick from 6 themes & add photos.' },
                { step: '3', title: 'Download PDF', desc: 'Get a print-ready PDF — no watermark, no signup, completely free.' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold gradient-primary shadow-md">{item.step}</div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features + Description combined */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900">Why FreeShaadiBiodata?</h2>
              <div className="space-y-3">
                {[
                  { icon: '✓', text: '100% free forever — no hidden charges or premium plans' },
                  { icon: '✓', text: 'No signup required — start creating instantly' },
                  { icon: '✓', text: 'Privacy first — data never leaves your browser' },
                  { icon: '✓', text: '6 beautiful modern themes to choose from' },
                  { icon: '✓', text: 'Upload up to 4 photos with gallery page' },
                  { icon: '✓', text: 'Instant high-quality PDF download' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold text-xs mt-0.5">{item.icon}</span>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-3 text-gray-900">Best Free Biodata Maker for Indian Marriage</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                FreeShaadiBiodata is India&apos;s most trusted free online biodata maker. Whether you need a Hindu biodata,
                Marathi biodata, biodata for boy or girl, or a modern design — create professional matrimonial
                biodata PDFs in minutes. Includes personal details, education, career, family info, and photo gallery.
                Perfect for sharing with families and matchmakers.
              </p>
            </div>
          </div>

          {/* Internal links + FAQ in two columns */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* Formats links */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Biodata Formats</h2>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-2 md:flex md:flex-col md:gap-2">
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
                    className="text-sm text-muted-foreground hover:text-purple-700 hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* FAQ */}
            <div className="md:col-span-3">
              <h2 className="text-lg font-bold mb-4 text-gray-900">FAQ</h2>
              <div className="space-y-2">
                {[
                  { q: 'Is it really free?', a: 'Yes — no hidden charges, no watermarks, no signup. Create unlimited biodata downloads.' },
                  { q: 'Can I download as PDF?', a: 'Yes, instantly download a high-quality PDF with your info page and photo gallery.' },
                  { q: 'Is my data safe?', a: 'Your data never leaves your browser. Nothing is stored on any server.' },
                  { q: 'What details can I include?', a: 'Personal info, education, career, family details, contact, hobbies, and up to 4 photos.' },
                  { q: 'Works for all communities?', a: 'Yes — Hindu, Muslim, Christian, Sikh, Jain, Buddhist. Includes religion, caste, gotra fields.' },
                ].map((faq) => (
                  <details key={faq.q} className="group border border-gray-100 rounded-lg px-3 py-2 md:border-0 md:rounded-none md:px-0 md:py-0">
                    <summary className="text-sm font-medium cursor-pointer hover:text-purple-700 transition-colors list-none flex items-center gap-2">
                      <span className="text-purple-400 text-xs group-open:rotate-90 transition-transform">▶</span>
                      {faq.q}
                    </summary>
                    <p className="text-xs text-muted-foreground mt-1 ml-5 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
