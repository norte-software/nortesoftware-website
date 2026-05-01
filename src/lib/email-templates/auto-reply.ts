/**
 * HTML email para confirmar al cliente que su solicitud fue recibida.
 *
 * Tono: profesional pero discreto. Una sola frase de confirmación +
 * firma. No vende, no es invasivo, no parece chatbot.
 *
 * Diseño consistente con admin-notification para mantener identidad
 * de marca, pero centrado en el cliente.
 */
export function autoReplyTemplate(nombreCliente: string): string {
  // Capturar primer nombre (más cálido que nombre completo)
  const primerNombre = nombreCliente.trim().split(/\s+/)[0] ?? nombreCliente;

  const escape = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Recibimos tu mensaje</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f7f8fa;color:#1a1a1a;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f7f8fa;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.05);">
          <!-- Header con marca -->
          <tr>
            <td style="background:linear-gradient(135deg,#0A1628 0%,#1A4ABA 100%);padding:40px 32px;color:#ffffff;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.6;">Norte Software</p>
              <h1 style="margin:12px 0 0 0;font-size:26px;font-weight:700;letter-spacing:-0.01em;">Recibimos tu mensaje</h1>
              <p style="margin:8px 0 0 0;font-size:14px;opacity:0.7;letter-spacing:0.2em;text-transform:uppercase;">El norte de tu tecnología</p>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding:40px 32px;">
              <p style="margin:0 0 20px 0;font-size:17px;color:#1a1a1a;line-height:1.5;">
                Hola ${escape(primerNombre)},
              </p>

              <p style="margin:0 0 20px 0;font-size:15px;color:#4a5568;line-height:1.7;">
                Gracias por escribirnos. Tu mensaje llegó correctamente y lo estamos revisando.
                Te responderemos en un plazo máximo de <strong>48 horas hábiles</strong> con detalles
                sobre alcance, tiempos y costos.
              </p>

              <p style="margin:0 0 32px 0;font-size:15px;color:#4a5568;line-height:1.7;">
                Si tu consulta es urgente, también puedes contactarnos directamente por WhatsApp.
              </p>

              <!-- CTA WhatsApp -->
              <div style="text-align:center;margin:32px 0;">
                <a href="https://wa.me/529671456444?text=Hola%2C%20escrib%C3%AD%20por%20el%20formulario%20del%20sitio%20y%20necesito%20una%20respuesta%20urgente." style="display:inline-block;padding:12px 28px;background:#34D399;color:#0A1628;text-decoration:none;font-weight:600;border-radius:6px;font-size:15px;">
                  Escribir por WhatsApp
                </a>
              </div>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;">

              <!-- Firma -->
              <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.6;">
                <strong style="color:#0A1628;">Christian Noé Ramos López</strong><br>
                <span style="color:#6b7280;">Founder &amp; CTO · Norte Software S.A. de C.V.</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;background:#f7f8fa;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:12px;color:#6b7280;">
                <a href="https://nortesoftware.dev" style="color:#1A4ABA;text-decoration:none;">nortesoftware.dev</a> ·
                <a href="mailto:info@nortesoftware.dev" style="color:#1A4ABA;text-decoration:none;">info@nortesoftware.dev</a> ·
                +52 967 145 6444
              </p>
              <p style="margin:0;font-size:11px;color:#9ca3af;">
                Esta es una confirmación automática. Tu mensaje será respondido por una persona.
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
