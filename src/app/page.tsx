import { Hero } from "@/components/sections/Hero";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { OriginBand } from "@/components/sections/OriginBand";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Home de Norte Software.
 *
 * Orden narrativo (intencional):
 *
 * 1. Hero          → ¿Qué somos? Posicionamiento de un vistazo
 * 2. Pillars       → ¿Cómo trabajamos? Genera confianza temprana
 * 3. Services      → ¿Qué hacemos? Aterriza la oferta
 * 4. Products      → ¿Qué hemos construido? Demuestra capacidad real
 * 5. Industries    → ¿A quién servimos? Especialización + versatilidad
 * 6. Stack         → ¿Con qué? Refuerza credibilidad técnica
 * 7. FinalCTA      → Última oportunidad de conversión
 * 8. Footer        → (lo agrega SiteShell)
 *
 * Cada sección tiene su propio padding y respira sola.
 * Los anchors (#nosotros, #servicios, #productos, #industrias)
 * corresponden a los links de la nav del Header.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsSection />
      <OriginBand />
      <ServicesSection />
      <ProductsSection />
      <IndustriesSection />
      <FinalCTA />
    </>
  );
}
