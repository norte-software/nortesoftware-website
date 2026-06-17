"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { WHATSAPP_URL, SITE } from "@/lib/constants";

/**
 * Floating Action Button de WhatsApp.
 *
 * Sistema "Latón del Norte": el oro de marca, SIN halo pulsante ni glow
 * (la quietud comunica solidez). Entra una vez con spring; tooltip al hover.
 * Respeta prefers-reduced-motion.
 */
export function WhatsAppFab() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 18, stiffness: 280 }}
          className="fixed bottom-6 right-6 z-40 group"
        >
          {/* Tooltip — solo desktop */}
          <div
            role="tooltip"
            className="hidden lg:flex absolute right-full mr-4 top-1/2 -translate-y-1/2 items-center px-3 py-1.5 bg-green-panel border border-hairline rounded-lg text-xs text-cream/85 whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            Escríbenos por WhatsApp
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Escribir a ${SITE.name} por WhatsApp al ${SITE.phone.display}`}
            className="relative inline-flex items-center justify-center size-14 rounded-full bg-gold text-green-deep hover:scale-105 active:scale-95 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-deep"
          >
            <SocialIcon iconKey="whatsapp" className="size-6" aria-hidden />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
