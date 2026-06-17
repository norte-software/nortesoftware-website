import type { Metadata, Viewport } from "next";
import { League_Spartan, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/constants";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const leagueSpartan = League_Spartan({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Voz instrumental de Norte: eyebrows, coordenadas, versiones, estados.
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0C2A22",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  generator: "Next.js",
  keywords: [
    "desarrollo de software",
    "ciberseguridad",
    "consultoría tecnológica",
    "salud privada",
    "México",
    "software a la medida",
    "auditoría de seguridad",
    "Norte Software",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon-512.png`,
  description: SITE.description,
  email: SITE.emails.info,
  telephone: SITE.phone.e164,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    addressCountry: "MX",
  },
  areaServed: ["MX", "US"],
  knowsAbout: [
    "Desarrollo de software a la medida",
    "Ciberseguridad",
    "Consultoría tecnológica",
    "Salud privada",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${leagueSpartan.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-green-deep text-cream antialiased min-h-svh font-sans">
        <a href="#main" className="skip-link">
          Saltar al contenido principal
        </a>

        <SiteShell>{children}</SiteShell>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
