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
  tagline: "Software confiable, hecho a la medida.",
  taglineSecondary:
    "Desarrollo y protección de datos en un mismo equipo. Aquí cuando lo construimos, y aquí cuando lo necesitas.",
  description:
    "Software a la medida con desarrollo y protección de datos en un mismo equipo. Especialización en salud privada en México.",
  url: "https://nortesoftware.dev",
  contactEmail: "chris@nortesoftware.dev",
  brandTagline: "El norte de tu tecnología.",
  brandSlogan: "Código que resiste. Dirección que guía.",
  brandPromise:
    "Construimos software con dirección clara y seguridad incluida desde el primer commit.",
} as const;

/**
 * Paleta oficial. Duplicada aquí para uso programático
 * (animaciones, charts, OG images). Los componentes usan
 * las clases de Tailwind generadas desde @theme en globals.css.
 */
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
 * Industrias atendidas. La principal va primero y se destaca
 * visualmente en el componente de sección.
 */
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

/**
 * Servicios principales. Usados en home y página /servicios.
 */
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

/**
 * Cinco pilares de la marca. Comunican diferenciadores.
 */
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

/**
 * Stack y tecnologías que dominamos. Para sección "Tecnologías".
 */
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
