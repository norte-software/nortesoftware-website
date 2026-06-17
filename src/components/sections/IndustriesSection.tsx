"use client";

import { motion } from "motion/react";
import {
  Heart,
  Truck,
  Wallet,
  ShoppingBag,
  GraduationCap,
  Scale,
  Factory,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { INDUSTRIES } from "@/lib/constants";

const INDUSTRY_ICONS = {
  salud: Heart,
  logistica: Truck,
  fintech: Wallet,
  retail: ShoppingBag,
  educacion: GraduationCap,
  legal: Scale,
  manufactura: Factory,
  otros: Sparkles,
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
 * Industrias — matriz sobria (4×2). Cobertura amplia: la densidad ordenada
 * comunica alcance. Sin destacar una sola industria.
 */
export function IndustriesSection() {
  return (
    <Section anchor="industrias">
      <SectionHeader
        eyebrow="Industrias"
        title={
          <>
            A quién <Accent>servimos</Accent>.
          </>
        }
        description="De salud y fintech a logística, retail, educación y gobierno. Trabajamos donde el software es crítico, en cualquier industria."
      />

      <Container size="wide" className="mt-14 md:mt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:grid-cols-4"
        >
          {INDUSTRIES.map((industry, i) => {
            const Icon =
              INDUSTRY_ICONS[industry.id as keyof typeof INDUSTRY_ICONS];
            return (
              <motion.article
                key={industry.id}
                variants={reveal}
                className="group relative flex flex-col bg-green-deep p-6 transition-colors duration-300 hover:bg-green-700 md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-slate">
                    0{i + 1}
                  </span>
                  {Icon && (
                    <Icon
                      className="size-5 text-gold"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  )}
                </div>
                <h3 className="mt-6 font-display text-base font-semibold leading-tight text-cream md:text-lg">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm text-cream/60 leading-relaxed text-pretty">
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
