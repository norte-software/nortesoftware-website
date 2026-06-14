"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, CONTACT_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

/**
 * Detecta si un link de navegación corresponde a la ruta actual.
 *
 * Lógica:
 *  - "/" (home) solo activa cuando el pathname es exactamente "/"
 *  - Anchors ("/#nosotros") activan cuando estamos en la base ("/")
 *  - Rutas reales ("/servicios", "/contacto") activan cuando el
 *    pathname coincide o está dentro de esa sección.
 */
function isActiveLink(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";

  // Anchor en home (e.g. "/#industrias", "/#nosotros")
  if (href.startsWith("/#")) return pathname === "/";

  // Ruta real: matchea exacto o como prefijo (sub-rutas)
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Header con dos comportamientos:
 *
 * 1. Sticky transparente al inicio (sobre el hero) → maximiza impacto visual
 * 2. Glass + border al hacer scroll > 24px → mantiene legibilidad sobre contenido
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 24);
  });

  // Cierra el menú mobile (lo invocamos en clicks de links, no en useEffect)
  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50",
          "transition-[background-color,backdrop-filter,border-color] duration-300",
          isScrolled
            ? "bg-green-deep/70 backdrop-blur-xl border-b border-cream/[0.08]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Logo variant="full" />

            {/* Navegación desktop */}
            <nav
              aria-label="Navegación principal"
              className="hidden lg:flex items-center gap-1"
            >
              {NAV_LINKS.map((link) => {
                const isActive = isActiveLink(link.href, pathname);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium",
                      "transition-colors duration-200",
                      "after:content-[''] after:absolute after:left-4 after:right-4",
                      "after:bottom-1 after:h-px after:bg-gold",
                      "after:scale-x-0 after:origin-center after:transition-transform after:duration-300",
                      "hover:after:scale-x-100",
                      isActive
                        ? "text-gold after:scale-x-100"
                        : "text-cream/70 hover:text-cream",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                href={CONTACT_CTA.href}
                variant="secondary"
                size="sm"
                className="hidden md:inline-flex"
              >
                {CONTACT_CTA.label}
                <span aria-hidden>→</span>
              </Button>

              {/* Trigger mobile menu */}
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                className={cn(
                  "lg:hidden inline-flex items-center justify-center",
                  "size-10 rounded-full",
                  "border border-cream/10 bg-cream/[0.02]",
                  "text-cream/80 hover:text-gold hover:border-gold/40",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-gold focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-green-deep",
                )}
                aria-label="Abrir menú"
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={closeMobileMenu}
        onNavigate={closeMobileMenu}
      />
    </>
  );
}
