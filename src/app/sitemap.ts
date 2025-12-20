import { MetadataRoute } from 'next';
import { getPostsByCategory } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.casaitalia.com';

  let products = [];
  try {
      products = await getPostsByCategory("fenlei", 100);
  } catch (e) {
      console.error("Sitemap generation error: ", e);
  }

  const productUrls = (products || []).map((edge: any) => ({
    url: `${baseUrl}/product/${edge.node.slug}`,
    lastModified: new Date(), 
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...productUrls,
  ];
}
