# NORTE SOFTWARE — Step 4 · Servicios + Form de Contacto

Este paquete agrega:

- Página `/servicios` con detalle expandido de los 4 servicios
- Página `/contacto` con form completo (Resend + Turnstile + rate limit)
- API route `/api/contacto` con validación server-side
- Componentes UI: Input, Textarea, Select, FormField
- ContactForm con react-hook-form + Zod
- Email templates (admin notification + auto-reply)
- Validación de variables de entorno (Zod)

---

## ARCHIVOS NUEVOS

```
src/app/
├── api/contacto/route.ts            ← API endpoint POST /api/contacto
├── contacto/page.tsx                ← /contacto con form
└── servicios/page.tsx               ← /servicios con detalle

src/components/
├── ui/
│   ├── Input.tsx                    ← input con validación
│   ├── Textarea.tsx                 ← textarea con contador
│   └── Select.tsx                   ← select con styled chevron
└── forms/
    └── ContactForm.tsx              ← form completo con Turnstile

src/lib/
├── contact-schema.ts                ← Zod schema compartido
├── env.ts                           ← validación env vars
├── resend.ts                        ← wrapper Resend
├── turnstile.ts                     ← verificación Turnstile server-side
├── rate-limit.ts                    ← rate limiter en memoria
└── email-templates/
    ├── admin-notification.ts        ← HTML email a info@
    └── auto-reply.ts                ← HTML email confirmación cliente
```

## ARCHIVOS ACTUALIZADOS

```
.env.example                         ← agregar nuevas vars
```

---

## PASO A PASO

### 1) Sincronizar y crear rama

```bash
cd ~/norte/sitio-web/nortesoftware-website
git checkout main
git pull origin main
git checkout -b feat/contact-form-services
```

### 2) Instalar dependencias nuevas

```bash
npm install resend react-hook-form @hookform/resolvers @marsidev/react-turnstile
```

Tamaños aproximados:
- `resend` — ~50 KB (SDK)
- `react-hook-form` — ~25 KB (sin re-renders innecesarios)
- `@hookform/resolvers` — ~5 KB (integración Zod)
- `@marsidev/react-turnstile` — ~10 KB (wrapper)

Total: ~90 KB en deps + JS del form (lazy-loaded en `/contacto`).

### 3) Copiar archivos del paquete

```bash
cp -r ~/Downloads/norte-step4/proyecto/* .
```

Verifica que aparecen los archivos nuevos:

```bash
ls -la src/app/api/contacto/
ls -la src/app/contacto/
ls -la src/app/servicios/
ls -la src/lib/
ls -la src/lib/email-templates/
ls -la src/components/forms/
```

### 4) Configurar variables de entorno LOCALES

Crea (o edita) `.env.local` en la raíz del proyecto:

```bash
cd ~/norte/sitio-web/nortesoftware-website
nano .env.local
```

Pega las siguientes variables y reemplaza los valores con los reales:

```bash
# Públicas
NEXT_PUBLIC_SITE_URL=https://nortesoftware.dev
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAADG1OVRjwX_HwJ2g

# Privadas (NUNCA al repo)
RESEND_API_KEY=re_TU_API_KEY_AQUI
TURNSTILE_SECRET_KEY=0x4_TU_SECRET_AQUI

# Destinatarios
CONTACT_EMAIL_TO=info@nortesoftware.dev
CONTACT_EMAIL_FROM=info@nortesoftware.dev
```

⚠️ **IMPORTANTE**:
- `RESEND_API_KEY` la copias de tu password manager (la que generaste en Resend)
- `TURNSTILE_SECRET_KEY` la copias de tu password manager (la que copiaste de Cloudflare Turnstile)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` ya está rellena con la pública: `0x4AAAAAADG1OVRjwX_HwJ2g`

Guarda el archivo (`Ctrl+O`, Enter, `Ctrl+X` en nano).

### 5) Configurar variables de entorno EN VERCEL (producción)

Después de probar local, antes de mergear:

1. Ve a `https://vercel.com/dashboard`
2. Selecciona tu proyecto `nortesoftware-website`
3. Tab **Settings** → **Environment Variables**
4. Agrega CADA una de estas variables (la mismas que en .env.local):

   - `NEXT_PUBLIC_SITE_URL` = `https://nortesoftware.dev`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = `0x4AAAAAADG1OVRjwX_HwJ2g`
   - `RESEND_API_KEY` = (tu API key de Resend)
   - `TURNSTILE_SECRET_KEY` = (tu secret key de Turnstile)
   - `CONTACT_EMAIL_TO` = `info@nortesoftware.dev`
   - `CONTACT_EMAIL_FROM` = `info@nortesoftware.dev`

