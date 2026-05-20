export default function sitemap() {
  const baseUrl = 'https://biodatamaker.in';

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
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...seoPages.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
