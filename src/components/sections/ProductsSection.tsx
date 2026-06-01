"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ShieldAlert,
  Sprout,
  Flame,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Mapa de íconos por producto.
 * secagent     → ShieldAlert (seguridad)
 * nortecampo   → Sprout      (agro)
 * norteprevent → Flame       (incendios / prevención)
 */
const PRODUCT_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  secagent: ShieldAlert,
  nortecampo: Sprout,
  norteprevent: Flame,
};

/**
 * Sección "Nuestros Productos".
 *
 * Layout:
 *   - Productos disponibles: cards destacadas ancho completo. El acento
 *     (badge con pulso + borde, ícono, CTA, línea decorativa) usa
 *     product.badgeColor, o norte-verde por defecto, vía CSS var --card-accent.
 *   - Productos próximamente: grid muted, sin link activo (vacío si no hay)
 *
 * Anchor: #productos (para nav link "Productos" → /#productos)
 */
export function ProductsSection() {
  // Productos disponibles que preceden al grupo "próximamente" en el array
  // (van primero por convención). Sirve para reiniciar el stagger del grid en 0.
  const availableCount = PRODUCTS.filter((product) => product.available).length;

  return (
    <Section anchor="productos">
      <SectionHeader
        eyebrow="Nuestros Productos"
        title={
          <>
            Software construido por Norte,
            <br />
            <span className="text-gradient-brand">disponible ahora.</span>
          </>
        }
        description="No solo construimos para clientes. También construimos para México."
        align="left"
      />

      <Container size="wide" className="mt-16 md:mt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-col gap-4 md:gap-6"
        >
          {/* ── Productos disponibles (featured) ── */}
          {PRODUCTS.map((product) => {
            if (!product.available) return null;

            // TypeScript: aquí product es AvailableProduct → .url, .cta, .badgeColor
            const Icon = PRODUCT_ICONS[product.id];
            // Acento de la card: badgeColor del producto o norte-verde por defecto.
            // Se expone como CSS var para usarlo en badge y chrome (incl. hover/focus).
            const accent = product.badgeColor ?? "var(--color-norte-verde)";

            return (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
                  },
                }}
              >
                <Link
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--card-accent": accent } as React.CSSProperties}
                  className={cn(
                    "group flex flex-col md:flex-row md:items-center gap-8",
                    "p-8 md:p-10 rounded-3xl relative overflow-hidden",
                    "bg-navy-mid/40 border border-[var(--card-accent)]/30",
                    "hover:bg-navy-mid/60 hover:border-[var(--card-accent)]/60",
                    "transition-all duration-500 ease-out",
                    "hover:shadow-[0_24px_64px_-16px_color-mix(in_oklab,var(--card-accent)_20%,transparent)]",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[var(--card-accent)] focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-navy-deep",
                  )}
                >
                  {/* Línea decorativa superior */}
                  <div
                    aria-hidden
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--card-accent)]/70 to-transparent"
                  />

                  {/* Contenido principal */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      {Icon && (
                        <div className="size-12 rounded-xl bg-[var(--card-accent)]/10 border border-[var(--card-accent)]/25 flex items-center justify-center">
                          <Icon
                            className="size-5 text-[var(--card-accent)]"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </div>
                      )}
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[var(--card-accent)]/15 text-[var(--card-accent)] border border-[var(--card-accent)]/25">
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-[var(--card-accent)] animate-pulse"
                        />
                        {product.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl md:text-4xl font-bold text-ice-white mb-3">
                      {product.name}
                    </h3>
                    <p className="text-ice-white/65 leading-relaxed text-pretty max-w-2xl">
                      {product.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="shrink-0 flex items-center gap-2 text-sm font-semibold text-[var(--card-accent)] group-hover:gap-3 transition-all duration-300 whitespace-nowrap">
                    {product.cta}
                    <ArrowUpRight
                      className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                      aria-hidden
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* ── Productos próximamente (ancho completo, igual que disponibles) ── */}
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {PRODUCTS.map((product, i) => {
              if (product.available) return null;

              // TypeScript: aquí product es ComingSoonProduct → sin .url ni .cta
              const Icon = PRODUCT_ICONS[product.id];
              const comingSoonIndex = i - availableCount; // offset por los disponibles

              return (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.19, 1, 0.22, 1],
                        delay: Math.max(0, comingSoonIndex) * 0.08,
                      },
                    },
                  }}
                  className={cn(
                    "p-8 md:p-10 rounded-3xl",
                    "bg-navy-mid/20 border border-ice-white/[0.06]",
                  )}
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    {Icon && (
                      <div className="size-11 rounded-xl bg-ice-white/[0.04] border border-ice-white/[0.08] flex items-center justify-center">
                        <Icon
                          className="size-5 text-ice-white/25"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-ice-white/[0.04] text-ice-white/35 border border-ice-white/[0.08]">
                      <Clock className="size-3" aria-hidden />
                      {product.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-ice-white/45 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-ice-white/30 text-sm leading-relaxed text-pretty max-w-2xl">
                    {product.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
