"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ShieldAlert,
  Sprout,
  Heart,
  ShoppingBag,
  Car,
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
 * clinica      → Heart       (salud)
 * comercio     → ShoppingBag (retail)
 * taxis        → Car         (transporte)
 * norteprevent → Flame       (incendios / prevención)
 */
const PRODUCT_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  secagent: ShieldAlert,
  nortecampo: Sprout,
  clinica: Heart,
  comercio: ShoppingBag,
  taxis: Car,
  norteprevent: Flame,
};

/**
 * Sección "Nuestros Productos".
 *
 * Layout:
 *   - Producto disponible (Norte SecAgent): card destacada ancho completo,
 *     borde mint-accent, badge con pulso, CTA link a secagent.nortesoftware.dev
 *   - Productos próximamente (3): grid 3 columnas, muted, sin link activo
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
        description="Herramientas especializadas para industrias mexicanas. Construidas con el mismo estándar que aplicamos en cada proyecto de cliente."
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

            // TypeScript: aquí product es AvailableProduct → .url y .cta existen
            const Icon = PRODUCT_ICONS[product.id];

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
                  className={cn(
                    "group flex flex-col md:flex-row md:items-center gap-8",
                    "p-8 md:p-10 rounded-3xl relative overflow-hidden",
                    "bg-navy-mid/40 border border-mint-accent/30",
                    "hover:bg-navy-mid/60 hover:border-mint-accent/60",
                    "transition-all duration-500 ease-out",
                    "hover:shadow-[0_24px_64px_-16px_rgba(52,211,153,0.2)]",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-mint-accent focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-navy-deep",
                  )}
                >
                  {/* Línea decorativa superior */}
                  <div
                    aria-hidden
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-mint-accent/70 to-transparent"
                  />

                  {/* Contenido principal */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      {Icon && (
                        <div className="size-12 rounded-xl bg-mint-accent/10 border border-mint-accent/25 flex items-center justify-center">
                          <Icon
                            className="size-5 text-mint-accent"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </div>
                      )}
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-mint-accent/15 text-mint-accent border border-mint-accent/25">
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-mint-accent animate-pulse"
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
                  <div className="shrink-0 flex items-center gap-2 text-sm font-semibold text-mint-accent group-hover:gap-3 transition-all duration-300 whitespace-nowrap">
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

          {/* ── Productos próximamente (grid 3 cols) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
                    "p-7 rounded-3xl",
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
                  <p className="text-ice-white/30 text-sm leading-relaxed text-pretty">
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
