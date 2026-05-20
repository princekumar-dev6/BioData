import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient-bg">
      <div className="text-center">
        <h1 className="text-6xl font-bold font-playfair mb-4 gradient-text">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you&apos;re looking for doesn&apos;t exist. Start creating your free marriage biodata instead!
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-semibold h-11 px-6 text-white gradient-primary hover:opacity-90 transition-opacity"
        >
          Create Free Biodata →
        </Link>
      </div>
    </div>
  );
}
