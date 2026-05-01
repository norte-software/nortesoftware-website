import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

interface SiteShellProps {
  children: ReactNode;
}

/**
 * Wrapper de layout que envuelve todas las páginas con Header, Footer
 * y el FAB de WhatsApp.
 *
 * Estructura:
 *   - Header (fixed top, sticky con efecto glass al scroll)
 *   - main (con padding-top para evitar que el primer contenido quede
 *     oculto detrás del header)
 *   - Footer
 *   - WhatsAppFab (fixed bottom-right, presente en todas las páginas)
 *
 * El padding-top es responsive: 4rem en mobile (h-16) y 5rem en desktop
 * (h-20), matcheando la altura del Header.
 */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Header />
      <main id="main" className="pt-16 md:pt-20 min-h-svh">
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
