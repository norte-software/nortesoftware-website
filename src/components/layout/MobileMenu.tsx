"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, CONTACT_CTA, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  /** Llamado cuando el usuario hace click en un link. Cierra el drawer. */
  onNavigate?: () => void;
}

/**
 * Detecta si un link de navegación corresponde a la ruta actual.
 */
function isActiveLink(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Drawer mobile slide-from-right.
 *
 * El cierre al cambiar de ruta se delega al onClick de cada Link
 * (vía onNavigate prop), evitando setState dentro de useEffect.
 */
export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Cierre con ESC (escucha externa, sí justifica useEffect)
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Scroll lock + foco inicial (manipulación DOM externa, sí justifica useEffect)
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => closeButtonRef.current?.focus(), 100);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-green-deep/70 backdrop-blur-sm lg:hidden"
            aria-hidden
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280,
              mass: 0.9,
            }}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className={cn(
              "fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm lg:hidden",
              "bg-green-panel border-l border-cream/10",
              "flex flex-col",
              "shadow-[-24px_0_64px_-16px_rgba(0,0,0,0.5)]",
            )}
          >
            {/* Header del drawer */}
            <div className="flex items-center justify-between px-6 h-16 md:h-20 border-b border-cream/[0.06]">
              <Logo variant="full" />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className={cn(
                  "size-10 rounded-full inline-flex items-center justify-center",
                  "border border-cream/10 bg-cream/[0.02]",
                  "text-cream/80 hover:text-gold hover:border-gold/40",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-gold focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-green-panel",
                )}
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {/* Links navegación */}
            <nav
              aria-label="Navegación móvil"
              className="flex-1 px-6 py-8 overflow-y-auto"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = isActiveLink(link.href, pathname);

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + i * 0.05,
                        duration: 0.3,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className={cn(
                          "block py-3 font-display text-2xl font-semibold",
                          "transition-colors duration-200",
                          isActive
                            ? "text-gold"
                            : "text-cream/85 hover:text-gold",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + NAV_LINKS.length * 0.05 + 0.1,
                  duration: 0.4,
                }}
                className="mt-10"
              >
                <Button
                  href={CONTACT_CTA.href}
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={onNavigate}
                >
                  {CONTACT_CTA.label}
                  <span aria-hidden>→</span>
                </Button>
              </motion.div>
            </nav>

            {/* Footer del drawer con tagline de marca */}
            <div className="px-6 py-6 border-t border-cream/[0.06]">
              <p className="text-xs text-cream/40 tracking-widest uppercase">
                {SITE.brandTagline}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
