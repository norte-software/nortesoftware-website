import { Hero } from "@/components/sections/Hero";
import { StatBar } from "@/components/sections/StatBar";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PRODUCTS, SITE, type AvailableProduct } from "@/lib/constants";

/**
 * Home de Norte Software — arquitectura PRUEBA-PRIMERO (brief §4).
 *
 * 1. Hero          → posicionamiento en seco + CTA a la prueba
 * 2. StatBar       → números reales bajo el hero
 * 3. Prueba        → productos en producción (el corazón: demostrar, no proclamar)
 * 4. Seguridad     → construir endurecido + track record sobrio
 * 5. Servicios     → desde la autoridad ya ganada (no menú)
 * 6. Nosotros      → el fundador como fortaleza · "el portafolio es el equipo"
 * 7. Industrias    → contexto (no rejilla): donde el software es crítico
 * 8. FinalCTA      → cierre
 *    Footer        → (lo agrega SiteShell)
 */

const availableProducts = PRODUCTS.filter(
  (p): p is AvailableProduct => p.available,
);

/** JSON-LD: catálogo de productos como prueba estructurada (brief §7 SEO). */
const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Productos de Norte Software en producción",
  itemListElement: availableProducts.map((product, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: product.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: product.url,
      description: product.description,
      publisher: {
        "@type": "Organization",
        name: SITE.legalName,
        url: SITE.url,
      },
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatBar />
      <ProductsSection />
      <SecuritySection />
      <ServicesSection />
      <AboutSection />
      <IndustriesSection />
      <FinalCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
    </>
  );
}
