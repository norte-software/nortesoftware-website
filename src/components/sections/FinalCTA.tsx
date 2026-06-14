"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Accent";
import { Isotipo } from "@/components/ui/Isotipo";
import { CONTACT_CTA, WHATSAPP_URL, SITE } from "@/lib/constants";

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
} as const;

/**
 * Cierre — sobre la capa más hundida (green-900). Frase descomunal con una
 * palabra-acento en oro, el isotipo en filigrana detrás, un CTA y un colofón
 * limpio. Energía de cierre, sin adornos de telemetría.
 */
export function FinalCTA() {
  return (
    <Section anchor="contacto" padding="loose">
      <Container size="wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="relative overflow-hidden rounded-2xl border border-hairline border-t-hairline-strong bg-green-900 px-6 py-20 md:px-16 md:py-28"
        >
          <Isotipo className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[clamp(20rem,55vw,40rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.div
              variants={reveal}
              className="flex items-center justify-center gap-3"
            >
              <span aria-hidden className="h-px w-8 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Empecemos
              </span>
            </motion.div>

            <motion.h2
              variants={reveal}
              className="mt-8 font-display font-bold leading-[1.02] text-balance text-cream text-[clamp(2.25rem,6vw,4rem)] tracking-[-0.025em]"
            >
              Construyamos algo que <Accent>resista</Accent>.
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mx-auto mt-8 max-w-xl text-pretty leading-relaxed text-cream/72 md:text-lg"
            >
              Cuéntanos del proyecto. Respondemos en menos de 48 horas con
              alcance, tiempos y costo — sin rodeos.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-12 flex flex-col items-center justify-center gap-x-8 gap-y-5 sm:flex-row"
            >
              <Button href={CONTACT_CTA.href} variant="primary" size="lg">
                {CONTACT_CTA.label}
                <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
              </Button>

              <Button
                href={WHATSAPP_URL}
                external
                variant="ghost"
                size="lg"
                aria-label={`Escribir por WhatsApp al ${SITE.phone.display}`}
              >
                Escribir por WhatsApp
              </Button>
            </motion.div>
          </div>

          <motion.p
            variants={reveal}
            className="relative mx-auto mt-16 max-w-3xl border-t border-hairline pt-8 text-center text-sm text-cream/45"
          >
            Construido en Chiapas. Compilado para México y LATAM.
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}
