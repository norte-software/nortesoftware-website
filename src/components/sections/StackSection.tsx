"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { TECH_STACK } from "@/lib/constants";

/**
 * Sección "Stack" / Tecnologías que dominamos.
 *
 * Composición simple: header + grid de pills.
 *
 * Decisión: en lugar de íconos por tecnología (que requieren librería
 * pesada o SVG por cada uno), usamos pills tipográficos consistentes.
 * Es más limpio, escala bien si añadimos tecnologías, y no compite
 * con el énfasis tipográfico del resto del sitio.
 *
 * Las pills aparecen con stagger sutil al entrar al viewport, con un
 * patrón de "scattered" (no ordenado), que da sensación de profundidad.
 */
export function StackSection() {
  return (
    <Section padding="tight">
      <SectionHeader
        eyebrow="Lo que usamos"
        title={
          <>
            Stack moderno,
            <br />
            <span className="text-gradient-brand">decisiones honestas.</span>
          </>
        }
        description="Elegimos herramientas por sus méritos, no por moda. Estas son algunas de las tecnologías con las que trabajamos diariamente."
        align="left"
      />

      <Container size="wide" className="mt-12 md:mt-16">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } },
          }}
          className="flex flex-wrap gap-3 md:gap-4"
        >
          {TECH_STACK.map((tech) => (
            <motion.li
              key={tech}
              variants={{
                hidden: { opacity: 0, y: 12, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
                },
              }}
              className="px-5 py-2.5 rounded-full bg-ice-white/[0.04] border border-ice-white/10 text-sm md:text-base font-medium text-ice-white/85 hover:bg-electric-blue/10 hover:border-electric-blue/40 hover:text-ice-white transition-colors duration-300 cursor-default"
            >
              {tech}
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
