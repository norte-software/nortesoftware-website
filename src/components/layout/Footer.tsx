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

/**
 * Estilos sr-only inline (en vez de class) para garantizar
 * que oculten visualmente sin depender de utilities Tailwind v4.
 */
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

export function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightYear =
    currentYear === SITE.foundedYear
      ? `${SITE.foundedYear}`
      : `${SITE.foundedYear}–${currentYear}`;

  return (
    <footer
      className="relative bg-navy-mid/40 border-t border-ice-white/[0.06]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" style={srOnly}>
        Pie de página
      </h2>

      <Container size="wide" className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Logo variant="full" />
            <p className="mt-6 text-ice-white/60 text-sm leading-relaxed max-w-md">
              {SITE.brandPromise}
            </p>
            <p className="mt-6 font-display text-electric-blue text-xs tracking-[0.3em] uppercase">
              {SITE.brandTagline}
            </p>

            {/* Redes sociales */}
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
                    className="inline-flex items-center justify-center size-10 rounded-full border border-ice-white/10 bg-ice-white/[0.02] text-ice-white/70 hover:text-mint-accent hover:border-mint-accent/40 hover:bg-mint-accent/5 transition-all duration-200"
                  >
                    <SocialIcon iconKey={social.iconKey} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-ice-white/40 mb-4">
              Sitio
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ice-white/75 hover:text-mint-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-4">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-ice-white/40 mb-4">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail
                  className="size-4 text-electric-blue/80 shrink-0"
                  aria-hidden
                />
                <ObfuscatedContact
                  type="email"
                  value={SITE.emails.info}
                  className="text-ice-white/75 hover:text-mint-accent transition-colors duration-200 break-all"
                />
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  className="size-4 text-electric-blue/80 shrink-0"
                  aria-hidden
                />
                <ObfuscatedContact
                  type="phone"
                  value={SITE.phone.display}
                  href={SITE.phone.e164}
                  className="text-ice-white/75 hover:text-mint-accent transition-colors duration-200"
                />
              </li>
              <li className="flex items-start gap-2.5 text-ice-white/75">
                <MapPin
                  className="size-4 text-electric-blue/80 mt-0.5 shrink-0"
                  aria-hidden
                />
                <span>
                  {SITE.address.city},
                  <br />
                  {SITE.address.state}, {SITE.address.country}
                </span>
              </li>
            </ul>

            <Link
              href={CONTACT_CTA.href}
              className="inline-flex items-center gap-2 mt-6 text-mint-accent text-sm font-medium hover:gap-3 transition-all duration-300"
            >
              {CONTACT_CTA.label}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Divider con gradiente de marca */}
        <div className="divider-brand mt-16 opacity-50" />

        {/* Bottom strip: copyright + productos live + legal */}
        <div className="mt-8 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-ice-white/45">
              © {copyrightYear} {SITE.legalName}. Todos los derechos reservados.
            </p>

            {/* Productos live de Norte Software */}
            <ul className="flex items-center gap-4 text-xs">
              <li>
                <a
                  href="https://nortecampo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ice-white/60 hover:text-mint-accent transition-colors duration-200"
                >
                  NorteCampo
                </a>
              </li>
              <li>
                <a
                  href="https://secagent.nortesoftware.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ice-white/60 hover:text-mint-accent transition-colors duration-200"
                >
                  SecAgent
                </a>
              </li>
            </ul>
          </div>

          <ul className="flex items-center gap-6 text-xs">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ice-white/60 hover:text-mint-accent transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
