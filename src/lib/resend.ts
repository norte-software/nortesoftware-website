import { Resend } from "resend";
import { env } from "@/lib/env";

/**
 * Instancia única de Resend.
 *
 * Resend SDK es threadsafe — se puede compartir.
 */
export const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  /** Reply-To opcional. Útil para que admin pueda responder al cliente. */
  replyTo?: string;
}

/**
 * Envía un correo via Resend con manejo de errores estandarizado.
 *
 * Returns Promise<true | string>:
 *   - true: enviado con éxito
 *   - string: mensaje de error si falló
 *
 * Logging: en producción cualquier error se logea en console.error
 * para que aparezca en Vercel logs y podamos investigar.
 */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailParams): Promise<true | string> {
  try {
    const result = await resend.emails.send({
      from: `Norte Software <${env.CONTACT_EMAIL_FROM}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    });

    if (result.error) {
      console.error("[Resend] Send error:", result.error);
      return result.error.message ?? "Error desconocido al enviar correo";
    }

    return true;
  } catch (err) {
    console.error("[Resend] Unexpected error:", err);
    return err instanceof Error ? err.message : "Error inesperado";
  }
}
