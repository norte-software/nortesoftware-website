"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * StatBar — instrumento de prueba bajo el hero (brief §4.1, §5.6).
 *
 * Números reales en mono, separados por hairlines, sin un solo adjetivo:
 * el dato carga el peso. "Demostrar, no proclamar" en su forma más seca.
 * Panel recesado (green-900) para leerse como tablero de instrumentos,
 * no como banner de marketing.
 */
const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] as const },
  },
};

export function StatBar() {
  return (
    <section
      aria-label="Norte Software en números"
      className="border-y border-hairline bg-green-900/40"
    >
      <Container size="wide">
        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={reveal}
              className={cn(
                "flex min-w-0 flex-col gap-1.5 px-4 py-7 sm:px-6 lg:px-8 lg:py-8",
                "border-hairline",
                // Móvil 2×2: filete vertical en la col. 2, horizontal en la fila 2.
                "[&:nth-child(2n)]:border-l",
                "[&:nth-child(n+3)]:border-t",
                // Desktop: una sola fila → quitar filete superior, filete a la izq.
                "lg:[&:nth-child(n+3)]:border-t-0",
                "lg:[&:not(:first-child)]:border-l",
              )}
            >
              <dd className="font-mono text-[0.9375rem] font-medium leading-tight tracking-tight text-cream sm:text-lg lg:text-xl">
                {stat.value}
              </dd>
              <dt className="font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-slate">
                {stat.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
