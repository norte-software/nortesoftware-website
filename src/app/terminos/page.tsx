import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Términos y Condiciones",
  description: `Términos y condiciones de uso del sitio web de ${SITE.name}.`,
  path: "/terminos",
  noIndex: true, // Mientras sea placeholder
});

/**
 * Términos y Condiciones — placeholder.
 *
 * IMPORTANTE: documento NO vinculante en versión actual. La versión
 * final debe ser revisada por abogado o usar plantilla profesional.
 */
export default function TerminosPage() {
  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <p className="font-display text-gold text-sm tracking-[0.3em] uppercase mb-4">
          Información legal
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-balance mb-6">
          Términos y Condiciones
        </h1>

        <div className="my-8 p-5 rounded-lg border border-gold/30 bg-gold/5">
          <p className="text-sm text-cream/80 leading-relaxed">
            <span className="font-semibold text-gold">
              Documento en redacción.
            </span>{" "}
            Estos términos y condiciones serán publicados en su versión
            definitiva próximamente. El uso del sitio implica aceptación
            de los lineamientos generales descritos abajo.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            Uso del sitio
          </h2>
          <p className="text-cream/75 leading-relaxed">
            El acceso y navegación de este sitio web es gratuito. La
            información publicada tiene carácter informativo sobre los
            servicios de {SITE.legalName}, no constituye una oferta
            vinculante hasta que se firme un contrato de servicios formal.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            Propiedad intelectual
          </h2>
          <p className="text-cream/75 leading-relaxed">
            Todos los contenidos del sitio (textos, imágenes, logotipos,
            código) son propiedad de {SITE.legalName} o se utilizan bajo
            licencia. La reproducción total o parcial requiere autorización
            por escrito.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            Limitación de responsabilidad
          </h2>
          <p className="text-cream/75 leading-relaxed">
            La información del sitio se proporciona &quot;tal cual&quot;.
            {SITE.legalName} no se hace responsable por decisiones tomadas
            con base exclusiva en la información publicada sin consulta
            previa con nuestro equipo.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            Jurisdicción
          </h2>
          <p className="text-cream/75 leading-relaxed">
            Cualquier controversia derivada del uso de este sitio se
            resolverá ante los tribunales competentes de{" "}
            {SITE.address.city}, {SITE.address.state}, México.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            Contacto
          </h2>
          <p className="text-cream/75 leading-relaxed">
            Para preguntas sobre estos términos, escríbenos a{" "}
            <a
              href={`mailto:${SITE.emails.info}`}
              className="text-gold hover:underline"
            >
              {SITE.emails.info}
            </a>
            .
          </p>
        </div>

        <div className="mt-16">
          <Button href="/" variant="secondary" size="md">
            <span aria-hidden>←</span> Volver al inicio
          </Button>
        </div>
      </Container>
    </section>
  );
}
