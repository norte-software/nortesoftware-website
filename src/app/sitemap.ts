import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Sitemap.xml generado en build time.
 * Next.js lo expone automáticamente en /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/servicios`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/contacto`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
