import type { Metadata } from "next";
import { SITE } from "./constants";

interface PageSeoOptions {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

/**
 * Genera metadata consistente para cada página.
 * Centraliza title format, canonical, OG y Twitter Cards.
 *
 * Uso:
 *   export const metadata = pageMetadata({
 *     title: "Servicios",
 *     description: "Desarrollo, ciberseguridad y consultoría.",
 *     path: "/servicios",
 *   });
 */
export function pageMetadata({
  title,
  description = SITE.description,
  path = "",
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = `${SITE.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE.name}`,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
