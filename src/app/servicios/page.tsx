import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  ShieldAlert,
  Compass,
  Wrench,
  ArrowRight,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE, PRIMARY_CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Desarrollo de software a la medida, auditorías de ciberseguridad, consultoría tecnológica y soporte continuo. Especialistas en salud privada.",
  alternates: { canonical: `${SITE.url}/servicios` },
  openGraph: {
    title: "Servicios · Norte Software",
    description:
      "Desarrollo, ciberseguridad, consultoría y soporte. Construido y protegido por el mismo equipo.",
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
    id: "desarrollo",
    name: "Desarrollo de software",
    icon: Code2,
    tagline: "Aplicaciones a la medida que escalan con tu operación.",
    description:
      "Construimos sistemas web, APIs, integraciones y dashboards adaptados a procesos específicos de tu negocio. Trabajamos con stacks modernos (TypeScript, Next.js, React, Node.js, Python, PostgreSQL) y entregamos código documentado, probado y listo para producción.",
    capabilities: [
      "Aplicaciones web full-stack (front + back + base de datos)",
      "APIs REST y GraphQL con autenticación y rate limiting",
      "Integraciones con sistemas existentes (ERPs, CRMs, sistemas legacy)",
      "Dashboards de gestión y reportería en tiempo real",
      "Migraciones de software heredado a arquitectura moderna",
      "Aplicaciones móviles híbridas (React Native)",
    ],
    industries:
      "Salud privada, fintech, logística, retail, educación, manufactura.",
  },
  {
    id: "ciberseguridad",
    name: "Ciberseguridad y auditoría",
    icon: ShieldAlert,
    tagline: "Encontramos las vulnerabilidades antes que un atacante.",
    description:
      "Auditamos aplicaciones web, APIs y arquitecturas en busca de fallos de seguridad. Detectamos vulnerabilidades comunes (OWASP Top 10), problemas de autenticación, lógica de negocio explotable, y filtraciones de datos. Entregamos reportes accionables con severidad CVSS y plan de remediación.",
    capabilities: [
      "Pentesting de aplicaciones web y APIs",
      "Auditoría de código fuente",
      "Análisis de arquitectura y modelo de amenazas",
      "Pruebas de IDOR, race conditions, lógica de negocio",
      "Revisión de cumplimiento (LFPDPPP, ISO 27001 base)",
      "Hardening de infraestructura cloud (AWS, Cloudflare)",
    ],
    industries:
      "Especialmente crítico en salud privada (datos personales sensibles), fintech, y cualquier organización que maneje información regulada.",
  },
  {
    id: "consultoria",
    name: "Consultoría tecnológica",
    icon: Compass,
    tagline: "Dirección clara antes de escribir una línea de código.",
    description:
      "Antes de construir, ayudamos a decidir qué construir. Analizamos procesos, evaluamos opciones técnicas, estimamos costos y plazos realistas. Si tu equipo interno construye, los acompañamos como asesor técnico externo. Si tercerizas, te ayudamos a seleccionar y supervisar al proveedor.",
    capabilities: [
      "Diagnóstico técnico de software existente",
      "Diseño de arquitectura de sistemas nuevos",
      "Estimaciones de alcance, plazos y costos (RFP, RFQ)",
      "Selección y evaluación de proveedores",
      "Acompañamiento en transformación digital",
      "Capacitación a equipos internos",
    ],
    industries: "Cualquier organización que necesite tomar decisiones técnicas con certeza.",
  },
  {
    id: "mantenimiento",
    name: "Soporte y mantenimiento",
    icon: Wrench,
    tagline: "Aquí cuando lo construimos, y aquí cuando lo necesitas.",
    description:
      "El software que construimos sigue funcionando con el tiempo. Ofrecemos contratos de soporte continuo: monitoreo, actualizaciones de seguridad, corrección de bugs, mejoras incrementales, y disponibilidad para emergencias. Sin sorpresas, sin cargos por hora opacos.",
    capabilities: [
      "Monitoreo 24/7 con alertas configurables",
      "Actualizaciones de seguridad y dependencias",
      "Backups automáticos y plan de recuperación",
      "Corrección de bugs reportados (SLA por severidad)",
      "Mejoras y features incrementales mensuales",
      "Soporte de emergencia con tiempo de respuesta garantizado",
    ],
    industries:
      "Sistemas críticos donde el downtime cuesta dinero o reputación.",
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
                          href={`${PRIMARY_CTA.href}?servicio=${service.id}`}
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

            <Button href={PRIMARY_CTA.href} variant="primary" size="lg">
              {PRIMARY_CTA.label}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
