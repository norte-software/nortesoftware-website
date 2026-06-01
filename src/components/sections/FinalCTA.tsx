"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  CONTACT_CTA,
  WHATSAPP_URL,
  SITE,
} from "@/lib/constants";

/**
 * CTA final antes del footer.
 *
 * Composición:
 *   bloque grande con borde gradiente
 *   ↓
 *   eyebrow + headline grande + subtítulo
 *   ↓
 *   2 acciones: contacto + WhatsApp
 *
 * Esta es la última oportunidad antes del footer para convertir
 * un visitante en lead. El diseño es deliberadamente diferente
 * al hero — aquí la energía es de cierre, no de bienvenida.
 */
export function FinalCTA() {
  return (
    <Section padding="loose">
      <Container size="default">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="relative overflow-hidden rounded-3xl border border-ice-white/[0.08] bg-gradient-to-br from-navy-mid/60 via-navy-deep to-navy-mid/40 px-8 py-16 md:p-20"
        >
          {/* Glow de fondo */}
          <div
            aria-hidden
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-electric-blue/[0.08] blur-[120px] pointer-events-none"
          />

          {/* Patrón de puntos */}
          <div
            aria-hidden
            className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none"
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <p className="font-display text-electric-blue text-xs md:text-sm tracking-[0.3em] uppercase mb-6">
              ¿Listo para empezar?
            </p>

            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-balance leading-[1.05] mb-6">
              Construyamos algo
              <br />
              <span className="text-gradient-brand">que resista.</span>
            </h2>

            <p className="text-ice-white/70 text-base md:text-lg text-pretty max-w-xl mx-auto mb-10 md:mb-12">
              Cuéntanos del proyecto. Te respondemos con claridad sobre
              alcance, tiempos y costos en menos de 48 horas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              <Button href={CONTACT_CTA.href} variant="primary" size="lg">
                {CONTACT_CTA.label}
                <ArrowRight className="size-4" aria-hidden />
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
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
