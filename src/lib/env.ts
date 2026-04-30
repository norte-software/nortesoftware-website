import { z } from "zod";

/**
 * Validación de variables de entorno.
 *
 * Filosofía: si falta una variable crítica, el build TIENE que fallar
 * en local antes de llegar a producción. Esto previene escenarios donde
 * el sitio compila pero el form de contacto está roto en producción.
 *
 * Variables agrupadas por contexto:
 *   - server: solo accesibles del lado del servidor (API keys, secrets)
 *   - client: expuestas al browser (deben empezar con NEXT_PUBLIC_)
 */

const serverSchema = z.object({
  /** API key de Resend para envío de correos del form de contacto. */
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY es requerida"),

  /** Email destino donde llegan los mensajes del form. */
  CONTACT_EMAIL_TO: z.string().email().default("chris@nortesoftware.dev"),

  /** Email "from" verificado en Resend. Debe estar autorizado en el dominio. */
  CONTACT_EMAIL_FROM: z
    .string()
    .email()
    .default("contacto@nortesoftware.dev"),

  /** Secret server-side de Cloudflare Turnstile (anti-bot del form). */
  TURNSTILE_SECRET_KEY: z.string().min(1, "TURNSTILE_SECRET_KEY es requerida"),

  /** Entorno de ejecución, validado para evitar typos. */
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const clientSchema = z.object({
  /** Site key de Cloudflare Turnstile (público, va al widget en el form). */
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_TURNSTILE_SITE_KEY es requerida"),

  /** URL canónica del sitio. Se usa en metadata, OG images, sitemap. */
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("https://nortesoftware.dev"),
});

/**
 * Estos objetos hidratan las variables. En el cliente, Next.js solo
 * inyecta NEXT_PUBLIC_*; las server-only quedan como undefined ahí.
 */
const _serverEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
  CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
};

const _clientEnv = {
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};

/**
 * Solo validamos el server schema cuando estamos en el servidor.
 * En el cliente, las server-only no existen y `parse` fallaría.
 */
const isServer = typeof window === "undefined";

const parsed = isServer
  ? {
      ..._clientEnv,
      ..._serverEnv,
    }
  : _clientEnv;

const schema = isServer ? serverSchema.merge(clientSchema) : clientSchema;

const result = schema.safeParse(parsed);

if (!result.success) {
  console.error(
    "❌ Variables de entorno inválidas:\n",
    result.error.flatten().fieldErrors,
  );
  throw new Error("Configuración de entorno inválida. Revisa .env.local");
}

export const env = result.data;
