import { z } from "zod";

/**
 * Schema de validación del formulario de contacto.
 *
 * Compartido entre cliente (react-hook-form resolver) y servidor (API route).
 * Single source of truth de validación.
 *
 * Reglas:
 * - nombre: requerido, 2-100 chars
 * - email: requerido, formato válido
 * - mensaje: requerido, 20-2000 chars (mínimo evita "hola" como mensaje)
 * - empresa: opcional, máx 100 chars
 * - telefono: opcional, formato libre pero validamos longitud
 * - tipoProyecto: opcional, debe ser uno de los enum
 * - turnstileToken: requerido (lo agrega el componente Turnstile)
 */
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Por favor ingresa un correo electrónico válido")
    .max(254, "El correo es demasiado largo"),

  empresa: z
    .string()
    .trim()
    .max(100, "El nombre de la empresa es muy largo")
    .optional()
    .or(z.literal("")),

  telefono: z
    .string()
    .trim()
    .max(30, "El teléfono es muy largo")
    .optional()
    .or(z.literal("")),

  tipoProyecto: z
    .enum([
      "desarrollo",
      "ciberseguridad",
      "consultoria",
      "mantenimiento",
      "otros",
    ])
    .optional(),

  mensaje: z
    .string()
    .trim()
    .min(20, "Cuéntanos más sobre tu proyecto (mínimo 20 caracteres)")
    .max(2000, "El mensaje es demasiado largo (máximo 2000 caracteres)"),

  turnstileToken: z
    .string()
    .min(1, "Por favor completa la verificación anti-bot"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Etiquetas legibles para tipoProyecto (uso en UI y emails).
 */
export const TIPO_PROYECTO_LABELS: Record<
  NonNullable<ContactFormInput["tipoProyecto"]>,
  string
> = {
  desarrollo: "Desarrollo de software",
  ciberseguridad: "Ciberseguridad / Auditoría",
  consultoria: "Consultoría tecnológica",
  mantenimiento: "Soporte y mantenimiento",
  otros: "Otro / No estoy seguro",
};
