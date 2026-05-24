export default function sitemap() {
  const baseUrl = 'https://www.freeshaadibiodata.in';
  const lastModified = '2025-05-24';

  const seoPages = [
    'marriage-biodata-format',
    'hindu-biodata-format',
    'biodata-for-boy',
    'biodata-for-girl',
    'simple-biodata-format',
    'modern-biodata-design',
    'marathi-biodata-format',
  ];

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...seoPages.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
