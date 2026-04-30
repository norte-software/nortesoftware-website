import Image from "next/image";
import Link from "next/link";
import { SITE, PRIMARY_CTA } from "@/lib/constants";

/**
 * Home placeholder. Confirma que los cimientos están vivos:
 *   - Fonts cargadas (League Spartan + DM Sans)
 *   - Tokens de paleta funcionando (navy, electric, mint)
 *   - Utilidades custom (text-gradient-brand, bg-dot-grid)
 *   - Logo servido via next/image con optimización
 *
 * Este componente se reemplaza en Step 2 por el home real
 * con Header + Hero + Pilares + Servicios + etc.
 */
export default function HomePage() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center px-6 py-20 bg-dot-grid">
      <div className="max-w-3xl text-center">
        <Image
          src="/images/isotipo-claro.png"
          alt={`Isotipo ${SITE.name}`}
          width={120}
          height={120}
          priority
          className="mx-auto mb-10 drop-shadow-[0_0_40px_rgba(59,130,246,0.4)]"
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
          <Link
            href={PRIMARY_CTA.href}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-mint-accent text-mint-accent rounded-full font-medium hover:bg-mint-accent hover:text-navy-deep transition-all duration-300 hover:shadow-[var(--shadow-glow-md)]"
          >
            {PRIMARY_CTA.label}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="divider-brand mt-20 mb-6 max-w-xs mx-auto opacity-60" />
        <p className="text-xs text-ice-white/40 tracking-widest uppercase">
          Sitio en construcción · Cimientos verificados
        </p>
      </div>
    </main>
  );
}
