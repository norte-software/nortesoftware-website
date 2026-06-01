import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  ShieldAlert,
  Compass,
  Bot,
  ArrowRight,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE, CONTACT_CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Ciberseguridad y pentesting, desarrollo de software a la medida, inteligencia artificial y agentes, consultoría técnica. Especialistas en salud privada en México.",
  alternates: { canonical: `${SITE.url}/servicios` },
  openGraph: {
    title: "Servicios · Norte Software",
    description:
      "Ciberseguridad, desarrollo, IA y consultoría. Construido y protegido por el mismo equipo.",
    url: `${SITE.url}/servicios`,
    type: "website",
  },
};

interface ServiceDetail {
  id: string;
  name: string;
  icon: typeof Code2;
  tagline: string;
  description: string;
  capabilities: string[];
  industries: string;
}

const SERVICES_DETAIL: ServiceDetail[] = [
  {
    id: "ciberseguridad",
    name: "Ciberseguridad y Pentesting",
    icon: ShieldAlert,
    tagline: "Encontramos las vulnerabilidades antes que un atacante.",
    description:
      "Auditamos aplicaciones web, APIs y arquitecturas en busca de fallos de seguridad. Detectamos vulnerabilidades OWASP Top 10, problemas de autenticación, lógica de negocio explotable y filtraciones. Entregamos reportes accionables con severidad CVSS y plan de remediación priorizado.",
    capabilities: [
      "Pruebas de penetración a aplicaciones web y APIs",
      "Auditorías de seguridad y revisión de código fuente",
      "Análisis de arquitectura y modelo de amenazas",
      "Pruebas de IDOR, race conditions y lógica de negocio",
      "Reporte ejecutivo con hallazgos y remediación priorizada",
      "Revisión de cumplimiento (LFPDPPP, ISO 27001 base)",
    ],
    industries:
      "Especialmente crítico en salud privada (datos personales sensibles), fintechs, hospitales y cualquier organización que maneje información regulada.",
  },
  {
    id: "desarrollo",
    name: "Desarrollo de Software a la Medida",
    icon: Code2,
    tagline: "Sistemas que escalan con tu operación desde el primer deploy.",
    description:
      "Construimos sistemas web, móviles e integraciones adaptados a procesos específicos de tu negocio. Stack moderno: Python, TypeScript, Next.js, Node.js, FastAPI, PostgreSQL. Metodología ágil con entregas incrementales y código documentado listo para producción.",
    capabilities: [
      "Aplicaciones web full-stack (front + back + base de datos)",
      "APIs REST y GraphQL con autenticación y rate limiting",
      "Integraciones con sistemas existentes (ERPs, CRMs, sistemas legacy)",
      "Dashboards de gestión y reportería en tiempo real",
      "Aplicaciones móviles híbridas (React Native)",
      "Migraciones de software heredado a arquitectura moderna",
    ],
    industries:
      "Salud privada, fintech, logística, retail, educación, manufactura.",
  },
  {
    id: "ia-agentes",
    name: "Inteligencia Artificial y Agentes",
    icon: Bot,
    tagline: "IA que trabaja dentro de tu operación, no como demo externa.",
    description:
      "Integramos modelos de lenguaje y agentes de IA en procesos reales de negocio. Desde automatización de flujos administrativos hasta chatbots especializados con acceso a tu base de datos. Usamos Claude (Anthropic) y OpenAI con arquitectura responsable y auditable.",
    capabilities: [
      "Agentes inteligentes con acceso a APIs y bases de datos internas",
      "Chatbots y asistentes para atención al cliente o equipos internos",
      "Automatización de flujos: clasificación, resúmenes y extracción de datos",
      "Integración con Claude API y OpenAI para casos de uso empresarial",
      "Pipelines RAG sobre documentación interna de la empresa",
      "Evaluación responsable de modelos para verticales específicas",
    ],
    industries:
      "Salud privada (resúmenes de expedientes, asistentes clínicos), legal (revisión de contratos), retail (atención automatizada), fintech (análisis de riesgo).",
  },
  {
    id: "consultoria",
    name: "Consultoría Técnica",
    icon: Compass,
    tagline: "Dirección técnica antes de que el problema se vuelva caro.",
    description:
      "Auditamos arquitecturas existentes, diseñamos estrategias tech para empresas medianas y actuamos como CTO externo cuando necesitas visión técnica sin contratar un equipo completo. Llevamos el mapa cuando tu negocio crece más rápido que tu infraestructura.",
    capabilities: [
      "Auditoría de arquitectura de sistemas existentes",
      "Estrategia tech y roadmap para empresas medianas",
      "CTO as a Service: acompañamiento técnico mensual",
      "Evaluación y selección de proveedores de software",
      "Due diligence técnico para procesos de inversión o adquisición",
      "Capacitación técnica a equipos internos",
    ],
    industries:
      "Empresas medianas en crecimiento, startups buscando escalar, organizaciones que necesitan visión técnica sin director de tecnología en nómina.",
  },
];

