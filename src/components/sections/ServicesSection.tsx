"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ShieldAlert, Code2, Bot, Compass, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { SERVICES } from "@/lib/constants";

const SERVICE_ICONS = {
  ciberseguridad: ShieldAlert,
  desarrollo: Code2,
  "ia-agentes": Bot,
  consultoria: Compass,
} as const;

const SERVICE_VERBS = {
  ciberseguridad: "Ver pentesting",
  desarrollo: "Ver desarrollo",
  "ia-agentes": "Ver IA aplicada",
  consultoria: "Ver consultoría",
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
 * Qué hacemos — lista editorial sobria de cuatro disciplinas.
 * Número + ícono + nombre a la izquierda, descripción al centro, verbo a la
 * derecha. Hover sutil (sube la fila). Sin notación de código ni mono.
 */
export function ServicesSection() {
  return (
    <Section anchor="servicios">
      <SectionHeader
        eyebrow="Qué hacemos"
        title={
          <>
            Cuatro disciplinas, <Accent>un mismo equipo</Accent>.
          </>
        }
        description="Diseño, construcción, seguridad y operación bajo un mismo techo. Sin saltar de proveedor en proveedor, sin perder contexto entre etapas."
      />

      <Container size="wide" className="mt-14 md:mt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="border-b border-hairline"
        >
          {SERVICES.map((service, i) => {
            const Icon =
              SERVICE_ICONS[service.id as keyof typeof SERVICE_ICONS];
            const verb =
              SERVICE_VERBS[service.id as keyof typeof SERVICE_VERBS];

            return (
              <motion.div key={service.id} variants={reveal}>
                <Link
                  href={`/servicios#${service.id}`}
                  className="group -mx-4 grid gap-5 border-t border-hairline px-4 py-9 transition-colors duration-300 hover:bg-green-700 focus-visible:bg-green-700 focus-visible:outline-none md:py-12 lg:grid-cols-12 lg:items-baseline lg:gap-10"
                >
                  <div className="flex items-center gap-4 lg:col-span-5">
                    <span className="font-display text-base font-semibold text-slate/50 transition-colors duration-300 group-hover:text-gold">
                      0{i + 1}
                    </span>
                    {Icon && (
                      <Icon
                        className="size-5 shrink-0 text-gold"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    )}
                    <h3 className="font-display text-2xl font-semibold leading-tight text-cream transition-transform duration-300 group-hover:translate-x-1 md:text-[1.75rem]">
                      {service.name}
                    </h3>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="max-w-[56ch] text-cream/72 leading-relaxed text-pretty">
                      {service.description}
                    </p>
                  </div>

                  <div className="lg:col-span-2 lg:justify-self-end lg:text-right">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                      {verb}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
