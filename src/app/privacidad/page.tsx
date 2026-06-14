import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Aviso de Privacidad",
  description: `Aviso de Privacidad de ${SITE.name}. Información sobre el tratamiento de datos personales en cumplimiento de la LFPDPPP.`,
  path: "/privacidad",
  noIndex: true, // Mientras sea placeholder
});

/**
 * Aviso de Privacidad — placeholder.
 *
 * IMPORTANTE: este texto NO es vinculante legalmente. Antes de ir a
 * producción definitiva, debe ser redactado por abogado o usar plantilla
 * validada según la Ley Federal de Protección de Datos Personales en
 * Posesión de los Particulares (LFPDPPP) de México.
 *
 * Mientras tanto, la página está marcada como noIndex para que Google
 * no la indexe como contenido oficial.
 */
export default function PrivacidadPage() {
  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <p className="font-display text-gold text-sm tracking-[0.3em] uppercase mb-4">
          Información legal
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-balance mb-6">
          Aviso de Privacidad
        </h1>

        <div className="my-8 p-5 rounded-lg border border-gold/30 bg-gold/5">
          <p className="text-sm text-cream/80 leading-relaxed">
            <span className="font-semibold text-gold">
              Documento en redacción.
            </span>{" "}
            Este aviso de privacidad será publicado en su versión definitiva
            en cumplimiento de la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares (LFPDPPP). Mientras
            tanto, los datos que recibimos a través de este sitio se
            utilizan exclusivamente para responder consultas y no se
            comparten con terceros.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            Responsable del tratamiento de datos
          </h2>
          <p className="text-cream/75 leading-relaxed">
            <strong>{SITE.legalName}</strong>, con domicilio en{" "}
            {SITE.address.short}, es responsable del tratamiento de los datos
            personales que se recaban a través de este sitio web.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            Datos que recabamos
          </h2>
          <p className="text-cream/75 leading-relaxed">
            A través del formulario de contacto y los canales habilitados en
            el sitio, recabamos: nombre, correo electrónico, teléfono (si lo
            proporcionas) y el contenido del mensaje. No utilizamos cookies
            de seguimiento publicitario.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            Finalidades
          </h2>
          <p className="text-cream/75 leading-relaxed">
            Los datos se utilizan únicamente para: responder a la consulta o
            solicitud de cotización, dar seguimiento comercial cuando es
            solicitado, y atender obligaciones legales y fiscales. No
            realizamos transferencias de datos a terceros con fines
            distintos.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            Tus derechos ARCO
          </h2>
          <p className="text-cream/75 leading-relaxed">
            Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al
            tratamiento de tus datos personales. Para ejercer estos
            derechos, escríbenos a{" "}
            <a
              href={`mailto:${SITE.emails.info}`}
              className="text-gold hover:underline"
            >
              {SITE.emails.info}
            </a>{" "}
            indicando claramente la solicitud.
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
