"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Etiqueta corta (uppercase, oro). Seria, sin notación de código. */
  eyebrow: string;
  /** Título principal (usa <Accent> para la palabra-acento). */
  title: string | React.ReactNode;
  /** Descripción opcional debajo. */
  description?: string;
  className?: string;
}

/**
 * Encabezado de sección — sobrio e institucional.
 *
 * Etiqueta limpia en oro con un filete corto + título display. Sin folios
 * de código, sin coordenadas: serio, no "cyberpunk". Reveal por opacidad.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <Container size="wide">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className={cn("max-w-3xl", className)}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="flex items-center gap-3"
        >
          <span aria-hidden className="h-px w-8 bg-gold" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="mt-6 font-display text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.025em] text-balance"
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="mt-7 max-w-xl text-cream/72 text-base md:text-lg leading-relaxed text-pretty"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </Container>
  );
}