export default function ServiciosPage() {
  return (
    <main id="main" className="pt-24 md:pt-32 pb-24">
      {/* Glow ambiental */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-electric-blue/[0.06] blur-[100px] pointer-events-none"
      />

      <Container size="wide" className="relative">
        {/* Header */}
        <div className="max-w-3xl mb-20 md:mb-24">
          <p className="font-display text-electric-blue text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6">
            Servicios
          </p>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-[1.05] mb-6">
            Cuatro disciplinas,
            <br />
            <span className="text-gradient-brand">un mismo equipo.</span>
          </h1>

          <p className="text-ice-white/70 text-base md:text-lg leading-relaxed text-pretty">
            Construimos, protegemos, asesoramos y acompañamos. Sin pasarte
            de proveedor en proveedor, sin perder contexto entre etapas.
          </p>
        </div>

        {/* Servicios */}
        <div className="flex flex-col gap-20 md:gap-28">
          {SERVICES_DETAIL.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Header del servicio */}
                  <header
                    className={`lg:col-span-5 ${isReversed ? "lg:order-2" : ""}`}
                  >
                    <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 mb-6">
                      <Icon
                        className="size-6 text-electric-blue"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </div>

                    <p className="font-display text-electric-blue text-xs tracking-[0.25em] uppercase mb-3">
                      0{index + 1}
                    </p>

                    <h2 className="font-display text-3xl md:text-4xl font-bold text-ice-white leading-tight mb-4">
                      {service.name}
                    </h2>

                    <p className="text-mint-accent text-lg font-medium mb-6 text-balance">
                      {service.tagline}
                    </p>

                    <p className="text-ice-white/65 text-base leading-relaxed text-pretty">
                      {service.description}
                    </p>

                    <p className="mt-6 text-sm text-ice-white/50">
                      <span className="font-medium text-ice-white/70">
                        Industrias:
                      </span>{" "}
                      {service.industries}
                    </p>
                  </header>

                  {/* Capacidades */}
                  <div
                    className={`lg:col-span-7 ${isReversed ? "lg:order-1" : ""}`}
                  >
                    <div className="rounded-2xl border border-ice-white/[0.08] bg-navy-mid/30 p-6 md:p-8">
                      <h3 className="text-xs uppercase tracking-wider text-ice-white/45 mb-4">
                        Qué incluye
                      </h3>

                      <ul className="flex flex-col gap-3">
                        {service.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="flex items-start gap-3 text-sm md:text-base text-ice-white/85"
                          >
                            <Check
                              className="shrink-0 size-5 text-mint-accent mt-0.5"
                              strokeWidth={2}
                              aria-hidden
                            />
                            <span>{capability}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 pt-6 border-t border-ice-white/[0.08]">
                        <Link
                          href={`${CONTACT_CTA.href}?servicio=${service.id}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-mint-accent hover:gap-3 transition-all duration-300"
                        >
                          Cotizar este servicio
                          <ArrowRight
                            className="size-4"
                            aria-hidden
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA final */}
        <div className="mt-24 md:mt-32 rounded-3xl border border-ice-white/[0.08] bg-gradient-to-br from-navy-mid/60 via-navy-deep to-navy-mid/40 p-8 md:p-16 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-electric-blue/[0.08] blur-[100px] pointer-events-none"
          />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-[1.05] mb-6">
              ¿No sabes por dónde empezar?
            </h2>

            <p className="text-ice-white/65 text-base md:text-lg mb-8 text-pretty">
              Cuéntanos del proyecto en una llamada de 30 minutos sin compromiso.
              Si no podemos ayudarte, te decimos quién sí.
            </p>

            <Button href={CONTACT_CTA.href} variant="primary" size="lg">
              {CONTACT_CTA.label}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
