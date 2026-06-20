"use client";

import { motion } from "motion/react";
import { HeartPulse, Landmark } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { INDUSTRIES } from "@/lib/constants";

const INDUSTRY_ICONS = {
  salud: HeartPulse,
  fintech: Landmark,
} as const;

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] as const },
  },
};

/**
 * Industrias — contexto, no menú (brief §4.6). Una línea + dos sectores
 * donde el software es crítico. Sin la rejilla de 8 (que decía "todo" =
 * decía nada).
 */
export function IndustriesSection() {
  return (
    <Section anchor="industrias" padding="tight">
      <SectionHeader
        eyebrow="Industrias"
        title={
          <>
            Donde el software es <Accent>crítico</Accent>.
          </>
        }
        description="Salud privada y fintech: sistemas donde un dato filtrado o un sistema caído no son opción."
      />

      <Container size="wide" className="mt-12 md:mt-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-5 sm:grid-cols-2 md:gap-6"
        >
          {INDUSTRIES.map((industry) => {
            const Icon =
              INDUSTRY_ICONS[industry.id as keyof typeof INDUSTRY_ICONS];
            return (
              <motion.article
                key={industry.id}
                variants={reveal}
                className="rounded-2xl border border-hairline bg-green-panel/40 p-7 transition-colors duration-300 hover:border-gold/30 md:p-8"
              >
                {Icon && (
                  <Icon className="size-6 text-gold" strokeWidth={1.5} aria-hidden />
                )}
                <h3 className="mt-5 font-display text-xl font-semibold leading-tight text-cream md:text-2xl">
                  {industry.name}
                </h3>
                <p className="mt-3 leading-relaxed text-cream/65 text-pretty">
                  {industry.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
