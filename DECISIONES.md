# DECISIONES.md — Step 1 · Cimientos

Decisiones técnicas tomadas en este paquete y por qué.
Si algo no te late, dímelo y ajustamos antes de seguir.

---

## ASSETS

### Favicon / apple-touch-icon / android-chrome
**Variante elegida**: la `5` (isotipo solo, fondo navy)

**Por qué**: las otras variantes traían el logo completo con texto
"NORTE SOFTWARE" embebido. A 32×32 (favicon) o 180×180 (apple-touch),
el texto se vuelve borroso e ilegible. El isotipo solo se reconoce
mejor a tamaños chicos y mantiene reconocimiento de marca.

### Favicon.ico
**Generado**: ICO multi-size (16×16, 32×32, 48×48) desde el PNG isotipo
deep-navy 64×64 con Pillow (Lanczos resampling).

**Por qué**: Chrome y Firefox modernos prefieren PNG vía `<link icon>`,
pero IE legacy y algunos lectores RSS aún piden `favicon.ico` de raíz.
Tener ambos cubre 100% de clientes sin coste.

### "SVG" del paquete original — descartados
**Decisión**: NO se usaron los archivos `.svg` del zip original.

**Por qué**: tras inspección de bytes, todos los SVG tenían `<image
xlink:href="data:image/png;base64,...">` adentro, es decir, son PNG
embebidos en wrapper SVG. No escalan vectorialmente. Ocupan 130-400KB
cada uno con la misma calidad que un PNG de 30KB.

**Acción futura**: si tu diseñadora puede entregarte SVG vectoriales
reales (exportados desde Illustrator/Figma como "outlines"), los
sustituimos. Mientras tanto, los PNG en multiple resoluciones que
trae el paquete cubren todo lo necesario con `next/image`.

---

## STACK TÉCNICO

### Tailwind v4 (no v3)
**Decisión**: configuración en CSS via `@theme`, no en `tailwind.config.ts`.

**Por qué**: Next.js 16 viene con Tailwind v4 por defecto en su CLI.
v4 elimina el archivo de config JS y mueve tokens a CSS. Es el camino
oficial hacia adelante. Si tu proyecto fue generado con `create-next-app`
reciente, ya está en v4.

**Cómo verificarlo en tu proyecto**: revisa `package.json`. Si dice
`"tailwindcss": "^4.x"` estás bien. Si dice `^3.x`, avísame y ajusto
el `globals.css` a sintaxis v3.

### Fonts via `next/font/google`
**Decisión**: League Spartan (display) + DM Sans (body) cargadas con
`next/font/google`, no con `<link>` desde Google Fonts CDN.

**Por qué**:
1. Next.js auto-hostea las fuentes en build → cero requests externos
2. CSP más estricta (no necesitas allow-list de googleapis.com)
3. Mejor performance (no FOUC, no race con CSS)
4. Mejor privacidad (Google no ve IPs de tus visitantes)

### Zod para validación de env
**Decisión**: validar `process.env` al iniciar la app, fallar el build
si falta algo crítico.

**Por qué**: prevenible 100% el escenario "deploy a producción y el
form está roto porque me olvidé `RESEND_API_KEY`". Build falla local,
nunca llega a producción rota.

---

## SEGURIDAD

### CSP estricta con `'unsafe-inline'` solo en script-src y style-src
**Por qué `'unsafe-inline'` es necesario**:
- Next.js inyecta scripts inline para hidratación
- Tailwind v4 inyecta estilos críticos inline
- Sin esto, el sitio no renderiza

**Por qué `'unsafe-eval'` está PROHIBIDO**:
- Next.js no lo necesita en producción
- Permitirlo abre puerta a XSS via `eval()` y `new Function()`

**Trade-off aceptado**: `'unsafe-inline'` es menos ideal que CSP con
nonces, pero implementar nonces requiere middleware con per-request
state que añade latencia y complejidad. Para sitio marketing estático,
no vale la pena. Si algún día corremos en edge runtime con SSR dinámico,
revisamos.

### HSTS con preload
**Decisión**: `max-age=63072000; includeSubDomains; preload`

**Por qué 2 años**: requisito del programa hsts-preload de Chromium.
Una vez en la lista preload, el navegador FORZA HTTPS antes de
contactar el sitio. Antes de pedir inclusión en la lista, debemos
estar 100% seguros que TODO el dominio (y subdominios) corre en HTTPS,
incluyendo subdominios futuros. Listing es difícil de revertir.

**Acción**: no pedir inclusión hasta tener el sitio estable >30 días
y haber confirmado que ningún subdominio crítico (mail, api, etc.)
queda fuera de HTTPS.

### `frame-ancestors 'none'` + `X-Frame-Options DENY`
**Decisión**: redundante a propósito.

**Por qué**: navegadores modernos respetan CSP `frame-ancestors`,
pero IE 11 y algunas versiones de Edge legacy solo respetan
`X-Frame-Options`. Ambos no cuestan nada y cubren más clientes.

### Permissions-Policy denegando todo lo no-necesario
**Por qué**: defense in depth. Aunque hoy no usamos cámara/mic/USB,
si mañana alguien añade una librería que intente acceder, el
navegador la bloquea automáticamente. Cero impacto, máxima
protección contra librerías comprometidas.

---

## SEO

### Schema.org Organization en layout root
**Decisión**: JSON-LD inyectado en `<body>` del layout.

**Por qué**: Google usa structured data para Knowledge Graph. Salud
privada es sector que se busca por nombre + ciudad → estar en
Knowledge Graph mejora click-through rate y autoridad percibida.

### `robots.txt` allow `/` con disallow `/api/` y `/_next/`
**Por qué**: rutas de API no deben aparecer en resultados de
búsqueda (riesgo de scrapers atacándolas). `/_next/` son assets
internos de Next.js sin valor SEO.

---

## CONTENIDO PRELIMINAR

### Industrias listadas en `constants.ts`
Salud privada (principal) + Logística, Fintech, Retail, Educación,
Legal, Manufactura, Otros.

**Cambios fáciles**: editar `INDUSTRIES` en `src/lib/constants.ts`.
Todos los componentes que dependan se actualizan automáticamente.

### Pilares (5)
Dirección clara · Seguridad integrada · Transparencia · Continuidad ·
Especialización.

### Servicios (4)
Desarrollo a la medida · Auditoría y protección · Consultoría
tecnológica · Soporte y evolución.

**Acción tuya**: revisa estos copys en `src/lib/constants.ts` antes
de Step 2. Si quieres cambiar texto, redacciones, o agregar/quitar
items, hazlo ahí. Los componentes que escriba en Step 2 los
consumirán de ese archivo.

---

## PENDIENTES PARA STEPS FUTUROS

- [ ] Step 2: Header + Footer + mobile menu
- [ ] Step 3: Hero con globo terráqueo (cobe library)
- [ ] Step 4: Sección Pilares + Servicios + Industrias
- [ ] Step 5: Página /servicios detallada
- [ ] Step 6: Página /contacto con form (Resend + Turnstile + rate limit + Zod)
- [ ] Step 7: SEO técnico final + Lighthouse pass
- [ ] Step 8: Deploy a Cloudflare Pages
