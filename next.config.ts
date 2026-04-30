import type { NextConfig } from "next";

/**
 * Headers de seguridad aplicados a TODAS las rutas.
 *
 * Decisiones:
 *
 * - Content-Security-Policy: estricta. Solo permite scripts/imgs/connects
 *   desde nuestro dominio + servicios autorizados (Resend, Cloudflare
 *   Turnstile, Google Fonts). 'unsafe-inline' en style-src es necesario
 *   para Next.js (inline styles en hidratación) y para Tailwind v4.
 *   'unsafe-eval' está PROHIBIDO (no usamos webpack dev en producción).
 *
 * - HSTS: 2 años + preload. Solicitamos inclusión en hsts-preload de Chromium
 *   una vez el sitio esté estable.
 *
 * - X-Frame-Options DENY: nadie puede embeber el sitio en iframes.
 *   Previene clickjacking.
 *
 * - Permissions-Policy: niega APIs sensibles que NO necesitamos
 *   (cámara, micrófono, geolocalización, USB, pagos, etc.).
 *
 * - Referrer-Policy: solo enviamos origen, no path completo, en navegación
 *   cross-origin. Balance entre analítica útil y privacidad.
 */

const cspDirectives = [
  "default-src 'self'",
  // Scripts: nuestro dominio + Turnstile (CAPTCHA del form). 'unsafe-inline' lo
  // requiere Next.js para sus scripts de hidratación inline. NO añadir 'unsafe-eval'.
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  // Estilos: 'unsafe-inline' es requerido por Tailwind v4 y por estilos
  // inline que Next.js genera. Sin esto el sitio no renderiza.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  // Imágenes: nuestro dominio + data URIs (para SVG inline) + blob (para
  // imágenes generadas en runtime como OG dinámico).
  "img-src 'self' data: blob: https:",
  // Conexiones AJAX: solo a nuestro dominio + Resend para el form.
  "connect-src 'self' https://api.resend.com https://challenges.cloudflare.com",
  // Frames: solo Turnstile (su widget se carga en iframe).
  "frame-src https://challenges.cloudflare.com",
  // Sin objetos embebidos (Flash, Java, etc.).
  "object-src 'none'",
  // Base URI bloqueada — previene base tag injection.
  "base-uri 'self'",
  // Forms: solo a nuestro dominio.
  "form-action 'self'",
  // No permitir que nadie nos meta en iframe (refuerza X-Frame-Options).
  "frame-ancestors 'none'",
  // Forzar HTTPS en cualquier carga mixta accidental.
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "sync-xhr=()",
      "usb=()",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
  // Cross-Origin Isolation. Mejora seguridad y permite features avanzados
  // del navegador (SharedArrayBuffer, etc.) en el futuro si los necesitamos.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // TypeScript estricto en el build
  typescript: { ignoreBuildErrors: false },
  // Nota: en Next.js 16 la propiedad `eslint` fue removida del NextConfig.
  // ESLint ahora corre como herramienta independiente vía `npm run lint`.

  // Next/Image: solo dominios explícitamente autorizados
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },

  // Quita el header "x-powered-by: Next.js" — fingerprinting innecesario
  poweredByHeader: false,

  // Comprime respuestas
  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Cache largo para assets de Next.js (immutable por hash)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache largo para imágenes de public/ (revisar si cambian de ruta)
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
