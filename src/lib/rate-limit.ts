/**
 * Rate limiter en memoria para el endpoint de contacto.
 *
 * Estrategia: Map<IP, timestamps[]>. Por cada request guardamos el
 * timestamp. Antes de aceptar uno nuevo, filtramos los que son más
 * viejos que la ventana de tiempo y vemos cuántos quedan.
 *
 * Limitaciones:
 * - Memoria: se pierde al reiniciar el server. En Vercel cada cold
 *   start es nuevo. Para producción con alta carga conviene migrar
 *   a Redis (Upstash) o Vercel KV. Para este sitio (pocos visitantes)
 *   está bien.
 * - Single instance: si Vercel escala a múltiples instancias, cada
 *   una tiene su propio Map. Un atacante podría saltarse el límite
 *   pegándole a varias instancias. Para nuestro caso es aceptable
 *   porque el form está protegido con Turnstile como primera barrera.
 *
 * Para Step 4 tier es perfecto. Optimizar después si scale lo demanda.
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 3,
  windowMs: 60 * 60 * 1000, // 1 hora
};

const ipRequestsMap = new Map<string, number[]>();

/**
 * Verifica si una IP ha excedido el límite. Si no, registra el request
 * actual y devuelve true (allowed).
 *
 * Returns:
 *   { allowed: true } - la IP puede continuar
 *   { allowed: false, retryAfterSeconds } - la IP está rate-limited
 */
export function checkRateLimit(
  ip: string,
  config: RateLimitConfig = DEFAULT_CONFIG,
): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Obtener historial de la IP, filtrar requests viejos
  const history = (ipRequestsMap.get(ip) ?? []).filter(
    (timestamp) => timestamp > windowStart,
  );

  if (history.length >= config.maxRequests) {
    // Calcular cuánto falta para que pueda volver a enviar
    const oldestInWindow = history[0];
    const retryAfterMs = oldestInWindow + config.windowMs - now;
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  // Aceptar request, agregar timestamp
  history.push(now);
  ipRequestsMap.set(ip, history);

  // Cleanup periódico: limpiar IPs que no han hecho requests recientes
  // Solo si el Map crece mucho (evita memory leak)
  if (ipRequestsMap.size > 1000) {
    cleanupStaleEntries(windowStart);
  }

  return { allowed: true };
}

function cleanupStaleEntries(cutoffTimestamp: number): void {
  for (const [ip, history] of ipRequestsMap.entries()) {
    const filtered = history.filter((t) => t > cutoffTimestamp);
    if (filtered.length === 0) {
      ipRequestsMap.delete(ip);
    } else {
      ipRequestsMap.set(ip, filtered);
    }
  }
}
