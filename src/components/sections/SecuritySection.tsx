"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
};

/**
 * Seguridad — quiet y honesto (brief §4.3). Construir endurecido porque
 * sabemos romper. Track record en UNA línea sobria, sin logos inflados ni
 * muestra de reporte (privados/NDA). SecAgent se menciona aquí, no como card.
 */
export function SecuritySection() {
  return (
    <Section anchor="seguridad">
      <SectionHeader
        eyebrow="Seguridad"
        title={
          <>
            Construimos como ingenieros.{" "}
            <Accent>Rompemos como atacantes.</Accent>
          </>
        }
      />

      <Container size="wide" className="mt-12 md:mt-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-10 lg:grid-cols-12 lg:gap-16"
        >
          <motion.p
            variants={reveal}
            className="text-lg leading-relaxed text-cream/80 text-pretty md:text-xl lg:col-span-7"
          >
            Hacemos pentesting. Por eso construimos distinto desde el inicio.
            Todo lo que entregamos, lo atacamos primero —con nuestro propio
            motor de detección, <span className="text-cream">SecAgent</span>,
            como parte del arsenal.
          </motion.p>

          <motion.div variants={reveal} className="lg:col-span-5">
            <div className="rounded-2xl border border-hairline border-t-hairline-strong bg-green-panel/40 p-7 md:p-8">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
                Track record
              </span>
              <p className="mt-4 leading-relaxed text-cream/70 text-pretty">
                Con reportes reconocidos en programas de divulgación responsable
                —Tesla, Odoo, Dstny— y contribuciones a herramientas de
                seguridad como Suricata.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
