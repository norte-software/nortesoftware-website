import { env } from "@/lib/env";

/**
 * Verifica un token de Turnstile contra el endpoint de Cloudflare.
 *
 * El cliente obtiene un token cuando completa el widget. Ese token
 * lo enviamos al servidor, y aquí lo validamos contra Cloudflare
 * para confirmar que es legítimo.
 *
 * IMPORTANTE: NUNCA confíes solo en validación cliente. Un atacante
 * puede saltarse el widget y enviar request directo al endpoint.
 * Esta verificación server-side es la barrera real anti-bot.
 *
 * Returns:
 *   true: token válido, request es de un humano (probablemente)
 *   false: token inválido, expirado, o reusado (rechazar request)
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  if (!token) return false;

  const formData = new URLSearchParams();
  formData.append("secret", env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);
  if (remoteIp) formData.append("remoteip", remoteIp);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (!response.ok) {
      console.error(
        "[Turnstile] Verification request failed:",
        response.status,
      );
      return false;
    }

    const data = (await response.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.warn(
        "[Turnstile] Token rejected:",
        data["error-codes"]?.join(", "),
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error("[Turnstile] Network error during verification:", err);
    return false;
  }
}
