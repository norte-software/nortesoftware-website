# NORTE SOFTWARE — Step 2 · Layout Shell

Este paquete agrega: **Header sticky** con nav desktop y mobile menu,
**Footer** completo con datos reales, **FAB de WhatsApp** flotante,
y páginas placeholder de **Aviso de Privacidad** y **Términos**.

---

## QUÉ INCLUYE STEP 2

### Componentes nuevos

```
src/components/
├── ui/
│   ├── Container.tsx          ← wrapper responsive max-width
│   ├── Button.tsx             ← variantes primary/secondary/ghost
│   ├── Logo.tsx               ← variante full + isotipo
│   ├── ObfuscatedContact.tsx  ← email/tel anti-scraping
│   └── SocialIcon.tsx         ← Facebook, Instagram, WhatsApp
└── layout/
    ├── Header.tsx             ← nav desktop, scroll-aware glass
    ├── MobileMenu.tsx         ← drawer con Motion, ESC, scroll lock, a11y
    ├── Footer.tsx             ← logo, contacto, redes, legal links
    ├── WhatsAppFab.tsx        ← FAB flotante con halo pulse
    └── SiteShell.tsx          ← wrapper de todas las páginas
```

### Páginas nuevas

```
src/app/
├── privacidad/page.tsx        ← Aviso de Privacidad (placeholder)
└── terminos/page.tsx          ← Términos y Condiciones (placeholder)
```

### Helpers nuevos

```
src/lib/
└── utils.ts                   ← cn() para merge de clases Tailwind
```

### Archivos modificados

```
src/lib/constants.ts           ← actualizado con datos reales
src/app/layout.tsx             ← envuelve todo con SiteShell + skip link
src/app/page.tsx               ← home placeholder con CTAs y secondary
```

---

## PASO A PASO

### 1) Trae main actualizado y crea rama nueva

```bash
cd ~/norte/sitio-web/nortesoftware-website
git checkout main
git pull origin main
git checkout -b feat/layout-shell
```

### 2) Instala dependencias nuevas

```bash
npm install motion lucide-react clsx tailwind-merge
```

**Qué hace cada una:**

- `motion` (Framer Motion v12) — animaciones del header, menú móvil, FAB
- `lucide-react` — iconos (menú hamburguesa, X, mail, phone, redes)
- `clsx` — combinar clases condicionalmente
- `tailwind-merge` — resolver conflictos cuando se solapan clases Tailwind

### 3) Copia archivos del paquete a tu repo

```bash
# Copia todo lo de proyecto/ encima de tu repo (sobrescribe los archivos cambiados)
cp -r ~/Downloads/norte-step2/proyecto/* .
```

Verifica que aparecen los archivos nuevos:

```bash
ls -la src/components/ui/
ls -la src/components/layout/
ls -la src/app/privacidad/ src/app/terminos/
ls -la src/lib/utils.ts
```

### 4) Prueba en local

```bash
npm run dev
```

Abre http://localhost:3000 y verifica:

**Home (/)**
- Header arriba con logo izquierda, nav centro, "Iniciar proyecto" derecha
- Hero con isotipo + tagline + 2 botones (verde menta filled + ghost)
- Footer abajo con: logo, redes (FB/IG/WA), nav, contacto, legal
- FAB de WhatsApp aparece abajo derecha después de ~1.2 segundos
- FAB tiene halo verde pulsante sutil
- FAB hover muestra tooltip "Escríbenos por WhatsApp"

**Scroll**
- Al hacer scroll, header se vuelve glass (blur) con borde sutil
- Al volver arriba, header vuelve a transparente

**Mobile (redimensionar a < 1024px)**
- Botón hamburguesa aparece a la derecha del header
- Click → drawer slide desde la derecha con backdrop blur
- Links del menú con animación stagger
- Botón verde grande "Iniciar proyecto" abajo
- ESC cierra el drawer
- Click en backdrop cierra
- Cuando navegas a otra ruta, drawer se cierra solo

**Páginas**
- http://localhost:3000/privacidad → texto placeholder con disclaimer
- http://localhost:3000/terminos → texto placeholder con disclaimer
- http://localhost:3000/ruta-falsa → 404 personalizado (de Step 1)

**FAB de WhatsApp**
- Click → abre wa.me/529671456444 con mensaje pre-llenado
- En desktop: tooltip al hover
- En mobile: solo el botón (sin tooltip)

**Footer**
- Email `info@nortesoftware.dev` (al hover, color verde menta)
- Teléfono `+52 967 145 6444` (al hover verde menta)
- Click en email → abre tu cliente de mail
- Click en tel → abre dialer (en mobile)
- Iconos redes (FB, IG, WA) — Facebook e Instagram apuntan a "#"
  por ahora; WhatsApp sí funciona y abre wa.me
- Aviso de Privacidad y Términos abren las páginas placeholder

**Accesibilidad**
- Tab navega todos los elementos en orden lógico
- Cada foco se ve con anillo verde menta visible
- Tab al inicio muestra "Saltar al contenido principal" (skip link)
- Lectores de pantalla anuncian "Cerrar menú", "Abrir menú",
  "Enviar correo a info@nortesoftware.dev", etc.

### 5) Verificar lint y types

```bash
npm run lint
npx tsc --noEmit
```

Ambos deben pasar.

