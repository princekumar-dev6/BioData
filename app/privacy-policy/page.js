import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for FreeShaadiBiodata - Free online marriage biodata maker. Learn how we handle your data and protect your privacy.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen gradient-bg">
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

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold font-playfair mb-2 gradient-text">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: May 24, 2025</p>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Introduction</h2>
              <p>
                FreeShaadiBiodata (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website{' '}
                <a href="https://www.freeshaadibiodata.in" className="text-purple-700 hover:underline">www.freeshaadibiodata.in</a>.
                We are committed to protecting your privacy. This Privacy Policy explains how we handle information
                when you use our free online marriage biodata maker service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Information We Do NOT Collect</h2>
              <p>
                FreeShaadiBiodata is designed with privacy at its core. We want to be completely transparent:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>No backend server</strong> — We do not operate any backend server or database that stores your personal information.</li>
                <li><strong>No external database</strong> — Your biodata details (name, family information, photos, contact details) are never sent to or stored on any server.</li>
                <li><strong>Browser-only storage</strong> — All your biodata information is stored locally in your browser&apos;s localStorage. This data never leaves your device unless you choose to download or share it yourself.</li>
                <li><strong>No user accounts</strong> — We do not require signup, login, or registration of any kind.</li>
                <li><strong>No tracking of personal details</strong> — We do not track, log, or analyze the personal information you enter into the biodata form.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Information We May Collect</h2>

              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">1. Feedback & Issue Reports (Optional)</h3>
              <p>
                We provide a feedback form (via Google Forms) where you can optionally report issues or share suggestions.
                If you choose to submit feedback, you may provide:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Name (optional)</li>
                <li>Email address (optional)</li>
                <li>Issue or suggestion description</li>
              </ul>
              <p className="mt-2">
                This information is collected through Google Forms and is subject to{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">Google&apos;s Privacy Policy</a>.
                We only use this information to improve our service and respond to your feedback if you provide contact details.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">2. Analytics Data</h3>
              <p>
                We use Google Analytics to understand how visitors use our website. Google Analytics may collect:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Pages visited and time spent</li>
                <li>Device type and browser information</li>
                <li>Approximate geographic location (country/city level)</li>
                <li>Referral source (how you found our site)</li>
              </ul>
              <p className="mt-2">
                This data is aggregated and anonymous — it does not identify you personally. It helps us understand
                traffic patterns and improve the website experience. This data is subject to{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">Google&apos;s Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Cookies</h2>
              <p>
                Our website may use cookies through Google Analytics for measuring website traffic and usage patterns.
                These are third-party cookies set by Google. You can control or disable cookies through your browser settings.
              </p>
              <p className="mt-2">
                We do not use cookies for advertising, tracking personal information, or user identification purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Local Storage</h2>
              <p>
                We use your browser&apos;s localStorage to auto-save your biodata form progress. This means:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Your data is stored only on your device</li>
                <li>It persists between sessions so you don&apos;t lose your work</li>
                <li>You can clear it anytime using the &quot;Reset&quot; button or clearing your browser data</li>
                <li>We have no access to this data — it never leaves your browser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Google Analytics</strong> — for anonymous website traffic analysis</li>
                <li><strong>Google Forms</strong> — for optional feedback collection</li>
                <li><strong>Vercel</strong> — for website hosting</li>
              </ul>
              <p className="mt-2">
                Each of these services has their own privacy policy governing how they handle data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Data Security</h2>
              <p>
                Since we do not collect or store your personal biodata information on any server, there is no risk of
                server-side data breaches for your biodata details. Your information remains under your control
                in your browser at all times.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Children&apos;s Privacy</h2>
              <p>
                Our service is intended for users who are of marriageable age. We do not knowingly collect
                personal information from children under 18.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be reflected on this page
                with an updated &quot;Last updated&quot; date. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our practices, you can reach us through
                our{' '}
                <a href="https://forms.gle/FqdEvsViAW3dT5nT6" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">
                  feedback form
                </a>.
              </p>
            </section>
          </div>
        </article>
      </main>

      <footer className="border-t py-8 px-4 bg-white/60">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            FreeShaadiBiodata &copy; {new Date().getFullYear()} | Free Shaadi Biodata Maker Online
          </p>
        </div>
      </footer>
    </div>
  );
}
