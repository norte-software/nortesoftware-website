import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Robots.txt generado en build time.
 * Next.js lo expone automáticamente en /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
