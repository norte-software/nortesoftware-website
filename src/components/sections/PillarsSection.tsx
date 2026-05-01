"use client";

import { motion } from "motion/react";
import {
  Compass,
  ShieldCheck,
  Eye,
  Infinity as InfinityIcon,
  Crosshair,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { PILLARS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Mapa de pilar.id → ícono.
 * Los íconos refuerzan el concepto de cada pilar:
 *   - Compass: dirección clara
 *   - ShieldCheck: seguridad
 *   - Eye: transparencia
 *   - Infinity: continuidad
 *   - Crosshair: especialización
 */
const PILLAR_ICONS = {
  direccion: Compass,
  seguridad: ShieldCheck,
  transparencia: Eye,
  continuidad: InfinityIcon,
  especializacion: Crosshair,
} as const;

/**
 * Sección "Cómo trabajamos" / pilares de la marca.
 *
 * Composición:
 *   header asimétrico izquierda
 *   ↓
 *   grid 5 cards (md: 5 cols, mobile: 1 col)
 *
 * Cada card:
 *   - Número grande "01" en electric-blue (firma editorial)
 *   - Ícono lucide en mint accent
 *   - Título display
 *   - Descripción
 *
 * Hover: sutil lift + glow.
 */
export function PillarsSection() {
  return (
    <Section anchor="nosotros" className="bg-gradient-to-b from-navy-deep via-navy-mid/30 to-navy-deep">
      <SectionHeader
        eyebrow="Cómo trabajamos"
        title={
          <>
            Cinco pilares
            <br />
            <span className="text-gradient-brand">que nos definen.</span>
          </>
        }
        description="No prometemos lo que no podemos cumplir. Estos son los principios con los que arrancamos cada proyecto."
        align="left"
      />

      <Container size="wide" className="mt-16 md:mt-20">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ice-white/[0.04] rounded-3xl overflow-hidden border border-ice-white/[0.04]"
        >
          {PILLARS.map((pillar, i) => {
            const Icon = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS];
            const number = String(i + 1).padStart(2, "0");

            return (
              <motion.li
                key={pillar.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
                  },
                }}
                className={cn(
                  "group relative bg-navy-deep p-8 md:p-7 lg:p-8",
                  "transition-colors duration-300",
                  "hover:bg-navy-mid/40",
                )}
              >
                {/* Glow al hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-electric-blue/0 via-electric-blue/0 to-mint-accent/0 group-hover:from-electric-blue/[0.04] group-hover:to-mint-accent/[0.04] transition-all duration-500 pointer-events-none"
                />

                <div className="relative">
                  {/* Número editorial */}
                  <span className="font-display text-xs text-electric-blue/70 tracking-[0.2em]">
                    {number}
                  </span>

                  {/* Ícono */}
                  {Icon && (
                    <div className="mt-6 mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-mint-accent/10 border border-mint-accent/20 group-hover:bg-mint-accent/15 group-hover:border-mint-accent/40 transition-all duration-300">
                      <Icon
                        className="size-5 text-mint-accent"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </div>
                  )}

                  {/* Título */}
                  <h3 className="font-display text-xl md:text-lg lg:text-xl font-semibold text-ice-white mb-3 leading-tight">
                    {pillar.name}
                  </h3>

                  {/* Descripción */}
                  <p className="text-sm text-ice-white/60 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
