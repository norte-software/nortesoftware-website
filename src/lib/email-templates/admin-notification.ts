import { TIPO_PROYECTO_LABELS, type ContactFormInput } from "@/lib/contact-schema";

/**
 * HTML email para notificar a info@nortesoftware.dev cuando un visitante
 * envía el formulario de contacto.
 *
 * Diseño:
 * - HTML simple compatible con Gmail/Outlook/Apple Mail
 * - Tabla para layout (lo más universal en email clients)
 * - Inline styles (no soporte de <style> en muchos clients)
 * - Modo claro (admin lo lee en su Gmail)
 *
 * Incluye:
 * - Datos del lead
 * - Mensaje formateado
 * - Botón Reply directo (lo maneja el cliente de mail con replyTo)
 * - Footer con contexto y timestamp
 */
export function adminNotificationTemplate(
  data: Omit<ContactFormInput, "turnstileToken">,
): string {
  const tipoProyectoLabel = data.tipoProyecto
    ? TIPO_PROYECTO_LABELS[data.tipoProyecto]
    : "No especificado";

  const timestamp = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date());

  // Escape HTML para prevenir XSS en el email del admin
  const escape = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const mensajeHtml = escape(data.mensaje).replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Nueva solicitud de contacto</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f7f8fa;color:#1a1a1a;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f7f8fa;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0A1628 0%,#1A4ABA 100%);padding:32px;color:#ffffff;">
              <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.7;">Norte Software</p>
              <h1 style="margin:8px 0 0 0;font-size:22px;font-weight:700;">Nueva solicitud de contacto</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px 0;font-size:15px;color:#4a5568;">
                Recibiste una nueva solicitud desde el formulario de <a href="https://nortesoftware.dev/contacto" style="color:#1A4ABA;text-decoration:none;">nortesoftware.dev</a>.
              </p>

              <!-- Datos del lead -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Nombre</strong><br>
                    <span style="font-size:16px;color:#1a1a1a;">${escape(data.nombre)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Email</strong><br>
                    <a href="mailto:${escape(data.email)}" style="font-size:16px;color:#1A4ABA;text-decoration:none;">${escape(data.email)}</a>
                  </td>
                </tr>
                ${
                  data.empresa
                    ? `<tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Empresa</strong><br>
                    <span style="font-size:16px;color:#1a1a1a;">${escape(data.empresa)}</span>
                  </td>
                </tr>`
                    : ""
                }
                ${
                  data.telefono
                    ? `<tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Teléfono</strong><br>
                    <a href="tel:${escape(data.telefono)}" style="font-size:16px;color:#1A4ABA;text-decoration:none;">${escape(data.telefono)}</a>
                  </td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Tipo de proyecto</strong><br>
                    <span style="font-size:16px;color:#1a1a1a;">${escape(tipoProyectoLabel)}</span>
                  </td>
                </tr>
              </table>

              <!-- Mensaje -->
              <div style="margin-top:24px;padding:20px;background:#f7f8fa;border-left:3px solid #1A4ABA;border-radius:4px;">
                <strong style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Mensaje</strong>
                <p style="margin:8px 0 0 0;font-size:15px;line-height:1.6;color:#1a1a1a;white-space:pre-wrap;">${mensajeHtml}</p>
              </div>

              <!-- CTA -->
              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${escape(data.email)}?subject=Re: Tu mensaje en Norte Software" style="display:inline-block;padding:12px 24px;background:#34D399;color:#0A1628;text-decoration:none;font-weight:600;border-radius:6px;font-size:15px;">
                  Responder al cliente
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;background:#f7f8fa;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Recibido el ${escape(timestamp)} (CDMX)<br>
                Norte Software S.A. de C.V. · Notificación automática
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
