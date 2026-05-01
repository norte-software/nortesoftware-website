"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { WHATSAPP_URL, SITE } from "@/lib/constants";

/**
 * Floating Action Button (FAB) de WhatsApp.
 *
 * Comportamiento:
 *
 * - Aparece en TODAS las páginas (mounted en SiteShell, no en cada page)
 * - Animación de entrada después de 1.5s para no competir con el primer
 *   render del hero (delight, no intrusivo)
 * - Pulse halo verde sutil para llamar atención sin ser invasivo
 * - Tooltip "Escríbenos por WhatsApp" al hover (desktop)
 * - Respeta prefers-reduced-motion (no anima si el usuario lo desactiva)
 * - aria-label descriptivo + abre en nueva pestaña con noopener
 *
 * Estética: verde de WhatsApp (#25D366) NO se usa — eso choca con la
 * paleta de marca. En su lugar, mint-accent del sistema, que es muy
 * cercano y mantiene cohesión visual.
 */
export function WhatsAppFab() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Delay de aparición — 1.2s después de mount para no competir con hero
    const timer = setTimeout(() => setIsMounted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 18,
            stiffness: 280,
          }}
          className="fixed bottom-6 right-6 z-40 group"
        >
          {/* Halo pulsante sutil */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-mint-accent/30 motion-safe:animate-ping motion-reduce:opacity-40"
            style={{ animationDuration: "2.4s" }}
          />

          {/* Tooltip — solo desktop, oculto al hover */}
          <div
            role="tooltip"
            className="hidden lg:flex absolute right-full mr-4 top-1/2 -translate-y-1/2 items-center px-3 py-1.5 bg-navy-mid border border-ice-white/10 rounded-full text-xs text-ice-white/85 whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            Escríbenos por WhatsApp
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Escribir a ${SITE.name} por WhatsApp al ${SITE.phone.display}`}
            className="relative inline-flex items-center justify-center size-14 rounded-full bg-mint-accent text-navy-deep shadow-[0_8px_32px_-4px_rgba(52,211,153,0.45)] hover:shadow-[0_12px_48px_-4px_rgba(52,211,153,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          >
            <SocialIcon iconKey="whatsapp" className="size-6" aria-hidden />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
