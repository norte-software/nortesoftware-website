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
      className="relative flex min-h-[calc(84svh-5rem)] flex-col justify-center overflow-hidden py-16 md:py-20"
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
            className="order-1 lg:col-span-7"
          >
            <motion.div variants={reveal} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 shrink-0 bg-gold" />
              <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-gold sm:text-xs sm:tracking-[0.2em]">
                Software · Seguridad · Desde el Sur
              </span>
            </motion.div>

            <motion.h1
              id="hero-title"
              variants={reveal}
              className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance"
            >
              El software que mueve a tu empresa.
              <br />
              Construido para <Accent>resistir</Accent>.
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-8 max-w-[50ch] text-lg text-cream/72 leading-relaxed text-pretty md:text-xl"
            >
              Software a la medida y seguridad ofensiva, bajo un mismo equipo
              —del diseño al pentest. En México y el mundo, desde San Cristóbal
              de las Casas.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Button href="/#productos" variant="primary" size="lg">
                Ver lo que construimos
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href={CONTACT_CTA.href} variant="secondary" size="lg">
                {CONTACT_CTA.label}
              </Button>
            </motion.div>
          </motion.div>

          {/* Brújula */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative order-2 mx-auto w-full max-w-[280px] lg:col-span-5 lg:max-w-none"
          >
            <Compass />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