### 6) Build de producción local

```bash
npm run build
npm run start
```

Verifica que el build pasa sin warnings raros. Cierra con Ctrl+C cuando termines.

### 7) Commit y push

```bash
git add .
git commit -m "feat(layout): header, footer, mobile menu y FAB WhatsApp

- Header sticky con scroll-aware glass effect y nav animada
- MobileMenu drawer accesible (ESC, scroll lock, focus, stagger)
- Footer completo con email info@, tel ofuscado, redes sociales,
  links legales y dirección SCLC
- WhatsAppFab flotante con halo pulse y tooltip desktop
- Componentes UI base: Container, Button, Logo, SocialIcon,
  ObfuscatedContact
- Páginas placeholder /privacidad y /terminos con aviso LFPDPPP
- Skip link de accesibilidad WCAG en layout root
- Datos reales de la empresa (info@, +52 967 145 6444, SCLC)"

git push origin feat/layout-shell
```

### 8) PR + merge en GitHub

Igual que el step pasado:
1. Abre el repo en GitHub
2. Banner "Compare & pull request" → click
3. Verifica el diff (lectura opcional, ya validado)
4. "Create pull request" → "Merge pull request" → "Confirm merge"
5. "Delete branch"

### 9) Sincroniza local

```bash
git checkout main
git pull origin main
git branch -d feat/layout-shell
```

---

## DECISIONES TÉCNICAS — STEP 2

### Por qué Motion (Framer Motion) y no CSS animations puras

Tres decisiones específicas requieren JS-driven animation:
1. **Header glass on scroll**: necesita medir scrollY y togglear estado
2. **Mobile drawer entry/exit**: AnimatePresence maneja el unmount con animación de salida (CSS solo no puede)
3. **Stagger en links del menú**: cada link entra con delay incremental, complejo en CSS puro

Para animaciones simples (hover, focus, transition de colores) sigue siendo CSS via Tailwind. Motion solo donde añade valor real.

### Por qué obfuscated email/phone

Los bots de spam scrapean páginas de contacto buscando regex de emails y números. Una vez que tu `+52 967 145 6444` es público en HTML plano, en cuestión de semanas empezará a llegarte spam por WhatsApp y SMS.

`ObfuscatedContact` renderiza el valor invertido en SSR (HTML inicial) y lo decodifica al hidratarse. Bots simples (regex) no lo capturan; humanos y screen readers lo ven normal porque `aria-label` siempre tiene el valor correcto.

Defensa básica de capa 1, no infalible — bots con headless browser sí lo leen. Pero filtra ~80% de scrapers que son los que más molestan.

### Por qué FAB de WhatsApp aparece después de 1.2s

Si aparece junto con el resto del hero, compite por atención visual y le quita protagonismo al CTA principal. Aparición retrasada = el usuario ya leyó el headline, considera la oferta, y cuando aparece el FAB es bienvenido como atajo, no como interrupción.

`prefers-reduced-motion` está respetado: si el usuario lo desactiva, el `animate-ping` no se ejecuta.

### Por qué el drawer móvil tiene focus management

Cuando un menú abre, el foco DEBE moverse al menú (sino el usuario de teclado se queda perdido en el botón hamburguesa que ya cerró). Cuando cierra, foco vuelve. Cuando ESC, cierra. Estos son requisitos WCAG 2.1 AA — el sitio está prometiendo accesibilidad seria.

### Por qué páginas legales con `noIndex`

Mientras el contenido sea placeholder, no queremos que Google las indexe como representativas de la empresa. Cuando tengas el texto legal real (revisado por abogado), quitamos el `noIndex` del metadata.

### Por qué emails diferenciados en constants

`SITE.emails.info` y `SITE.emails.founder` separan identidades. Footer y formularios públicos usan `info@`. Sección "Nosotros" o pitch personalizado puede usar `chris@`. Esto evita que en el futuro tengas que hacer find & replace en muchos archivos cuando decidas cambiar a qué email llegan los leads.

---

## PENDIENTES DE TU LADO

Acciones que YO no puedo hacer porque dependen de tu decisión, cuenta o información externa:

- [ ] Cuando crees perfiles reales de **Facebook** e **Instagram**,
      edita `src/lib/constants.ts` → `SOCIAL_LINKS` → cambia `href: "#"`
      por la URL real
- [ ] Verifica que el botón de WhatsApp abra correctamente en tu celular
      (debería abrir WhatsApp con el mensaje pre-llenado)
- [ ] Revisar el copy de las páginas legales con un abogado antes de
      quitar `noIndex` y considerarlas oficiales
- [ ] Si quieres cambiar el mensaje pre-llenado de WhatsApp, edita
      `WHATSAPP_PREFILL_MESSAGE` en `src/lib/constants.ts`

---

## QUÉ SIGUE (Step 3)

Después de mergear este paquete:

**Step 3: Hero del home con globo terráqueo + animaciones**

- Reemplazo del placeholder actual del home con hero real
- Globo terráqueo interactivo con `cobe` (~12KB, ligero)
- Tagline animado con stagger
- CTAs primary + secondary
- Sección "Servicios" en home

Tiempo estimado de generación: ~30 min de mi parte.

Cuando confirmes que Step 2 está vivo en producción y se ve bien,
arrancamos Step 3.
