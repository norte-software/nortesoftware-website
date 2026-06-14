"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";

/**
 * Banda "Origen" — ancla de identidad y confianza.
 *
 * Los altos de Chiapas en duotono verde (mix-blend para que la foto pegue
 * con la paleta) + manifiesto de marca. Reencuadra "Norte": no es geografía
 * (están en el sur), es dirección. Foto real = señal de confianza.
 */
export function OriginBand() {
  return (
    <section className="py-16 md:py-24">
      <Container size="wide">
        <div className="relative flex min-h-[440px] items-end overflow-hidden rounded-2xl border border-hairline md:min-h-[560px]">
          {/* Imagen — altos de Chiapas */}
          <Image
            src="/images/chiapas-highlands.jpg"
            alt="Altos de Chiapas: niebla sobre la sierra"
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover [filter:saturate(0.72)]"
          />
          {/* Duotono verde + profundidad */}
          <div aria-hidden className="absolute inset-0 bg-green-deep mix-blend-color" />
          <div aria-hidden className="absolute inset-0 bg-green-900/35" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/55 to-transparent"
          />

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 w-full max-w-2xl p-8 md:p-14"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Desde Chiapas
              </span>
            </div>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.0] tracking-[-0.025em] text-cream text-balance">
              El norte no es un lugar.
              <br />
              Es una <Accent>dirección</Accent>.
            </h2>
            <p className="mt-6 max-w-md text-cream/80 leading-relaxed text-pretty">
              Operamos desde San Cristóbal de las Casas para todo México y LATAM.
              Software construido en el sur, con estándar global.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
