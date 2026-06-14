import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

interface SiteShellProps {
  children: ReactNode;
}

/**
 * Wrapper de layout: Header, main, Footer y FAB de WhatsApp.
 *
 * Firma estructural "Meridiano del Norte": un EJE NORTE — hairline vertical
 * anclado al borde izquierdo del contenido (max-w-7xl) — recorre todo el
 * main como una regla cartográfica. Reemplaza al antiguo dot-grid; la
 * brújula se vuelve la columna vertebral del documento. Solo en ≥md.
 */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Header />
      <main id="main" className="relative pt-16 md:pt-20 min-h-svh">
        {/* Eje norte (decorativo) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
        >
          <div className="mx-auto h-full max-w-7xl">
            <div className="relative h-full">
              <span className="absolute inset-y-0 left-0 w-px bg-hairline" />
            </div>
          </div>
        </div>

        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
