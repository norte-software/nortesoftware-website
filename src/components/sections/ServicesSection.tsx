"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ShieldAlert, Code2, Bot, Compass, ArrowUpRight } from "lucide-react";
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

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
};

/**
 * Servicios — desde la autoridad ya ganada por la prueba (brief §4.4).
 * Lista editorial en seco, NO menú: la seguridad es el hilo. Cuatro
 * disciplinas, sin verbos de catálogo ni name-drop como crédito.
 */
export function ServicesSection() {
  return (
    <Section anchor="servicios">
      <SectionHeader
        eyebrow="Servicios"
        title={
          <>
            Lo que construimos <Accent>para ti</Accent>.
          </>
        }
        description="Cuatro disciplinas, un solo equipo —y la seguridad como hilo en todas. Desde la dirección, no desde un menú."
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

            return (
              <motion.div key={service.id} variants={reveal}>
                <Link
                  href={`/servicios#${service.id}`}
                  className="group -mx-4 grid gap-5 border-t border-hairline px-4 py-9 transition-colors duration-300 hover:bg-green-700 focus-visible:bg-green-700 focus-visible:outline-none md:py-12 lg:grid-cols-12 lg:items-baseline lg:gap-10"
                >
                  <div className="flex items-center gap-4 lg:col-span-5">
                    <span className="font-mono text-sm font-medium text-slate/60 transition-colors duration-300 group-hover:text-gold">
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

                  <div className="lg:col-span-6">
                    <p className="max-w-[60ch] text-cream/72 leading-relaxed text-pretty">
                      {service.description}
                    </p>
                  </div>

                  <div className="hidden lg:col-span-1 lg:flex lg:justify-end">
                    <ArrowUpRight
                      className="size-5 text-slate/40 transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                      aria-hidden
                    />
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
