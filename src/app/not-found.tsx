import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-svh grid place-items-center px-6 bg-dot-grid">
      <div className="text-center max-w-xl">
        <p className="font-display text-electric-blue text-sm tracking-[0.3em] uppercase mb-6">
          Error 404
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-balance mb-6">
          Te perdiste del <span className="text-gradient-brand">norte</span>.
        </h1>
        <p className="text-ice-white/70 text-lg mb-10 text-pretty">
          Esta ruta no existe en {SITE.name}. Vuelve al inicio
          y te orientamos desde ahí.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-mint-accent text-mint-accent rounded-full font-medium hover:bg-mint-accent hover:text-navy-deep transition-colors duration-300"
        >
          Volver al inicio
          <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
