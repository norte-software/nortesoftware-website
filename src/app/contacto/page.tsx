import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Accent";
import { ContactForm } from "@/components/forms/ContactForm";
import { ObfuscatedContact } from "@/components/ui/ObfuscatedContact";
import { SITE, WHATSAPP_URL } from "@/lib/constants";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos de tu proyecto. Te respondemos en menos de 48 horas hábiles con detalles sobre alcance, tiempos y costos.",
  alternates: { canonical: `${SITE.url}/contacto` },
  openGraph: {
    title: "Contacto · Norte Software",
    description:
      "Cuéntanos de tu proyecto. Te respondemos en menos de 48 horas hábiles.",
    url: `${SITE.url}/contacto`,
    type: "website",
  },
};

export default function ContactoPage() {
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24">
      <Container size="default" className="relative">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="mb-6 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Contacto
            </span>
          </div>

          <h1 className="mb-6 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.025em] text-balance">
            Hablemos de tu <Accent>proyecto</Accent>.
          </h1>

          <p className="text-cream/70 text-base md:text-lg leading-relaxed text-pretty">
            Cuéntanos qué tienes en mente. Respondemos en menos de
            48 horas hábiles con propuesta clara sobre alcance,
            tiempos y costos.
          </p>
        </div>

        {/* Grid form + info */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <ContactForm
              turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            />
          </div>

          {/* Info de contacto */}
          <aside className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-cream/[0.08] bg-green-panel/30 p-8">
              <h2 className="font-display text-lg font-semibold text-cream mb-6">
                Otras formas de contacto
              </h2>

              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <div className="shrink-0 size-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Mail
                      className="size-4 text-gold"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-cream/45 mb-1">
                      Correo
                    </p>
                    <ObfuscatedContact
                      type="email"
                      value={SITE.emails.info}
                      className="text-sm text-cream/85 hover:text-gold transition-colors break-all"
                    />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="shrink-0 size-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Phone
                      className="size-4 text-gold"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-cream/45 mb-1">
                      Teléfono
                    </p>
                    <ObfuscatedContact
                      type="phone"
                      value={SITE.phone.display}
                      href={SITE.phone.e164}
                      className="text-sm text-cream/85 hover:text-gold transition-colors"
                    />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="shrink-0 size-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <MessageCircle
                      className="size-4 text-gold"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-cream/45 mb-1">
                      WhatsApp
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cream/85 hover:text-gold transition-colors"
                    >
                      Escríbenos directo →
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="shrink-0 size-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <MapPin
                      className="size-4 text-gold"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-cream/45 mb-1">
                      Ubicación
                    </p>
                    <p className="text-sm text-cream/85">
                      {SITE.address.city},
                      <br />
                      {SITE.address.state}, {SITE.address.country}
                    </p>
                  </div>
                </li>
              </ul>

              <div className="relative mt-8 border-t border-hairline">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-0.5 w-10 -translate-y-px bg-gold"
                />
              </div>

              <p className="text-xs text-cream/45 mt-6 leading-relaxed">
                Operamos remotamente para clientes en todo México.
                Reuniones presenciales en SCLC bajo previa cita.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
