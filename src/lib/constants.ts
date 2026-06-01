/**
 * NORTE SOFTWARE — Single source of truth.
 *
 * Toda la información de la marca, navegación, copys de marketing,
 * y configuración del sitio vive aquí. Cambios en la marca se hacen
 * en este archivo y se propagan al resto de la app.
 */

export const SITE = {
  name: "Norte Software",
  legalName: "Norte Software S.A. de C.V.",
  founderName: "Christian Noé Ramos López",
  founderRole: "Founder & CTO",
  tagline: "El norte de tu tecnología.",
  taglineSecondary:
    "Construimos software que resiste. Desde Chiapas para México y LATAM.",
  description:
    "Norte Software construye productos y servicios de tecnología para industrias mexicanas. Ciberseguridad, desarrollo, IA y consultoría.",
  url: "https://nortesoftware.dev",

  // Emails diferenciados — usar el correcto según contexto público vs privado
  emails: {
    /** Email principal del sitio (formularios, footer, contacto público). */
    info: "info@nortesoftware.dev",
    /** Email del fundador (sección "Nosotros", pitch personalizado, prensa). */
    founder: "chris@nortesoftware.dev",
    // Nota: nortesoftware@ es interno administrativo, NO se expone públicamente.
  },

  // Teléfono / WhatsApp
  phone: {
    /** Display formateado para humanos. */
    display: "+52 967 145 6444",
    /** Formato E.164 sin caracteres para tel: links. */
    e164: "+529671456444",
    /** Para wa.me (sin +, sin espacios). */
    whatsapp: "529671456444",
  },

  brandTagline: "El norte de tu tecnología.",
  brandSlogan: "Código que resiste. Dirección que guía.",
  brandPromise:
    "Construimos con dirección. Entregamos lo que prometemos. Sin ruido.",

  // Dirección legal
  address: {
    city: "San Cristóbal de las Casas",
    state: "Chiapas",
    country: "México",
    short: "San Cristóbal de las Casas, Chiapas, MX",
  },

  foundedYear: 2026,
} as const;

/**
 * Mensaje pre-llenado para el botón de WhatsApp.
 * Codificado para URL para usar en wa.me/...?text=
 */
export const WHATSAPP_PREFILL_MESSAGE = encodeURIComponent(
  "Hola Norte Software, vengo del sitio web y me interesa platicar sobre un proyecto.",
);

/**
 * URL completa de WhatsApp con mensaje pre-llenado.
 * Calculada una sola vez para reusar en FAB, footer, /contacto.
 */
export const WHATSAPP_URL = `https://wa.me/${SITE.phone.whatsapp}?text=${WHATSAPP_PREFILL_MESSAGE}`;

export const BRAND_COLORS = {
  navyDeep: "#0A1628",
  navyMid: "#0F2040",
  norteBlue: "#1A4ABA",
  electricBlue: "#2C5282",
  mintAccent: "#C8852A",
  norteVerde: "#2D6A4F",
  iceWhite: "#F0F4FF",
} as const;

/**
 * Navegación principal. El orden importa.
 */
export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Productos", href: "/#productos" },
  { label: "Industrias", href: "/#industrias" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const PRIMARY_CTA = {
  label: "Ver productos",
  href: "/#productos",
} as const;

/**
 * CTA de conversión a contacto. Se mantiene separado de PRIMARY_CTA
 * (que ahora apunta a productos) para Header, menú móvil, footer,
 * FinalCTA y la página de Servicios.
 */
export const CONTACT_CTA = {
  label: "Iniciar proyecto",
  href: "/contacto",
} as const;

/**
 * Redes sociales del footer.
 */
export const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn de Norte Software",
    href: "https://www.linkedin.com/company/nortesoftware/",
    iconKey: "linkedin" as const,
  },
  {
    id: "instagram",
    label: "Instagram de Norte Software",
    href: "https://www.instagram.com/norte.software/",
    iconKey: "instagram" as const,
  },
  {
    id: "facebook",
    label: "Facebook de Norte Software",
    href: "https://www.facebook.com/61589451873526/",
    iconKey: "facebook" as const,
  },
  {
    id: "whatsapp",
    label: "WhatsApp de Norte Software",
    href: "https://wa.me/529671456444",
    iconKey: "whatsapp" as const,
  },
] as const;

/**
 * Links legales del footer.
 */
