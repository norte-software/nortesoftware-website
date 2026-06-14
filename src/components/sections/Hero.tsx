"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { Compass } from "@/components/visuals/Compass";
import { CONTACT_CTA } from "@/lib/constants";

/**
 * Hero — sobrio e institucional, paleta "Latón del Norte".
 *
 * Tipografía protagonista, etiqueta limpia en oro, una promesa específica
 * (el diferenciador real de Norte: construir y auditar con el mismo equipo)
 * y la brújula de latón como pieza-firma. Sin folios de código ni
 * telemetría: serio, no "cyberpunk".
 */
const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden py-12 md:py-16"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grain opacity-70"
      />
      <Container size="wide" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Texto */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            <motion.div variants={reveal} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Software · Ciberseguridad · IA
              </span>
            </motion.div>

            <motion.h1
              id="hero-title"
              variants={reveal}
              className="mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.94] tracking-[-0.03em] text-balance"
            >
              El norte de tu
              <br />
              <Accent>tecnología</Accent>
              <span className="text-gold">.</span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-8 max-w-[46ch] text-lg text-cream/72 leading-relaxed text-pretty md:text-xl"
            >
              Construimos el software que mueve a tu empresa y lo ponemos a
              prueba como lo haría un atacante. Un solo equipo para todo el
              ciclo —del diseño al pentest—, en México y el mundo.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Button href={CONTACT_CTA.href} variant="primary" size="lg">
                {CONTACT_CTA.label}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/servicios" variant="ghost" size="lg">
                Ver servicios
              </Button>
            </motion.div>
          </motion.div>

          {/* Brújula */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative order-1 mx-auto w-full max-w-[280px] lg:order-2 lg:col-span-5 lg:max-w-none"
          >
            <Compass />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
