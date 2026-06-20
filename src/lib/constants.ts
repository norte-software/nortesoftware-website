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
    "Construimos software que resiste. Desde Chiapas para México y el mundo.",
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

  /**
   * Coordenadas reales de San Cristóbal de las Casas, Chiapas.
   * Sello geográfico verificable de la marca (sistema "Latón del Norte").
   * Se usan en hero, divisores de sección y colofón del footer — en mono.
   */
  coordinates: {
    lat: "16.7370°N",
    lng: "92.6376°W",
    full: "16.7370°N 92.6376°W",
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
  green900: "#07211A",
  greenDeep: "#0C2A22",
  greenPanel: "#123A2E",
  gold: "#C69B3C",
  goldSoft: "#D8BE7A",
  goldDeep: "#A8843A",
  cream: "#F4EADE",
  slate: "#8FA39B",
} as const;

/**
 * Navegación principal. El orden importa — prueba primero.
 */
export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/#productos" },
  { label: "Seguridad", href: "/#seguridad" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const PRIMARY_CTA = {
  label: "Ver lo que construimos",
  href: "/#productos",
} as const;

/**
 * CTA de conversión a contacto. Se mantiene separado de PRIMARY_CTA
 * (que apunta a la prueba/productos) para Header, menú móvil, footer,
 * FinalCTA y la página de Servicios.
 */
export const CONTACT_CTA = {
  label: "Iniciar proyecto",
  href: "/contacto",
} as const;

/**
 * StatBar bajo el hero — prueba en seco (brief §4.1).
 * Números REALES, confirmados por Christian como publicables y verificables
 * (2026-06-20). Regla dura: NO inventar — un dato inflado que un cliente
 * cache mata el "peso pesado". El "7" es el conteo de productos vivos
 * (el muro muestra 3 con captura; el resto existen en producción).
 */
export const STATS = [
  { value: "7", label: "Productos en producción" },
  { value: "Tesla · Odoo · Dstny", label: "Reportes reconocidos" },
  { value: "< 48 h", label: "Tiempo de respuesta" },
  { value: "Chiapas", label: "Base · escala global" },
] as const;

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
  /** Dominio en vivo, mostrado en mono bajo el nombre. */
  domain: string;
  cta: string;
  /** Captura real del producto (WebP optimizado en /public/images/products). */
  image: string;
  imageAlt: string;
  /** Color de acento (hex) para chrome de la card. Default: gold. */
  badgeColor?: string;
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
 * Muro de prueba — 3 productos propios de Norte, vivos hoy (brief §4.2).
 * Calidad sobre cantidad: 3 fuertes con captura real, outcome en humano y
 * sin jerga técnica. SecAgent, Cenit y NorteVision NO van como card
 * (SecAgent se menciona en la sección de Seguridad).
 */
export const PRODUCTS: readonly Product[] = [
  {
    id: "nortecampo",
    name: "NorteCampo",
    description: "Mira qué pasa en tu campo sin estar ahí.",
    available: true,
    badge: "En vivo",
    url: "https://nortecampo.com",
    domain: "nortecampo.com",
    cta: "Abrir",
    image: "/images/products/nortecampo.webp",
    imageAlt:
      "NorteCampo en producción: monitoreo satelital de parcelas agrícolas.",
  },
  {
    id: "norteprevent",
    name: "NortePrevent",
    description: "Detecta el incendio y la tala antes de que crezcan.",
    available: true,
    badge: "En vivo",
    url: "https://norteprevent.com",
    domain: "norteprevent.com",
    cta: "Abrir",
    image: "/images/products/norteprevent.webp",
    imageAlt:
      "NortePrevent en producción: detección temprana de incendios y deforestación.",
  },
  {
    id: "ollin",
    name: "Ollin",
    description: "Datos sísmicos reales, en vivo. Cero pánico.",
    available: true,
    badge: "En vivo",
    url: "https://ollin.lat",
    domain: "ollin.lat",
    cta: "Abrir",
    image: "/images/products/ollin.webp",
    imageAlt:
      "Ollin en producción: red abierta de sensores sísmicos y clima espacial.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICIOS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Servicios — desde la autoridad ya ganada por la prueba (brief §4.4).
 * Cuatro disciplinas, en seco, con la seguridad como hilo. No es menú.
 */
export const SERVICES = [
  {
    id: "ciberseguridad",
    name: "Seguridad ofensiva",
    description:
      "Pentest de aplicaciones y APIs. Reporte ejecutivo accionable: qué se rompe, cómo y en qué orden arreglarlo. Lo que entregamos, lo atacamos primero.",
  },
  {
    id: "desarrollo",
    name: "Software a la medida",
    description:
      "Sistemas web y móviles que nacen endurecidos, no parchados después. Python, TypeScript, Next.js y FastAPI, integrados a lo que ya tienes.",
  },
  {
    id: "ia-agentes",
    name: "IA aplicada",
    description:
      "Modelos y agentes metidos en procesos reales —donde quitan trabajo, no donde suenan bien. Una herramienta más del stack.",
  },
  {
    id: "consultoria",
    name: "Consultoría y CTO-as-a-Service",
    description:
      "Dirección técnica para decidir bien: arquitectura, seguridad y rumbo, sin tener que montar un equipo entero.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO HOME
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Industrias — contexto, no menú (brief §4.6). Dos sectores donde el
 * software es crítico; mata la rejilla de 8.
 */
export const INDUSTRIES = [
  {
    id: "salud",
    name: "Salud privada",
    description:
      "Expedientes, citas y operación clínica. Un dato filtrado no es opción.",
  },
  {
    id: "fintech",
    name: "Fintech",
    description:
      "Dinero y datos sensibles en movimiento. Un sistema caído no es opción.",
  },
] as const;
