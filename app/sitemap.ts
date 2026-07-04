import type { MetadataRoute } from 'next'

const BASE_URL = 'https://one2many.id'

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceSlug = ['graphic-design', 'ui-ux-design', 'web-development', 'mobile-development', 'video-production']

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/pricing`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/work`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/order`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/team`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`,  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlug.map(slug => ({
    url:             `${BASE_URL}/services/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.85,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
