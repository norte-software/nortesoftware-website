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
  tagline: "Software confiable, hecho a la medida.",
  taglineSecondary:
    "Desarrollo y protección de datos en un mismo equipo. Aquí cuando lo construimos, y aquí cuando lo necesitas.",
  description:
    "Software a la medida con desarrollo y protección de datos en un mismo equipo. Especialización en salud privada en México.",
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
    "Construimos software con dirección clara y seguridad incluida desde el primer commit.",

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
  electricBlue: "#3B82F6",
  mintAccent: "#34D399",
  iceWhite: "#F0F4FF",
} as const;

/**
 * Navegación principal. El orden importa.
 */
export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Industrias", href: "/#industrias" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const PRIMARY_CTA = {
  label: "Iniciar proyecto",
  href: "/contacto",
} as const;

export const SECONDARY_CTA = {
  label: "Solicitar propuesta",
  href: "/contacto?intent=propuesta",
} as const;

/**
 * Redes sociales del footer.
 * Por ahora todas con href "#" placeholder hasta tener perfiles reales.
 *
 * Cuando crees los perfiles, edita el href acá y se actualiza
 * automáticamente en el footer.
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
 * Links legales del footer. Apuntan a páginas placeholder
 * por ahora; se completan con texto legal real más adelante.
 */
export const LEGAL_LINKS = [
  { label: "Aviso de Privacidad", href: "/privacidad" },
  { label: "Términos y Condiciones", href: "/terminos" },
] as const;

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

export const SERVICES = [
  {
    id: "desarrollo",
    name: "Desarrollo a la medida",
    description:
      "Aplicaciones web, móviles e integraciones construidas con criterios de calidad y mantenibilidad.",
  },
  {
    id: "ciberseguridad",
    name: "Auditoría y protección",
    description:
      "Análisis de seguridad, pruebas de penetración y revisión de código antes y después del despliegue.",
  },
  {
    id: "consultoria",
    name: "Consultoría tecnológica",
    description:
      "Acompañamiento en decisiones de arquitectura, stack y operación para equipos en crecimiento.",
  },
  {
    id: "mantenimiento",
    name: "Soporte y evolución",
    description:
      "Acompañamiento continuo después del lanzamiento. Tu software vive, nosotros lo cuidamos.",
  },
] as const;

export const PILLARS = [
  {
    id: "direccion",
    name: "Dirección clara",
    description:
      "No improvisamos. Cada proyecto inicia con plan, alcance y hitos definidos.",
  },
  {
    id: "seguridad",
    name: "Seguridad integrada",
    description:
      "Protección de datos desde la primera línea de código, no como parche al final.",
  },
  {
    id: "transparencia",
    name: "Transparencia",
    description:
      "Reportes claros, accesos visibles, decisiones documentadas. Ves lo que hacemos.",
  },
  {
    id: "continuidad",
    name: "Continuidad",
    description:
      "Aquí cuando lo construimos. Aquí cuando lo necesitas. Cero abandono post-entrega.",
  },
  {
    id: "especializacion",
    name: "Especialización",
    description:
      "Conocemos las exigencias del sector salud privada y las aplicamos a cada cliente.",
  },
] as const;

export const TECH_STACK = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Cloudflare",
  "Docker",
  "Kubernetes",
] as const;
