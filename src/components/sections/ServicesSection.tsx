"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Code2, ShieldAlert, Compass, Bot, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SERVICE_ICONS = {
  ciberseguridad: ShieldAlert,
  desarrollo: Code2,
  "ia-agentes": Bot,
  consultoria: Compass,
} as const;

/**
 * Sección "Qué hacemos" / Servicios.
 *
 * Composición:
 *   header
 *   ↓
 *   grid 2x2 de cards grandes (mobile: 1 col)
 *
 * Cada card:
 *   - Ícono lineart en electric-blue
 *   - Título display grande
 *   - Descripción
 *   - Link "Conocer más" → /servicios#id
 *
 * Hover: la card entera se eleva, glow sutil y la flecha del link
 * se mueve diagonal.
 */
export function ServicesSection() {
  return (
    <Section anchor="servicios">
      <SectionHeader
        eyebrow="Qué hacemos"
        title={
          <>
            Cuatro disciplinas,
            <br />
            <span className="text-gradient-brand">un mismo equipo.</span>
          </>
        }
        description="Un equipo para todo el ciclo. Sin intermediarios."
        align="left"
      />

      <Container size="wide" className="mt-16 md:mt-20">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id as keyof typeof SERVICE_ICONS];

            return (
              <motion.li
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
                  },
                }}
                className="group relative"
              >
                <Link
                  href={`/servicios#${service.id}`}
                  className={cn(
                    "block relative h-full p-8 md:p-10 rounded-3xl",
                    "bg-navy-mid/40 border border-ice-white/[0.06]",
                    "hover:bg-navy-mid/60 hover:border-mint-accent/30",
                    "transition-all duration-500 ease-out",
                    "hover:shadow-[0_24px_64px_-16px_rgba(44,82,130,0.18)]",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-mint-accent focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-navy-deep",
                  )}
                >
                  {/* Decorative line top — gradiente al hover */}
                  <div
                    aria-hidden
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-mint-accent/0 to-transparent group-hover:via-mint-accent/60 transition-all duration-500"
                  />

                  <div className="flex items-start justify-between gap-6">
                    {/* Ícono */}
                    {Icon && (
                      <div className="shrink-0 size-14 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center group-hover:bg-electric-blue/15 group-hover:border-electric-blue/40 transition-all duration-300">
                        <Icon
                          className="size-6 text-electric-blue"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </div>
                    )}

                    {/* Flecha externa */}
                    <ArrowUpRight
                      className="size-5 text-ice-white/30 group-hover:text-mint-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      aria-hidden
                    />
                  </div>

                  <h3 className="mt-8 font-display text-2xl md:text-3xl font-bold text-ice-white leading-tight">
                    {service.name}
                  </h3>

                  <p className="mt-4 text-ice-white/65 leading-relaxed text-pretty">
                    {service.description}
                  </p>

                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-mint-accent/80 group-hover:text-mint-accent transition-colors">
                    Conocer más
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
