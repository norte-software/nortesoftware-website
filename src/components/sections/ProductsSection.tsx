"use client";

import type { ComponentType, CSSProperties, SVGProps } from "react";
import { motion } from "motion/react";
import { ShieldAlert, Sprout, Flame, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PRODUCT_ICONS = {
  secagent: ShieldAlert,
  nortecampo: Sprout,
  norteprevent: Flame,
} as const;

type ProductIconKey = keyof typeof PRODUCT_ICONS;

/** Dato corto y concreto por producto (sub-línea). */
const PRODUCT_SPEC: Record<string, string> = {
  secagent: "Detección de amenazas con IA · 24/7",
  nortecampo: "Monitoreo satelital · NDVI y clima",
};

/** Verbo + destino para el CTA. */
const PRODUCT_CTA: Record<string, string> = {
  secagent: "Abrir SecAgent",
  nortecampo: "Abrir NorteCampo",
};

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
};

const isProductIconKey = (id: string): id is ProductIconKey =>
  id in PRODUCT_ICONS;

const getIcon = (
  id: string,
): ComponentType<SVGProps<SVGSVGElement>> | null =>
  isProductIconKey(id) ? PRODUCT_ICONS[id] : null;

/**
 * Productos — fichas de catálogo. Panel verde con bisel superior, estado con
 * punto de señal (sin "LIVE" de terminal), nombre display, dato concreto y
 * CTA verbo+destino. Productos reales = prueba de capacidad, no promesas.
 */
export function ProductsSection() {
  const comingSoonProducts = PRODUCTS.filter((product) => !product.available);

  return (
    <Section anchor="productos">
      <SectionHeader
        eyebrow="Nuestros productos"
        title={
          <>
            No solo construimos para clientes.{" "}
            <Accent>También para México</Accent>.
          </>
        }
        description="Productos propios de Norte, en producción hoy. La mejor prueba de lo que podemos construir para ti."
      />

      <Container size="wide" className="mt-14 md:mt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col gap-5 md:gap-6"
        >
          {PRODUCTS.map((product) => {
            if (!product.available) return null;

            const Icon = getIcon(product.id);
            const accent = product.badgeColor ?? "var(--color-gold)";
            const spec = PRODUCT_SPEC[product.id];
            const cta = PRODUCT_CTA[product.id] ?? product.cta;

            return (
              <motion.a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${cta} (abre en una pestaña nueva)`}
                variants={reveal}
                style={{ "--card-accent": accent } as CSSProperties}
                className={cn(
                  "group relative grid gap-8 rounded-2xl border border-hairline bg-green-panel p-8",
                  "border-t-[1px] [border-top-color:var(--color-hairline-strong)]",
                  "transition-colors duration-300 hover:bg-green-700 hover:border-[color-mix(in_oklab,var(--card-accent)_45%,var(--color-hairline-strong))]",
                  "md:grid-cols-12 md:gap-10 md:p-10",
                )}
              >
                {/* Identidad + estado */}
                <div className="md:col-span-5">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full bg-[var(--card-accent)]"
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/55">
                      {product.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 flex items-start gap-4 font-display text-3xl font-bold leading-[0.98] tracking-[-0.02em] text-cream md:text-4xl">
                    {product.name}
                    {Icon && (
                      <Icon
                        className="mt-1 size-6 shrink-0 text-[var(--card-accent)]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    )}
                  </h3>

                  {spec && (
                    <p className="mt-4 text-sm text-cream/55">{spec}</p>
                  )}
                </div>

                {/* Descripción + CTA */}
                <div className="flex flex-col justify-between gap-8 md:col-span-7 md:pt-1">
                  <p className="max-w-2xl text-cream/72 leading-relaxed text-pretty">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                      {cta}
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                    <span
                      aria-hidden
                      className="block h-px w-12 bg-hairline-strong transition-all duration-300 group-hover:w-24 group-hover:bg-[var(--card-accent)]"
                    />
                  </div>
                </div>
              </motion.a>
            );
          })}

          {comingSoonProducts.length > 0 &&
            PRODUCTS.map((product) => {
              if (product.available) return null;

              const Icon = getIcon(product.id);

              return (
                <motion.div
                  key={product.id}
                  variants={reveal}
                  className={cn(
                    "grid gap-6 rounded-2xl border border-hairline bg-green-panel/40 p-8",
                    "md:grid-cols-12 md:gap-10 md:p-10",
                  )}
                >
                  <div className="md:col-span-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/40">
                      Próximamente
                    </span>

                    <h3 className="mt-6 flex items-start gap-4 font-display text-2xl font-bold leading-[1] tracking-[-0.02em] text-cream/45 md:text-3xl">
                      {product.name}
                      {Icon && (
                        <Icon
                          className="mt-1 size-5 shrink-0 text-cream/40"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      )}
                    </h3>
                  </div>

                  <div className="md:col-span-7 md:pt-1">
                    <p className="max-w-2xl text-cream/45 leading-relaxed text-pretty">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </Container>
    </Section>
  );
}
