"use client";

import { motion } from "motion/react";
import {
  Heart,
  Truck,
  Wallet,
  ShoppingBag,
  GraduationCap,
  Scale,
  Factory,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { INDUSTRIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const INDUSTRY_ICONS = {
  salud: Heart,
  logistica: Truck,
  fintech: Wallet,
  retail: ShoppingBag,
  educacion: GraduationCap,
  legal: Scale,
  manufactura: Factory,
  otros: Sparkles,
} as const;

/**
 * Sección Industrias.
 *
 * Composición intencional asimétrica:
 *
 *   ┌─────────────────────────┬───────┬───────┐
 *   │                         │ Logís │ Fintech│
 *   │                         ├───────┼───────┤
 *   │   SALUD PRIVADA         │ Retail│ Educa │
 *   │   (card destacada       ├───────┼───────┤
 *   │    grande)              │ Legal │ Manuf │
 *   │                         ├───────┴───────┤
 *   │                         │     Otros     │
 *   └─────────────────────────┴───────────────┘
 *
 * Hace claro que SALUD es la especialización principal sin minimizar
 * a las otras industrias.
 */
export function IndustriesSection() {
  const primaryIndustry = INDUSTRIES.find((i) => i.isPrimary);
  const secondaryIndustries = INDUSTRIES.filter((i) => !i.isPrimary);

  if (!primaryIndustry) return null;

  const PrimaryIcon =
    INDUSTRY_ICONS[primaryIndustry.id as keyof typeof INDUSTRY_ICONS];

  return (
    <Section anchor="industrias" className="relative">
      {/* Glow sutil detrás de la card de Salud */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-mint-accent/[0.04] blur-[120px] pointer-events-none"
      />

      <SectionHeader
        eyebrow="Industrias"
        title="A quién servimos."
        description="De hospitales a campos de cultivo y salas de gobierno. Si el problema es real, Norte lo trabaja."
        align="left"
      />

      <Container size="wide" className="mt-16 md:mt-20 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6"
        >
          {/* Card destacada de Salud */}
          <motion.article
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
              },
            }}
            className={cn(
              "lg:col-span-5 relative overflow-hidden",
              "rounded-3xl p-8 md:p-10 lg:p-12 min-h-[420px]",
              "bg-gradient-to-br from-mint-accent/[0.08] via-navy-mid/60 to-electric-blue/[0.06]",
              "border border-mint-accent/20",
              "flex flex-col justify-between",
            )}
          >
            {/* Decoración: patrón de puntos en esquina */}
            <div
              aria-hidden
              className="absolute -right-12 -top-12 size-48 bg-dot-grid opacity-30 rounded-full blur-sm"
            />

            <div className="relative">
              {PrimaryIcon && (
                <PrimaryIcon
                  className="size-12 text-mint-accent mb-6"
                  strokeWidth={1.5}
                  aria-hidden
                />
              )}

              <h3 className="font-display text-3xl md:text-4xl font-bold text-ice-white mb-4 leading-tight">
                {primaryIndustry.name}
              </h3>

              <p className="text-ice-white/75 text-base md:text-lg leading-relaxed text-pretty max-w-md">
                {primaryIndustry.description}
              </p>
            </div>

            <div className="relative mt-8">
              <div className="divider-brand opacity-40" />
              <p className="mt-4 text-xs text-ice-white/50 tracking-widest uppercase">
                Casos: expedientes electrónicos · sistemas de citas · facturación · interoperabilidad
              </p>
            </div>
          </motion.article>

          {/* Grid de industrias secundarias */}
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {secondaryIndustries.map((industry) => {
              const Icon = INDUSTRY_ICONS[industry.id as keyof typeof INDUSTRY_ICONS];

              return (
                <motion.article
                  key={industry.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
                    },
                  }}
                  className={cn(
                    "group relative rounded-2xl p-6",
                    "bg-navy-mid/30 border border-ice-white/[0.06]",
                    "hover:bg-navy-mid/50 hover:border-electric-blue/30",
                    "transition-all duration-300",
                  )}
                >
                  {Icon && (
                    <Icon
                      className="size-6 text-electric-blue/70 group-hover:text-electric-blue mb-4 transition-colors"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  )}

                  <h4 className="font-display text-base md:text-lg font-semibold text-ice-white leading-tight mb-2">
                    {industry.name}
                  </h4>

                  <p className="text-xs md:text-sm text-ice-white/55 leading-relaxed">
                    {industry.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
