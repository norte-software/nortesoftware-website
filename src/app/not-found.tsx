import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Accent";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6">
      <div className="max-w-xl text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Error 404
        </p>
        <h1 className="mb-6 font-display text-5xl font-bold tracking-[-0.025em] text-balance md:text-7xl">
          Te perdiste del <Accent>norte</Accent>.
        </h1>
        <p className="mb-10 text-lg text-cream/72 text-pretty">
          Esta ruta no existe en {SITE.name}. Vuelve al inicio y te orientamos
          desde ahí.
        </p>
        <Button href="/" variant="primary" size="lg">
          Volver al inicio
          <span aria-hidden>→</span>
        </Button>
      </div>
    </main>
  );
}
