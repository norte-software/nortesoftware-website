# NORTE SOFTWARE — Step 1 · Cimientos del proyecto

Este paquete contiene los **cimientos del sitio web**. NO incluye Header,
Hero, ni secciones reales — eso es Step 2 en adelante. Lo que sí incluye:

- Estructura de carpetas profesional (`src/app`, `src/lib`, `src/components`)
- Configuración Tailwind v4 con tokens de marca (paleta + fonts)
- Layout root con metadata global, fonts, structured data Schema.org
- Headers de seguridad estrictos (CSP, HSTS, etc.)
- Validación de variables de entorno con Zod
- Sitemap y robots.txt automáticos
- Página 404 personalizada
- Home placeholder con estética de marca aplicada (verifica que todo funciona)
- Assets de marca optimizados (favicon, apple-touch-icon, logos)

---

## PASO A PASO (sigue en orden)

### 1) Backup primero

```bash
cd ~/norte/sitio-web/nortesoftware-website
git status                # asegúrate de no tener cambios sin commitear
git checkout -b cimientos # rama nueva para este step
```

### 2) Copiar archivos al repo

Estructura que vas a obtener tras copiar:

```
nortesoftware-website/
├── public/
│   ├── favicon.ico              ← NUEVO
│   ├── apple-touch-icon.png     ← NUEVO
│   ├── icon-192.png             ← NUEVO
│   ├── icon-512.png             ← NUEVO
│   ├── site.webmanifest         ← NUEVO
│   └── images/
│       ├── logo-norte-software.png        ← NUEVO
│       ├── logo-norte-software@2x.png     ← NUEVO
│       ├── isotipo-claro.png              ← NUEVO
│       ├── isotipo-claro@2x.png           ← NUEVO
│       └── isotipo-navy.png               ← NUEVO
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← REEMPLAZA el existente
│   │   ├── page.tsx             ← REEMPLAZA el existente
│   │   ├── globals.css          ← REEMPLAZA el existente
│   │   ├── sitemap.ts           ← NUEVO
│   │   ├── robots.ts            ← NUEVO
│   │   └── not-found.tsx        ← NUEVO
│   ├── lib/
│   │   ├── constants.ts         ← NUEVO
│   │   ├── env.ts               ← NUEVO
│   │   └── seo.ts               ← NUEVO
│   └── components/
│       ├── ui/                  ← carpeta vacía, lista para Step 2
│       ├── layout/              ← carpeta vacía, lista para Step 2
│       ├── sections/            ← carpeta vacía, lista para Step 2
│       └── visuals/             ← carpeta vacía, lista para Step 2
├── next.config.ts               ← REEMPLAZA el existente
└── .env.example                 ← NUEVO (referencia)
```

Comando en terminal (asumiendo que descomprimes el zip en `~/Downloads/norte-cimientos`):

```bash
cd ~/norte/sitio-web/nortesoftware-website

# Borra el page.tsx default de create-next-app si no lo has tocado
rm -f src/app/page.tsx src/app/layout.tsx src/app/globals.css

# Copia todo desde el paquete
cp -r ~/Downloads/norte-cimientos/proyecto/* .
cp ~/Downloads/norte-cimientos/proyecto/.env.example .

# Verifica
ls -la public/ public/images/ src/app/ src/lib/
```

### 3) Instalar dependencias nuevas

```bash
npm install zod
```

Eso es todo por ahora. Las siguientes dependencias se instalan en steps
posteriores cuando se necesiten:

- `resend` — Step donde construyamos /contacto
- `@marsidev/react-turnstile` — Step donde construyamos /contacto
- `motion` — Step donde añadamos animaciones (Hero, transiciones)
- `cobe` — Step donde construyamos el globo del Hero
- `lucide-react` — Step donde necesitemos iconos UI

### 4) Crear `.env.local` (TEMPORAL, valores placeholder)

Para que el proyecto compile en local mientras no tengas Resend y Turnstile
configurados aún, crea un `.env.local` con valores dummy que pasen la
validación Zod:

```bash
cat > .env.local <<'EOF'
RESEND_API_KEY=re_dev_placeholder_sin_funcionalidad_real
CONTACT_EMAIL_TO=chris@nortesoftware.dev
CONTACT_EMAIL_FROM=contacto@nortesoftware.dev
TURNSTILE_SECRET_KEY=dev_placeholder_sin_funcionalidad
NEXT_PUBLIC_TURNSTILE_SITE_KEY=dev_placeholder_sin_funcionalidad
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
```

⚠️ Estos valores hacen que el build pase y el sitio levante, pero el
form de contacto NO funcionará hasta que pongas keys reales (eso lo
hacemos en el step de /contacto).

### 5) Probar en local

```bash
npm run dev
```

Abre http://localhost:3000 y deberías ver:

- Fondo navy oscuro con patrón sutil de puntos azules
- Isotipo escudo-brújula con glow azul sutil
- Tagline "El norte de tu tecnología." en azul eléctrico (League Spartan)
- Headline "Software confiable, hecho a la medida." con la segunda parte
  en gradiente azul→verde
- Subtítulo en DM Sans
- Botón "Iniciar proyecto" con borde verde menta (efecto glow al hover)
- Línea decorativa azul→verde abajo
- Texto "Sitio en construcción · Cimientos verificados"

Verifica también:
- http://localhost:3000/sitemap.xml → debe mostrar XML
- http://localhost:3000/robots.txt → debe mostrar reglas
- http://localhost:3000/ruta-que-no-existe → debe ver 404 personalizada

### 6) Verificar lint y types

```bash
npm run lint
npx tsc --noEmit
```

Ambos deben pasar sin errores. Si hay error, repórtalo y lo arreglamos.

### 7) Verificar headers de seguridad

Build de producción local para que se apliquen los headers (en `npm run dev`
NO se aplican):

```bash
npm run build
npm run start
```

En otra terminal:

```bash
curl -I http://localhost:3000
```

Debes ver headers: `Content-Security-Policy`, `Strict-Transport-Security`,
`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy`, `Permissions-Policy`.

### 8) Commit + push

Si todo funciona, sigue Conventional Commits:

```bash
git add .
git commit -m "feat: cimientos del proyecto

- Configuración Tailwind v4 con tokens de marca
- Layout root con metadata global y JSON-LD Organization
- Headers de seguridad estrictos (CSP, HSTS, X-Frame-Options)
- Validación de variables de entorno con Zod
- Sitemap y robots automáticos
- Página 404 personalizada
- Home placeholder con estética aplicada
- Assets de marca (favicon, logos, iconos PWA)"

git push origin cimientos
```

Después merge a `main` cuando confirmemos que todo se ve bien.

---

## QUÉ SIGUE (Step 2)

Cuando confirmes que cimientos están vivos, arrancamos:

1. **Header** con nav (Inicio, Servicios, Industrias, Nosotros, Contacto) + CTA
2. **Mobile menu** (drawer responsive)
3. **Footer** con redes (sin LinkedIn), contacto, copyright legal
4. **Layout shell** que envuelve todas las páginas

Ese step va a tomar ~30-40 min de generación de código. Te paso el zip
del Step 2 y lo aplicas igual que este.

---

## NOTAS Y DECISIONES TOMADAS

Lee `DECISIONES.md` en este mismo paquete para entender por qué se eligieron
ciertas variantes de assets, configuraciones específicas de seguridad,
y trade-offs técnicos.