5. Para cada variable, marca los 3 environments: **Production**, **Preview**, **Development**

6. **Save** después de cada una

### 6) Probar en local

```bash
npm run dev
```

Abre `http://localhost:3000/contacto` (Ctrl+Shift+R para evitar caché).

#### Validaciones del form

**Test 1: validación cliente**
- Submit sin llenar → debe mostrar errores: "El nombre debe tener al menos 2 caracteres", etc.
- Email inválido (e.g. "abc") → "Por favor ingresa un correo electrónico válido"
- Mensaje muy corto (e.g. "hola") → "Cuéntanos más sobre tu proyecto (mínimo 20 caracteres)"

**Test 2: Turnstile widget**
- Debe aparecer el widget de Cloudflare con tema oscuro
- Si no resuelve el challenge, no debe dejarte enviar
- Si Turnstile no carga (problema de red), botón submit muestra error

**Test 3: envío exitoso**
- Llena el form con datos válidos:
  - Nombre: "Chris Test"
  - Email: tu email personal (donde recibirás el auto-reply)
  - Mensaje: "Esta es una prueba del form de contacto del sitio web de Norte Software para verificar que todo funciona correctamente."
- Resuelve el Turnstile
- Click "Enviar mensaje"
- Debe aparecer pantalla de éxito verde

**Verificación**:
1. Abre `https://mail.google.com` con `chris@nortesoftware.dev`
2. Debe haber llegado un correo de "Norte Software" con tus datos
3. En tu email personal, debe haber llegado el auto-reply

**Test 4: rate limit**
- Envía 4 mensajes en menos de 1 hora
- El 4to debe mostrar error: "Has enviado demasiadas solicitudes..."

### 7) Probar /servicios

- `http://localhost:3000/servicios` carga
- 4 servicios con cards alternados izquierda/derecha
- Anchors: `/servicios#desarrollo`, `/servicios#ciberseguridad`, etc. funcionan
- Links de home `/servicios#desarrollo` (etc) llevan al servicio correcto

### 8) Lint y tipos

```bash
npm run lint
npx tsc --noEmit
```

Ambos deben pasar limpios.

### 9) Build de producción

```bash
npm run build
```

Verifica que aparezcan en la lista:
- `/contacto`
- `/servicios`
- `/api/contacto` (será marcado como `λ` route, no estático)

### 10) Commit y push

```bash
git add .
git commit -m "feat(contact): página servicios + form de contacto con Resend

- Página /servicios con detalle expandido por servicio
  (anchors #desarrollo, #ciberseguridad, #consultoria, #mantenimiento)
- Página /contacto con form completo
- ContactForm con react-hook-form + Zod validation
- Cloudflare Turnstile como anti-bot
- API route /api/contacto con:
  * Validación server-side (Zod)
  * Verificación Turnstile contra Cloudflare
  * Rate limiting (3 req/h por IP)
  * Envío de email a info@ (admin notification)
  * Auto-reply al cliente (best-effort)
- HTML email templates profesionales
- Componentes UI: Input, Textarea, Select
- Validación de env vars al iniciar (fail-fast)
- Sanitización HTML para prevenir XSS en emails"

git push origin feat/contact-form-services
```

### 11) PR + merge en GitHub

1. Abre el repo
2. Banner "Compare & pull request" → click
3. Verifica el diff
4. **Antes de mergear**, asegúrate de que las env vars en Vercel estén configuradas (paso 5)
5. "Create pull request" → "Merge pull request" → "Confirm merge"
6. "Delete branch"

### 12) Sincroniza local

