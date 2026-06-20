"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
};

/**
 * PRUEBA — el corazón del sitio (brief §4.2). "Demostrar, no proclamar":
 * tres productos propios, vivos hoy, con captura real en marco de browser.
 * Outcome en humano (sin jerga), estado ● En vivo, dominio en mono y un
 * único "Abrir →". Tarjetas alternadas, hover con lift + borde oro.
 */
export function ProductsSection() {
  return (
    <Section anchor="productos">
      <SectionHeader
        eyebrow="Prueba"
        title={
          <>
            No lo decimos. <Accent>Está en producción</Accent>.
          </>
        }
        description="Productos propios de Norte, vivos hoy. La mejor muestra de lo que construimos para alguien más."
      />

      <Container size="wide" className="mt-14 md:mt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="flex flex-col gap-6 md:gap-8"
        >
          {PRODUCTS.map((product, i) => {
            if (!product.available) return null;
            const reversed = i % 2 === 1;

            return (
              <motion.a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${product.name} en ${product.domain} (pestaña nueva)`}
                variants={reveal}
                className={cn(
                  "group grid items-center gap-7 rounded-2xl border border-hairline bg-green-panel/50 p-5 md:gap-12 md:p-6 lg:grid-cols-12",
                  "border-t-[1px] [border-top-color:var(--color-hairline-strong)]",
                  "transition-[transform,border-color,background-color] duration-300",
                  "hover:-translate-y-1 hover:border-gold/45 hover:bg-green-panel",
                )}
              >
                {/* Captura en marco de browser */}
                <div
                  className={cn(
                    "lg:col-span-7",
                    reversed && "lg:order-2",
                  )}
                >
                  <div className="overflow-hidden rounded-xl border border-hairline bg-green-900 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.85)]">
                    <div className="flex items-center gap-3 border-b border-hairline px-4 py-2.5">
                      <span aria-hidden className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-cream/15" />
                        <span className="size-2 rounded-full bg-cream/15" />
                        <span className="size-2 rounded-full bg-cream/15" />
                      </span>
                      <span className="inline-flex max-w-full items-center truncate rounded-md bg-green-deep px-2.5 py-1 font-mono text-[11px] tracking-tight text-cream/55">
                        {product.domain}
                      </span>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 58vw, 92vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>

                {/* Identidad + outcome */}
                <div
                  className={cn(
                    "lg:col-span-5",
                    reversed && "lg:order-1",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="size-2 rounded-full bg-[#5FB85B] shadow-[0_0_0_3px_rgba(95,184,91,0.16)]"
                    />
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-cream/55">
                      {product.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-3xl font-bold leading-[0.98] tracking-[-0.02em] text-cream md:text-4xl">
                    {product.name}
                  </h3>

                  <p className="mt-4 max-w-md text-lg text-cream/72 leading-relaxed text-pretty">
                    {product.description}
                  </p>

                  <div className="mt-7 flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                      {product.cta}
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="font-mono text-xs text-cream/40">
                      {product.domain}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
