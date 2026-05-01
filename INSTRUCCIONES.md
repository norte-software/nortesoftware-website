# NORTE SOFTWARE — Step 3 · Home Real

Este paquete reemplaza el placeholder del home con el home **real**:
Hero con globo terráqueo interactivo, sección Pilares, Servicios,
Industrias (con Salud destacada), Stack y CTA final.

---

## ARCHIVOS NUEVOS

```
src/components/
├── ui/
│   ├── Section.tsx              ← wrapper de secciones con padding
│   └── SectionHeader.tsx        ← eyebrow + title + description con stagger
├── sections/
│   ├── Hero.tsx                 ← hero con globo cobe
│   ├── PillarsSection.tsx       ← 5 pilares con íconos
│   ├── ServicesSection.tsx      ← 4 servicios en cards 2x2
│   ├── IndustriesSection.tsx    ← Salud destacada + 7 secundarias
│   ├── StackSection.tsx         ← pills de tecnologías
│   └── FinalCTA.tsx             ← CTA grande antes del footer
└── visuals/
    └── Globe.tsx                ← globo terráqueo con cobe
```

## ARCHIVOS MODIFICADOS

```
src/app/page.tsx                 ← orquesta todas las secciones
```

---

## PASO A PASO

### 1) Sincronizar local + nueva rama

```bash
cd ~/norte/sitio-web/nortesoftware-website
git checkout main
git pull origin main
git checkout -b feat/home-sections
```

### 2) Instalar dependencias nuevas

```bash
npm install cobe
```

`cobe` es la única dependencia nueva (~12 KB). Pesa nada.

### 3) Copiar archivos del paquete

```bash
cp -r ~/Downloads/norte-step3/proyecto/* .
```

Verifica que aparecen los archivos nuevos:

```bash
ls -la src/components/ui/Section.tsx
ls -la src/components/ui/SectionHeader.tsx
ls -la src/components/sections/
ls -la src/components/visuals/Globe.tsx
```

### 4) Probar en local

```bash
npm run dev
```

Abre `http://localhost:3000`. **Recuerda hacer Ctrl+Shift+R para evitar caché.**

#### Hero
- Texto a la izquierda con animación de entrada cascada
- Globo terráqueo a la derecha rotando solo
- Markers en mint accent en CDMX, NYC, SF, London, Tokyo, Singapur, Tuxtla
- Puedes **arrastrar el globo** para rotarlo manualmente
- Botones "Iniciar proyecto" (verde menta filled) + "Solicitar propuesta" (ghost)
- Indicador "Conoce más ↓" abajo en desktop

#### Pilares (al hacer scroll)
- Eyebrow "CÓMO TRABAJAMOS"
- Título "Cinco pilares que nos definen"
- Grid de 5 cards en desktop (2 cols en tablet, 1 col en mobile)
- Cada card: número editorial (01, 02...), ícono, título, descripción
- Hover: la card se aclara sutilmente

#### Servicios
- Grid 2x2 de cards grandes
- 4 servicios: Desarrollo, Auditoría, Consultoría, Soporte
- Cada card es link a `/servicios#id`
- Hover: card se eleva, flecha diagonal se mueve, glow sutil
- Línea decorativa arriba aparece al hover

#### Industrias
- Card grande de "Salud privada" a la izquierda con badge animado
- Grid 3x2 de las otras industrias a la derecha
- En mobile: todas apiladas en 1 columna con Salud arriba

#### Stack
- Pills horizontales de TypeScript, Next.js, React, etc.
- Hover: pill se ilumina en electric blue

#### FinalCTA
- Bloque grande con borde y glow ambiental
- 3 botones: Iniciar proyecto + Solicitar propuesta + WhatsApp

#### Validaciones generales
- Header se vuelve glass al hacer scroll
- FAB de WhatsApp aparece a los 1.2s
- Mobile menu sigue funcionando bien
- Navegación entre páginas funciona (`/privacidad`, `/terminos`)

