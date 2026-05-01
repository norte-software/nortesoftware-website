import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    <main id="main" className="pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Glow ambiental */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-electric-blue/[0.06] blur-[100px] pointer-events-none"
      />

      <Container size="default" className="relative">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="font-display text-electric-blue text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6">
            Contacto
          </p>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-[1.05] mb-6">
            Hablemos de tu{" "}
            <span className="text-gradient-brand">proyecto.</span>
          </h1>

          <p className="text-ice-white/70 text-base md:text-lg leading-relaxed text-pretty">
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
            <div className="rounded-2xl border border-ice-white/[0.08] bg-navy-mid/30 p-8">
              <h2 className="font-display text-lg font-semibold text-ice-white mb-6">
                Otras formas de contacto
              </h2>

              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <div className="shrink-0 size-10 rounded-lg bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center">
                    <Mail
                      className="size-4 text-electric-blue"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-ice-white/45 mb-1">
                      Correo
                    </p>
                    <ObfuscatedContact
                      type="email"
                      value={SITE.emails.info}
                      className="text-sm text-ice-white/85 hover:text-mint-accent transition-colors break-all"
                    />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="shrink-0 size-10 rounded-lg bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center">
                    <Phone
                      className="size-4 text-electric-blue"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-ice-white/45 mb-1">
                      Teléfono
                    </p>
                    <ObfuscatedContact
                      type="phone"
                      value={SITE.phone.display}
                      href={SITE.phone.e164}
                      className="text-sm text-ice-white/85 hover:text-mint-accent transition-colors"
                    />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="shrink-0 size-10 rounded-lg bg-mint-accent/10 border border-mint-accent/20 flex items-center justify-center">
                    <MessageCircle
                      className="size-4 text-mint-accent"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-ice-white/45 mb-1">
                      WhatsApp
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ice-white/85 hover:text-mint-accent transition-colors"
                    >
                      Escríbenos directo →
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="shrink-0 size-10 rounded-lg bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center">
                    <MapPin
                      className="size-4 text-electric-blue"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-ice-white/45 mb-1">
                      Ubicación
                    </p>
                    <p className="text-sm text-ice-white/85">
                      {SITE.address.city},
                      <br />
                      {SITE.address.state}, {SITE.address.country}
                    </p>
                  </div>
                </li>
              </ul>

              <div className="divider-brand mt-8 opacity-30" />

              <p className="text-xs text-ice-white/45 mt-6 leading-relaxed">
                Operamos remotamente para clientes en todo México.
                Reuniones presenciales en SCLC bajo previa cita.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
