# Norte Software — Identidad de marca

**Sistema: "Latón del Norte"** · v3 · Junio 2026
*Lujo por restricción, confianza por calidez. La brújula apunta al norte; el oro es metal y aparece poco.*

> **Tagline oficial:** El norte de tu tecnología.
> **Descriptor:** Construimos software que resiste. Desde Chiapas para México y el mundo.

---

## 1. Paleta de color

Concepto: **"riqueza sin gritar"** (herencia premium). Fondo verde profundo, acento de oro/latón usado con moderación, texto en crema cálida.

| Token (CSS) | HEX | Rol |
|---|---|---|
| `--color-green-900` | `#07211A` | Capa más hundida (cierre, footer, insets) |
| `--color-green-deep` | `#0C2A22` | **Fondo maestro** (~60% de superficie) |
| `--color-green-panel` | `#123A2E` | Superficie de cards / paneles |
| `--color-green-700` | `#18493A` | Hover de superficie |
| `--color-gold` | `#C69B3C` | **Acento / acción / "norte"** — ESCASO (CTA, brújula, palabra-acento, íconos) |
| `--color-gold-soft` | `#D8BE7A` | Oro claro para texto pequeño (links de email, detalles) |
| `--color-gold-deep` | `#A8843A` | Hover / pressed del oro |
| `--color-cream` | `#F4EADE` | **Texto** (tinta cálida, nunca blanco puro) |
| `--color-slate` | `#8FA39B` | Secundario / metadatos / aguja-sur de la brújula |
| `--color-hairline` | `rgb(244 234 222 / 0.10)` | Líneas / bordes (material conector) |
| `--color-hairline-strong` | `rgb(244 234 222 / 0.16)` | Líneas destacadas / bisel |

**Reglas de uso**
- Base siempre verde profundo `#0C2A22`. Nunca negro puro.
- El **oro es metal**: acento escaso e intencional. No rellenar áreas grandes de oro.
- **Profundidad por capas de verde + hairlines**, nunca por glows ni sombras de color.
- Jerarquía de texto por opacidad sobre crema: `100%` títulos · `72%` cuerpo · `60%` secundario · `42%` metadatos.
- WhatsApp se mantiene en verde reconocible (`#2D6A4F`) en emails; en el sitio el FAB usa el oro de marca.

---

## 2. Tipografía

| Familia | Uso | Pesos |
|---|---|---|
| **League Spartan** | Display, H1–H3, números editoriales, nombres de producto | 400/600/700/900 |
| **DM Sans** | Cuerpo, UI, etiquetas | 400/500/600/700 |
| **JetBrains Mono** | **Solo** las marcas N/E/S/O de la brújula | 400/500 |

- Cargadas con `next/font/google` (auto-hospedadas, sin requests externos).
- Display con tracking apretado (`-0.025em` a `-0.03em`).
- **Sin estética "cyberpunk/terminal"**: nada de folios `// 01 ·`, coordenadas decorativas ni mono fuera de la brújula.
- Eyebrows/etiquetas: DM Sans, uppercase, `tracking 0.2em`, en oro, precedidas de un filete corto de oro.

---

## 3. Logotipo

- **Isotipo:** escudo con aguja de brújula. Escudo en **crema**, aguja-norte en **oro/latón** `#C69B3C`, aguja-sur en **slate** `#8FA39B`, hub (centro) en oro. Vectorial (SVG), `src/components/ui/Isotipo.tsx`.
- **Wordmark:** "NORTE" en crema + "SOFTWARE" en **oro**. League Spartan bold.
- El isotipo va siempre a la izquierda del wordmark.
- Favicon / app icons: isotipo de latón sobre fondo verde profundo.

---

## 4. Voz y tono

Norte es **directo, técnico y norteño**. Frases cortas, sin relleno. *La grandeza se demuestra, no se proclama.*

**Norte dice:** "El norte de tu tecnología." · "Construimos software que resiste." · "El mismo equipo que lo programa es el que lo audita." · "El norte no es un lugar. Es una dirección." · "Antes del fuego." (NortePrevent).

**Norte nunca dice:** "soluciones innovadoras de vanguardia" · "transformación digital 360" · "potenciamos tu negocio con IA" · buzzwords genéricos. Regla anti-genérico: *si cambias tu nombre por el de un competidor y el texto sigue igual, está mal.*

---

## 5. Productos

| Producto | Estado | URL | Línea |
|---|---|---|---|
| **Norte SecAgent** | Live | secagent.nortesoftware.dev | Detección de amenazas con IA · 24/7 |
| **NorteCampo** | Live | nortecampo.com | Monitoreo satelital · NDVI y clima |
| **NortePrevent** | Live | norteprevent.com | Antes del fuego. (detección temprana de incendios y deforestación) |

Cada producto puede tener un color de acento propio dentro de la paleta; por defecto, oro.

---

## 6. Imágenes

- Fotografía real tratada en **duotono verde** (`mix-blend-color` sobre verde profundo) para que pegue con la paleta.
- En uso: altos de Chiapas (banda "Origen") y equipo trabajando (sección "Cómo trabajamos").
- Textura de grano sutil para calidez ("papel caro"), nunca ruido.

---

## 7. Origen

San Cristóbal de las Casas, Chiapas, México · 16.7370°N 92.6376°W
*Construido en Chiapas. Compilado para México y el mundo.*

---

## 8. Referencias rápidas

- Sitio: nortesoftware.dev · Tokens en `src/app/globals.css` (`@theme`).
- LinkedIn: linkedin.com/company/nortesoftware · Instagram: @norte.software
- © 2026 Norte Software S.A. de C.V.