### 5) Lint y types

```bash
npm run lint
npx tsc --noEmit
```

Ambos deben pasar limpios. Si tira error, pégamelo.

### 6) Build de producción

```bash
npm run build
npm run start
```

Verifica que se ve igual. Performance debe ser excelente — el globo es lazy-loaded así que no afecta first paint.

Cuando termines, `Ctrl+C` para parar.

### 7) Commit y push

```bash
git add .
git commit -m "feat(home): hero con globo + pilares + servicios + industrias + CTA

- Hero rediseñado con globo terráqueo interactivo (cobe ~12KB)
- Sección Pilares: 5 cards con íconos y números editoriales
- Sección Servicios: grid 2x2 con cards animadas, links a /servicios#id
- Sección Industrias: Salud privada destacada como card grande,
  7 industrias secundarias en grid
- Sección Stack: pills de tecnologías (sin métricas inventadas)
- FinalCTA: bloque de cierre con primary + secondary + WhatsApp
- Componentes reusables: Section, SectionHeader
- Animaciones con stagger y scroll-triggered reveals
- Respeta prefers-reduced-motion"

git push origin feat/home-sections
```

### 8) PR + merge en GitHub

1. Abre el repo
2. "Compare & pull request"
3. Verifica el diff
4. "Create pull request" → "Merge pull request" → "Confirm merge"
5. "Delete branch"

### 9) Sincroniza local

```bash
git checkout main
git pull origin main
git branch -d feat/home-sections
```

---

## DECISIONES TÉCNICAS

### cobe vs Three.js para el globo

**cobe**: 12 KB, single draw call, API simple, optimizado para esto.
**Three.js**: 150+ KB, mucho más capable pero overkill para un globo decorativo.

cobe es lo que usan Linear, Vercel, GitHub. Es el estándar para este caso.

### Lazy load del globo

`dynamic(() => import(...), { ssr: false })`. El globo usa WebGL y `document`,
no funciona en SSR. Con lazy load: el HTML del hero se sirve inmediatamente,
el globo aparece cuando carga (con un placeholder pulse mientras tanto).
Esto mantiene el First Contentful Paint excelente.

### Por qué el hero NO tiene métricas

Por decisión expresa. Mostrar "12 proyectos" cuando la S.A. de C.V. firma
mañana sería técnicamente cierto (proyectos del fundador) pero comunicacionalmente
impreciso. Mejor sin números que con números cuestionables.

Cuando tengas casos de estudio reales con clientes de Norte Software,
agregamos sección "Trabajo realizado" con casos detallados (mucho más
poderoso que un contador anónimo).

### Motion + scroll-triggered

Cada sección anima al entrar al viewport con `viewport={{ once: true }}`.
Esto significa que la animación corre UNA vez (no cada vez que scrolleas).
Más performante y menos distractor.

`prefers-reduced-motion` es respetado globalmente vía nuestro CSS reset.
Usuarios con reducción de movimiento activada ven el sitio sin animaciones.

### Asimetría intencional

- Hero: texto izquierda + globo derecha (no centrado)
- Pillars: header alineado izquierda (no centrado)
- Industries: card grande izquierda + grid pequeño derecha
- Stack: pills wrap libre (no centrado)

Esto rompe la simetría predecible de "AI templates" y le da carácter editorial
al sitio. Es deliberado.

---

## QUÉ SIGUE (Step 4)

Después de que mergees Step 3:

**Step 4: Página /servicios y página /contacto con form**

- /servicios con detalle expandido por servicio + casos por industria
- /contacto con form completo (Resend + Cloudflare Turnstile + rate limit)
- Aquí necesitas haber configurado:
  - [ ] Resend (API key + dominio verificado)
  - [ ] Cloudflare Turnstile (site key + secret key)
  - [ ] Google Workspace (info@ apuntando a tu inbox)

Avísame cuando estés listo para Step 4.
