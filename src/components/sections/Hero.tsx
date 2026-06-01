"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE, PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Lazy load del globo: cobe usa WebGL → solo carga en cliente
// Sin SSR para evitar errores de "document is not defined"
const Globe = dynamic(
  () => import("@/components/visuals/Globe").then((m) => m.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square w-full bg-electric-blue/5 rounded-full animate-pulse" />
    ),
  },
);

/**
 * Hero del home.
 *
 * Composición:
 *
 *   HEADLINE GRANDE                    [GLOBO]
 *   con segunda línea en gradiente     terráqueo
 *
 *   [subtítulo]
 *
 *   [CTA primary]
 *
 *                  [scroll hint]
 *
 * Asimetría: el globo ocupa la mitad derecha en desktop, pero en mobile
 * va arriba del texto (orden visual ajustado con flex-col-reverse).
 *
 * Animaciones: stagger en cascada al cargar la página.
 * El globo se muestra después con fade in (delay 200ms tras montar).
 */
export function Hero() {
  return (
    <section
      className="relative min-h-svh flex flex-col justify-center overflow-hidden pt-20 md:pt-24 pb-16"
      aria-labelledby="hero-title"
    >
      {/* Glow ambiental atrás del globo */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-electric-blue/[0.07] blur-[120px] pointer-events-none"
      />

      {/* Patrón de puntos sutil sobre el fondo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Texto */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
            >
              <motion.h1
                id="hero-title"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold text-balance leading-[1.02] mb-6 md:mb-8"
              >
                El norte de tu
                <br />
                <span className="text-gradient-brand">
                  tecnología.
                </span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="text-ice-white/70 text-base md:text-lg lg:text-xl text-pretty max-w-xl mb-10 md:mb-12"
              >
                {SITE.taglineSecondary}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="flex flex-col sm:flex-row gap-4 sm:items-center"
              >
                <Button href={PRIMARY_CTA.href} variant="primary" size="lg">
                  {PRIMARY_CTA.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Globo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className={cn(
              "lg:col-span-5 order-1 lg:order-2",
              "max-w-md mx-auto lg:max-w-none w-full",
            )}
          >
            <Globe />
          </motion.div>
        </div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-ice-white/40 tracking-widest uppercase">
          Conoce más
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4 text-ice-white/40" aria-hidden />
        </motion.div>
      </motion.div>
    </section>
  );
}
