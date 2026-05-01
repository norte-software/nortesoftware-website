"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Texto pequeño arriba del título (en azul eléctrico, uppercase, tracking) */
  eyebrow: string;
  /** Título principal de la sección */
  title: string | React.ReactNode;
  /** Descripción opcional debajo */
  description?: string;
  /** Alineación: "left" para asimétrico (mockups), "center" para clásico */
  align?: "left" | "center";
  className?: string;
}

/**
 * Encabezado consistente para cada sección.
 *
 * Anima al entrar al viewport con stagger:
 *   eyebrow → title → description
 *
 * Respeta prefers-reduced-motion gracias a configuración global
 * de Motion + nuestro CSS reset.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
  };

  return (
    <Container size="default">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className={cn(
          "flex flex-col max-w-2xl",
          alignClasses[align],
          className,
        )}
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="font-display text-electric-blue text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6"
        >
          {eyebrow}
        </motion.p>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-balance leading-[1.05]"
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="mt-6 md:mt-8 text-ice-white/65 text-base md:text-lg text-pretty max-w-xl"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </Container>
  );
}
