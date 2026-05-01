import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE, PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";

/**
 * Home placeholder con layout shell aplicado.
 *
 * Este componente se reemplaza en Step 3 por el home real con:
 * Hero (globo terráqueo) + Pilares + Servicios + Industrias + CTA
 *
 * Por ahora demuestra que header sticky, fonts, paleta, utilidades
 * custom (text-gradient-brand, bg-dot-grid) y botones funcionan.
 */
export default function HomePage() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] flex items-center justify-center bg-dot-grid py-20 md:py-32">
      {/* Glow ambiental detrás del isotipo */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-electric-blue/10 blur-[120px] pointer-events-none"
      />

      <Container size="default" className="relative">
        <div className="text-center max-w-3xl mx-auto">
          <Image
            src="/images/isotipo-claro.png"
            alt=""
            width={120}
            height={120}
            priority
            className="mx-auto mb-10 drop-shadow-[0_0_40px_rgba(59,130,246,0.4)]"
            aria-hidden
          />

          <p className="font-display text-electric-blue text-sm tracking-[0.3em] uppercase mb-6">
            {SITE.brandTagline}
          </p>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-[1.05]">
            {SITE.tagline.split(",").map((part, i) =>
              i === 0 ? (
                <span key={i}>{part},</span>
              ) : (
                <span key={i} className="block text-gradient-brand">
                  {part.trim()}
                </span>
              ),
            )}
          </h1>

          <p className="text-ice-white/70 text-lg md:text-xl text-pretty max-w-2xl mx-auto mb-12">
            {SITE.taglineSecondary}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href={PRIMARY_CTA.href} variant="primary" size="lg">
              {PRIMARY_CTA.label}
              <span aria-hidden>→</span>
            </Button>
            <Button href={SECONDARY_CTA.href} variant="ghost" size="lg">
              {SECONDARY_CTA.label}
            </Button>
          </div>

          <div className="divider-brand mt-20 mb-6 max-w-xs mx-auto opacity-50" />
          <p className="text-xs text-ice-white/40 tracking-widest uppercase">
            Sitio en construcción · Step 2 verificado
          </p>
        </div>
      </Container>
    </section>
  );
}
