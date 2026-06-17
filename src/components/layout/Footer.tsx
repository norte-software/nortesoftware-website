import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ObfuscatedContact } from "@/components/ui/ObfuscatedContact";
import {
  SITE,
  NAV_LINKS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
  CONTACT_CTA,
} from "@/lib/constants";

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};

/**
 * Footer / colofón — sobrio, sobre la capa más hundida (green-900).
 * Regla con tick en oro, hovers en oro, sin notación de código.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightYear =
    currentYear === SITE.foundedYear
      ? `${SITE.foundedYear}`
      : `${SITE.foundedYear}–${currentYear}`;

  return (
    <footer
      className="relative border-t border-hairline bg-green-900"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" style={srOnly}>
        Pie de página
      </h2>

      <Container size="wide" className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Logo variant="full" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
              {SITE.brandPromise}
            </p>
            <p className="mt-5 text-sm font-medium text-gold">
              {SITE.brandTagline}
            </p>

            <ul className="mt-8 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.iconKey === "whatsapp" ? "_blank" : undefined}
                    rel={
                      social.iconKey === "whatsapp"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-hairline text-cream/70 transition-colors duration-200 hover:border-gold/40 hover:text-gold"
                  >
                    <SocialIcon iconKey={social.iconKey} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
              Sitio
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/75 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-gold" aria-hidden />
                <ObfuscatedContact
                  type="email"
                  value={SITE.emails.info}
                  className="break-all text-cream/75 transition-colors duration-200 hover:text-gold"
                />
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                <ObfuscatedContact
                  type="phone"
                  value={SITE.phone.display}
                  href={SITE.phone.e164}
                  className="text-cream/75 transition-colors duration-200 hover:text-gold"
                />
              </li>
              <li className="flex items-start gap-2.5 text-cream/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>
                  {SITE.address.city},
                  <br />
                  {SITE.address.state}, {SITE.address.country}
                </span>
              </li>
            </ul>

            <Link
              href={CONTACT_CTA.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all duration-300 hover:gap-3"
            >
              {CONTACT_CTA.label}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Regla con tick en oro */}
        <div className="relative mt-16 border-t border-hairline">
          <span
            aria-hidden
            className="absolute left-0 top-0 h-0.5 w-10 -translate-y-px bg-gold"
          />
        </div>

        {/* Colofón */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-cream/55">
              Construido en Chiapas. Compilado para México y el mundo.
            </p>
            <ul className="flex items-center gap-4 text-xs">
              <li>
                <a
                  href="https://nortecampo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/60 transition-colors duration-200 hover:text-gold"
                >
                  NorteCampo
                </a>
              </li>
              <li>
                <a
                  href="https://secagent.nortesoftware.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/60 transition-colors duration-200 hover:text-gold"
                >
                  SecAgent
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <ul className="flex items-center gap-6 text-xs">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/60 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-cream/45">
              © {copyrightYear} {SITE.legalName}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