```bash
git checkout main
git pull origin main
git branch -d feat/contact-form-services
```

### 13) Verificar producción

Espera 2-3 min para que Vercel deploye, luego:

1. Abre `https://nortesoftware.dev/contacto` en incógnito
2. Llena el form con datos reales
3. Verifica que llegue el correo a info@ y el auto-reply a tu email
4. Si algo falla, revisa Vercel Logs (`Dashboard → Project → Logs`)

---

## DECISIONES TÉCNICAS

### Por qué Resend (no Nodemailer/SendGrid/Postmark)

- **DX excepcional**: API simple, SDK de TypeScript first-class
- **Pricing transparente**: 3,000 emails/mes gratis, $20/mes por 50,000
- **DNS verification**: SPF + DKIM automático con UI clara
- **Built for devs**: docs y examples enfocados a Next.js

### Por qué Cloudflare Turnstile (no reCAPTCHA)

- **Privacy-friendly**: no usa tracking de Google
- **Mejor UX**: la mayoría de visitantes legítimos no ven challenge
- **Performance**: widget más liviano (~30 KB vs 60 KB de reCAPTCHA)
- **Gratis ilimitado**: sin costo independiente del volumen
- **Mismo proveedor que tu DNS**: integración natural

### Rate limiting en memoria vs Redis

Por ahora rate limit es en memoria. Razones:
- Tráfico esperado bajo (sitio nuevo, B2B)
- Cada cold start de Vercel tiene su propio Map (acceptable)
- Turnstile es la primera barrera, rate limit es 2da línea

**Cuando migrar a Upstash/Vercel KV**:
- Cuando recibas más de ~100 forms/día
- Cuando tengas múltiples instances escalando
- Cuando necesites ban-list persistente

### Auto-reply best-effort vs blocking

Si el auto-reply al cliente falla (e.g. dirección bouncea), NO devolvemos error
al usuario. Razón: el correo principal a info@ SÍ se envió, así que el lead no se pierde.
El cliente verá su mensaje como exitoso, simplemente no recibirá la confirmación.

Esto se logea en console (visible en Vercel Logs) para debugging.

### Validación cliente vs servidor

**Cliente**: react-hook-form + zodResolver. Da feedback inmediato al usuario.
**Servidor**: Zod parsing del body antes de procesar. Es la barrera real.

NUNCA confiar solo en validación cliente — un atacante puede saltarse el JS
y enviar request directo. La validación server-side es ley.

---

## TROUBLESHOOTING

### "Variables de entorno inválidas" al iniciar dev

Falta una env var en `.env.local`. Revisa que las 6 estén con valor real
(no vacías ni con `TODO`).

### Turnstile widget no aparece

- Verifica que `NEXT_PUBLIC_TURNSTILE_SITE_KEY` tenga la site key correcta
- Verifica que `localhost` esté en la lista de hostnames del widget en Cloudflare
- Abre consola del navegador y busca errores de Turnstile

### Form se envía pero correo no llega

- Verifica que `chris@nortesoftware.dev` exista en Workspace
- Verifica que el dominio esté Verified en Resend
- Revisa logs: `npm run dev` muestra errores en terminal
- Revisa Resend dashboard: tab "Emails" debe mostrar el correo (sent/bounced/etc)

### En producción funciona local pero no Vercel

- Probable causa: env vars no configuradas en Vercel
- Ve a Vercel → Project Settings → Environment Variables
- Después de agregar/cambiar env vars, **redeploy** el último commit

---

## QUÉ SIGUE (Step 5)

Posibles mejoras futuras:

- **Step 5A — SEO avanzado**: structured data más rico, sitemap dinámico, og-image generado, schema FAQPage
- **Step 5B — Blog/casos de estudio**: cuando tengas clientes, agregar `/casos` con casos detallados (mucho más poderoso que testimonios genéricos)
- **Step 5C — Analytics privacidad-friendly**: Plausible o Umami (sin cookies, sin GDPR drama)
- **Step 5D — i18n English**: si decides exportar a clientes US/CA, sitio en inglés con contenido localizado

Cuando estés listo para alguno de esos, avísame.
