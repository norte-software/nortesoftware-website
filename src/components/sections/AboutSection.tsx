"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { SITE } from "@/lib/constants";

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
};

/**
 * Nosotros — el fundador como fortaleza (brief §4.5). El portafolio es el
 * equipo: quien construye los productos también los rompe. Conserva el beat
 * de identidad ("el norte no es un lugar, es una dirección") y los Altos de
 * Chiapas en duotono. Sin inflar el tamaño del equipo.
 */
export function AboutSection() {
  return (
    <Section anchor="nosotros">
      <Container size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Altos de Chiapas — duotono verde */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline">
              <Image
                src="/images/chiapas-highlands.jpg"
                alt="Altos de Chiapas: niebla sobre la sierra"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover [filter:saturate(0.72)]"
              />
              <div aria-hidden className="absolute inset-0 bg-green-deep mix-blend-color" />
              <div aria-hidden className="absolute inset-0 bg-green-900/35" />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/40 to-transparent"
              />
              <span className="absolute bottom-5 left-5 font-mono text-[11px] tracking-tight text-cream/55">
                {SITE.coordinates.full}
              </span>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="lg:col-span-7"
          >
            <motion.div variants={reveal} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-gold" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold">
                Nosotros
              </span>
            </motion.div>

            <motion.h2
              variants={reveal}
              className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em] text-balance"
            >
              Fundado por alguien que <Accent>construye y rompe</Accent>.
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75 text-pretty"
            >
              Ingeniero full-stack e investigador de seguridad, con base en
              ingeniería química y biotecnología. Construye —a mano— los
              productos que ves arriba, y los rompe antes que nadie. Desde San
              Cristóbal de las Casas, con estándar global.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-10 flex flex-col gap-4 border-t border-hairline pt-8"
            >
              <p className="font-display text-xl font-semibold text-cream md:text-2xl">
                El portafolio es el equipo.
              </p>
              <p className="leading-relaxed text-cream/55 text-pretty">
                El norte no es un lugar. Es una dirección.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
