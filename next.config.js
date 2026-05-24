/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'freeshaadibiodata.in' }],
        destination: 'https://www.freeshaadibiodata.in/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
