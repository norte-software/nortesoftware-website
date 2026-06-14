"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ShieldCheck, Eye, Infinity as InfinityIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { PILLARS } from "@/lib/constants";

const PILLAR_ICONS = {
  seguridad: ShieldCheck,
  transparencia: Eye,
  continuidad: InfinityIcon,
} as const;

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
};

/**
 * Cómo trabajamos — split editorial: una imagen del equipo (duotono verde,
 * calidez humana) junto a los tres pilares como índice aireado.
 */
export function PillarsSection() {
  return (
    <Section anchor="nosotros">
      <SectionHeader
        eyebrow="Cómo trabajamos"
        title={
          <>
            Tres pilares que nos <Accent>definen</Accent>.
          </>
        }
      />

      <Container size="wide" className="mt-14 md:mt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Imagen del equipo */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline lg:sticky lg:top-28">
              <Image
                src="/images/team-work.jpg"
                alt="Equipo de Norte Software trabajando"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover [filter:saturate(0.68)]"
              />
              <div aria-hidden className="absolute inset-0 bg-green-deep mix-blend-color" />
              <div aria-hidden className="absolute inset-0 bg-green-900/35" />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/20 to-transparent"
              />
            </div>
          </motion.div>

          {/* Pilares */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="border-b border-hairline lg:col-span-7"
          >
            {PILLARS.map((pillar, i) => {
              const Icon = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS];
              return (
                <motion.div
                  key={pillar.id}
                  variants={reveal}
                  className="group border-t border-hairline py-8 md:py-10"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-base font-semibold text-slate/50 transition-colors duration-300 group-hover:text-gold">
                      0{i + 1}
                    </span>
                    {Icon && (
                      <Icon
                        className="size-5 text-gold"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    )}
                    <h3 className="font-display text-2xl font-semibold leading-tight text-cream md:text-[1.75rem]">
                      {pillar.name}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-[52ch] text-cream/72 leading-relaxed text-pretty">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
