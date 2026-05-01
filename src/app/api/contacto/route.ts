import { NextResponse, type NextRequest } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/resend";
import { adminNotificationTemplate } from "@/lib/email-templates/admin-notification";
import { autoReplyTemplate } from "@/lib/email-templates/auto-reply";
import { env } from "@/lib/env";

/**
 * POST /api/contacto
 *
 * Flujo:
 *
 *   1. Extraer IP del request
 *   2. Rate limit check (3 req/h por IP)
 *   3. Parse + validate body con Zod
 *   4. Verify Turnstile token con Cloudflare
 *   5. Send admin notification email a info@
 *   6. Send auto-reply email al cliente
 *   7. Return success
 *
 * Errores devueltos:
 *   400 - body inválido o turnstile inválido
 *   429 - rate limited
 *   500 - falla al enviar correo (configurar Resend, etc.)
 */
export async function POST(request: NextRequest) {
  // 1. IP para rate limiting
  // Vercel pone la IP real en x-forwarded-for. Tomamos la primera (la del cliente).
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  // 2. Rate limit
  const rateLimitResult = checkRateLimit(ip);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error:
          "Has enviado demasiadas solicitudes. Por favor intenta de nuevo más tarde.",
        retryAfterSeconds: rateLimitResult.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds ?? 3600),
        },
      },
    );
  }

  // 3. Parse + validate
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Cuerpo de la petición inválido" },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        error: "Datos del formulario inválidos",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // 4. Verify Turnstile
  const turnstileValid = await verifyTurnstileToken(
    data.turnstileToken,
    ip !== "unknown" ? ip : undefined,
  );
  if (!turnstileValid) {
    return NextResponse.json(
      {
        error:
          "La verificación anti-bot no pudo completarse. Por favor recarga la página e intenta de nuevo.",
      },
      { status: 400 },
    );
  }

  // 5. Send admin notification
  const adminEmailResult = await sendEmail({
    to: env.CONTACT_EMAIL_TO,
    subject: `Nueva solicitud de ${data.nombre} (${data.email})`,
    html: adminNotificationTemplate(data),
    replyTo: data.email,
  });

  if (adminEmailResult !== true) {
    console.error("[/api/contacto] Failed to send admin notification:", adminEmailResult);
    return NextResponse.json(
      {
        error:
          "No pudimos procesar tu solicitud en este momento. Por favor escríbenos directamente a info@nortesoftware.dev.",
      },
      { status: 500 },
    );
  }

  // 6. Send auto-reply (best effort — si falla, NO devolvemos error
  //    porque el correo principal SÍ se envió y el cliente verá el form como exitoso)
  const autoReplyResult = await sendEmail({
    to: data.email,
    subject: "Recibimos tu mensaje · Norte Software",
    html: autoReplyTemplate(data.nombre),
  });

  if (autoReplyResult !== true) {
    console.warn("[/api/contacto] Auto-reply failed (non-fatal):", autoReplyResult);
    // No retornamos error porque el lead ya quedó en info@
  }

  // 7. Success
  return NextResponse.json(
    { success: true, message: "Mensaje enviado correctamente." },
    { status: 200 },
  );
}

/**
 * Métodos no permitidos. Forzar 405 para GET/PUT/DELETE etc.
 */
export async function GET() {
  return NextResponse.json(
    { error: "Método no permitido" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
