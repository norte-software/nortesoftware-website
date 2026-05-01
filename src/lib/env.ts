import { z } from "zod";

/**
 * Validación de variables de entorno requeridas en runtime.
 *
 * Si falta una variable crítica, el server arroja error al arrancar
 * en lugar de fallar silenciosamente cuando un usuario envíe el form.
 *
 * Uso: importar `env` desde aquí en archivos que necesiten env vars.
 */

const envSchema = z.object({
  // Públicas (NEXT_PUBLIC_*)
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("https://nortesoftware.dev"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_TURNSTILE_SITE_KEY es requerida"),

  // Privadas (server-only)
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY es requerida"),
  TURNSTILE_SECRET_KEY: z
    .string()
    .min(1, "TURNSTILE_SECRET_KEY es requerida"),
  CONTACT_EMAIL_TO: z
    .string()
    .email()
    .default("info@nortesoftware.dev"),
  CONTACT_EMAIL_FROM: z
    .string()
    .email()
    .default("info@nortesoftware.dev"),
});

/**
 * Variables validadas. Tipadas según el schema.
 *
 * IMPORTANTE: en Next.js, las variables NEXT_PUBLIC_* están disponibles
 * en cliente. El resto solo en servidor. No exportes este objeto a
 * componentes que corran en cliente.
 */
function validateEnv() {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
    CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM,
  });

  if (!parsed.success) {
    console.error(
      "❌ Variables de entorno inválidas:",
      JSON.stringify(parsed.error.flatten().fieldErrors, null, 2),
    );
    throw new Error("Configuración de entorno inválida. Ver logs.");
  }

  return parsed.data;
}

export const env = validateEnv();
