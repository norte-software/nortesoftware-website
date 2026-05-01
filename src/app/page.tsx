import { Hero } from "@/components/sections/Hero";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { StackSection } from "@/components/sections/StackSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Home de Norte Software.
 *
 * Orden narrativo (intencional):
 *
 * 1. Hero          → ¿Qué somos? Posicionamiento de un vistazo
 * 2. Pillars       → ¿Cómo trabajamos? Genera confianza temprana
 * 3. Services      → ¿Qué hacemos? Aterriza la oferta
 * 4. Industries    → ¿A quién servimos? Especialización + versatilidad
 * 5. Stack         → ¿Con qué? Refuerza credibilidad técnica
 * 6. FinalCTA      → Última oportunidad de conversión
 * 7. Footer        → (lo agrega SiteShell)
 *
 * Cada sección tiene su propio padding y respira sola.
 * Los anchors (#nosotros, #servicios, #industrias) corresponden a
 * los links de la nav del Header.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsSection />
      <ServicesSection />
      <IndustriesSection />
      <StackSection />
      <FinalCTA />
    </>
  );
}
