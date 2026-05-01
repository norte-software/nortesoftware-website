"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { motion } from "motion/react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
  contactFormSchema,
  type ContactFormInput,
  TIPO_PROYECTO_LABELS,
} from "@/lib/contact-schema";

const TIPO_PROYECTO_OPTIONS = Object.entries(TIPO_PROYECTO_LABELS).map(
  ([value, label]) => ({ value, label }),
);

type SubmitStatus =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success" }
  | { type: "error"; message: string };

interface ContactFormProps {
  turnstileSiteKey: string;
}

/**
 * Form de contacto.
 *
 * Stack:
 *   - react-hook-form: estado y validación cliente
 *   - Zod: schema compartido con backend
 *   - @marsidev/react-turnstile: widget Cloudflare Turnstile
 *   - motion: animación del estado de éxito
 *
 * Estados visuales:
 *   - idle: form vacío listo para llenar
 *   - submitting: botón en loading, inputs deshabilitados
 *   - success: form reemplazado por mensaje de confirmación
 *   - error: mensaje rojo arriba del form, form re-habilitado
 *
 * Anti-spam:
 *   - Turnstile token requerido (validado client + server)
 *   - Server tiene rate limit por IP (3/hora)
 *   - Mínimo 20 chars en mensaje (filtra spam de 1 palabra)
 */
export function ContactForm({ turnstileSiteKey }: ContactFormProps) {
  const [status, setStatus] = useState<SubmitStatus>({ type: "idle" });
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nombre: "",
      email: "",
      empresa: "",
      telefono: "",
      tipoProyecto: undefined,
      mensaje: "",
      turnstileToken: "",
    },
  });

  const mensaje = watch("mensaje") ?? "";

  async function onSubmit(data: ContactFormInput) {
    setStatus({ type: "submitting" });

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            result.error ??
            "Algo salió mal. Por favor intenta de nuevo en un momento.",
        });
        // Reset Turnstile para que genere nuevo token
        turnstileRef.current?.reset();
        setValue("turnstileToken", "");
        return;
      }

      setStatus({ type: "success" });
      reset();
    } catch (err) {
      console.error("[ContactForm] Submit error:", err);
      setStatus({
        type: "error",
        message:
          "No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo.",
      });
      turnstileRef.current?.reset();
      setValue("turnstileToken", "");
    }
  }

  if (status.type === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-mint-accent/30 bg-mint-accent/5 p-8 md:p-12 text-center"
      >
        <div className="inline-flex items-center justify-center size-16 rounded-full bg-mint-accent/15 mb-6">
          <CheckCircle2 className="size-8 text-mint-accent" strokeWidth={1.75} />
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-bold text-ice-white mb-3">
          Mensaje enviado
        </h3>

        <p className="text-ice-white/70 text-base md:text-lg max-w-md mx-auto mb-6">
          Recibimos tu solicitud. Te responderemos en un máximo de
          48 horas hábiles.
        </p>

        <p className="text-xs text-ice-white/45">
          También te enviamos una confirmación a tu correo. Si no la ves,
          revisa tu carpeta de spam.
        </p>
      </motion.div>
    );
  }

  const isSubmitting = status.type === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      {status.type === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/5 p-4"
          role="alert"
        >
          <AlertCircle
            className="size-5 text-red-400 shrink-0 mt-0.5"
            aria-hidden
          />
          <div className="flex-1 text-sm text-red-300">{status.message}</div>
        </motion.div>
      )}

      <Input
        {...register("nombre")}
        label="Nombre completo"
        placeholder="María García"
        autoComplete="name"
        disabled={isSubmitting}
        error={errors.nombre?.message}
      />

      <Input
        {...register("email")}
        type="email"
        label="Correo electrónico"
        placeholder="maria@empresa.com"
        autoComplete="email"
        disabled={isSubmitting}
        error={errors.email?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          {...register("empresa")}
          label="Empresa"
          placeholder="Clínica San Lucas"
          autoComplete="organization"
          disabled={isSubmitting}
          error={errors.empresa?.message}
          optional
        />

        <Input
          {...register("telefono")}
          type="tel"
          label="Teléfono"
          placeholder="+52 967 123 4567"
          autoComplete="tel"
          disabled={isSubmitting}
          error={errors.telefono?.message}
          optional
        />
      </div>

      <Select
        {...register("tipoProyecto")}
        label="Tipo de proyecto"
        options={TIPO_PROYECTO_OPTIONS}
        placeholder="Selecciona una opción"
        disabled={isSubmitting}
        error={errors.tipoProyecto?.message}
        optional
      />

      <Textarea
        {...register("mensaje")}
        label="Mensaje"
        placeholder="Cuéntanos sobre tu proyecto: qué problema resolvemos, en qué tecnología piensas, plazos estimados..."
        rows={6}
        maxLength={2000}
        showCounter
        currentLength={mensaje.length}
        disabled={isSubmitting}
        error={errors.mensaje?.message}
      />

      {/* Turnstile widget */}
      <div className="flex flex-col gap-2">
        <Turnstile
          ref={turnstileRef}
          siteKey={turnstileSiteKey}
          options={{ theme: "dark", size: "flexible" }}
          onSuccess={(token) => setValue("turnstileToken", token)}
          onError={() => setValue("turnstileToken", "")}
          onExpire={() => setValue("turnstileToken", "")}
        />
        {errors.turnstileToken && (
          <p className="text-xs text-red-400" role="alert">
            {errors.turnstileToken.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Enviando...
          </>
        ) : (
          <>
            Enviar mensaje
            <span aria-hidden>→</span>
          </>
        )}
      </Button>

      <p className="text-xs text-ice-white/45">
        Al enviar este formulario aceptas que tratemos tu información de acuerdo
        con nuestro{" "}
        <a
          href="/privacidad"
          className="text-mint-accent/80 hover:text-mint-accent underline underline-offset-2"
        >
          Aviso de Privacidad
        </a>
        .
      </p>
    </form>
  );
}