export const LEGAL_LINKS = [
  { label: "Aviso de Privacidad", href: "/privacidad" },
  { label: "Términos y Condiciones", href: "/terminos" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTOS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tipos exportados para narrowing en componentes.
 * La discriminación se hace sobre el campo `available`.
 */
export interface AvailableProduct {
  id: string;
  name: string;
  description: string;
  available: true;
  badge: string;
  url: string;
  cta: string;
}

export interface ComingSoonProduct {
  id: string;
  name: string;
  description: string;
  available: false;
  badge: string;
}

export type Product = AvailableProduct | ComingSoonProduct;

/**
 * Catálogo de productos Norte Software.
 * Orden: disponibles primero, después próximamente.
 */
export const PRODUCTS: readonly Product[] = [
  {
    id: "secagent",
    name: "Norte SecAgent",
    description:
      "Análisis de amenazas de seguridad en tiempo real con inteligencia artificial. Detecta brute force, SQL injection, C2, exfiltración y más en segundos.",
    available: true,
    badge: "Disponible ahora",
    url: "https://secagent.nortesoftware.dev",
    cta: "Probar SecAgent",
  },
  {
    id: "nortecampo",
    name: "NorteCampo",
    description:
      "SaaS de monitoreo global agrícola para productores de México y LATAM. Analiza NDVI, clima, humedad del suelo y riesgo de incendio.",
    available: true,
    badge: "Disponible ahora",
    url: "https://nortecampo.com",
    cta: "Ir a NorteCampo",
  },
  {
    id: "norteprevent",
    name: "NortePrevent",
    description:
      "Sistema de detección temprana de incendios forestales y deforestación ilegal para gobiernos y organizaciones.",
    available: false,
    badge: "Próximamente",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICIOS
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICES = [
  {
    id: "ciberseguridad",
    name: "Ciberseguridad y Pentesting",
    description:
      "Pruebas de penetración a aplicaciones web y APIs, auditorías de seguridad y reporte ejecutivo con hallazgos y remediación. Ideal para fintechs, hospitales y empresas con datos sensibles.",
  },
  {
    id: "desarrollo",
    name: "Desarrollo de Software a la Medida",
    description:
      "Sistemas web y móviles desde cero, con integraciones a sistemas existentes. Stack moderno: Python, TypeScript, Next.js, FastAPI. Metodología ágil con entregas incrementales.",
  },
  {
    id: "ia-agentes",
    name: "Inteligencia Artificial y Agentes",
    description:
      "Integración de IA en procesos de negocio, agentes inteligentes con Claude y OpenAI, automatización de flujos y chatbots especializados para empresas.",
  },
  {
    id: "consultoria",
    name: "Consultoría Técnica",
    description:
      "Auditoría de arquitectura de sistemas existentes, estrategia tech para empresas medianas y acompañamiento CTO as a Service.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO HOME
// ─────────────────────────────────────────────────────────────────────────────

export const INDUSTRIES = [
  {
    id: "salud",
    name: "Salud privada",
    description:
      "Sistemas para clínicas, hospitales y consultorios. Manejo seguro de expedientes y cumplimiento normativo.",
    isPrimary: true,
  },
  {
    id: "logistica",
    name: "Logística y transporte",
    description: "Plataformas de seguimiento, ruteo y operación logística.",
    isPrimary: false,
  },
  {
    id: "fintech",
    name: "Fintech",
    description: "Aplicaciones financieras con auditoría de seguridad continua.",
    isPrimary: false,
  },
  {
    id: "retail",
    name: "Retail y e-commerce",
    description: "Tiendas en línea y back-office para comercios en crecimiento.",
    isPrimary: false,
  },
  {
    id: "educacion",
    name: "Educación",
    description: "Plataformas educativas y sistemas administrativos escolares.",
    isPrimary: false,
  },
  {
    id: "legal",
    name: "Legal",
    description: "Herramientas para despachos: gestión de casos y documentos.",
    isPrimary: false,
  },
  {
    id: "manufactura",
    name: "Manufactura",
    description: "Sistemas de control de producción, inventarios y trazabilidad.",
    isPrimary: false,
  },
  {
    id: "otros",
    name: "Otros sectores",
    description: "Cada industria tiene reglas distintas. Las aprendemos contigo.",
    isPrimary: false,
  },
] as const;

export const PILLARS = [
  {
    id: "seguridad",
    name: "Seguridad integrada",
    description:
      "Hacemos pentesting. Sabemos cómo se rompen las cosas. Por eso las construimos de otra manera desde el inicio.",
  },
  {
    id: "transparencia",
    name: "Transparencia",
    description:
      "Sin informes de 50 páginas que no dicen nada. Lo que importa, directo y documentado.",
  },
  {
    id: "continuidad",
    name: "Continuidad",
    description:
      "No desaparecemos después del launch. Tu software vive — nosotros lo acompañamos.",
  },
] as const;

export const TECH_STACK = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Claude API",
  "AWS",
  "Cloudflare",
  "Docker",
  "Kubernetes",
] as const;
