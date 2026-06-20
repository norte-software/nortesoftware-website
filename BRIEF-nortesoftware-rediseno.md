# BRIEF DE REDISEÑO — nortesoftware.dev
### Spec de producción para Claude Code · v1.1
*Norte Software S.A. de C.V. · sistema de marca "Latón del Norte"*

---

## 0 · LA MISIÓN DE ESTE REDISEÑO

El sitio actual está bien escrito pero **proclama capacidad en vez de demostrarla**: afirma ("la mejor prueba de lo que podemos construir") sin enseñar una sola prueba, y le habla a 8 industrias como un freelancer pidiendo trabajo. Resultado: se siente "pick me", no peso pesado.

**Principio rector, no negociable:**

> **DEMOSTRAR, NO PROCLAMAR.** Cada afirmación trae su prueba en el mismo scroll —un producto en vivo, un número, una captura real. Si no se puede probar, se borra.

**Segundo principio, igual de importante — CERO HYPE:**

> **Habla en seco. Nada de "IA de vanguardia", "revolucionamos", "soluciones inteligentes", buzzwords ni euforia tecnológica.** El peso pesado entiende que *menos es más*: dice lo que hace plano y deja que el trabajo hable. El lenguaje eufórico/técnico-hype suena a vibecoder noob. Evitarlo es parte del trabajo.

**North star de percepción:** que un inversionista o un director de gobierno entre y piense *"estos sí saben"* en menos de un scroll —sin que el sitio se lo tenga que decir.

---

## 1 · POSICIONAMIENTO (LA ESPINA) — INTOCABLE

El sitio dice una sola cosa, en seco, y la prueba:

> **No te decimos lo que podemos construir. Te mostramos lo que ya está en producción.**

Sin tesis tecnológica, sin "señales", sin "IA". El peso lo carga **un hecho difícil de discutir**: hay varios productos reales, vivos y usados hoy, hechos por un shop chico. Ese hecho solo grita "estos pueden con lo que sea" más fuerte que cualquier adjetivo.

Lo que une a los productos **no se narra con jerga** — se deja hablar: son **herramientas para problemas que importan** (incendios, sismos, cultivos). El stake es real. El sitio lo muestra; no lo presume.

**Los 3 pilares (en seco, cada uno comprobable):**

| Pilar | Mensaje (plano) | Prueba |
|---|---|---|
| **En producción** | Real, vivo, usado. No demos, no "próximamente", no decks | Los productos en vivo, con capturas reales |
| **Seguridad integrada** | Construimos seguro porque sabemos cómo se rompe | Línea sobria de track record (ver §4.3) |
| **Continuidad** | No desaparecemos después del launch | Tono y compromiso, productos que siguen vivos |

> **Sobre "en producción":** es el flex anti-noob. El vibecoder enseña una demo bonita que no aguanta; Norte dice "corre en producción" = real y funcionando. Apoyarse en esa palabra es deliberado.

**Implicación:** los SERVICIOS (pentest, desarrollo, consultoría) no desaparecen —son la lana— pero se ofrecen **DESPUÉS de la prueba**, desde la autoridad ya ganada. Nunca como menú al frente.

---

## 2 · LO QUE NO SE TOCA (LA MARCA)

No es rebrand. Es cirugía de contenido + craft. Respetar al 100%:

**Color — "Latón del Norte" (modo oscuro):**
```css
--green-900:   #07211A;  /* footer, insets */
--green-deep:  #0C2A22;  /* FONDO MAESTRO (~60%) */
--green-panel: #123A2E;  /* cards / paneles */
--green-700:   #18493A;  /* hover */
--gold:        #C69B3C;  /* ACENTO — ESCASO. ≤3 toques por viewport */
--gold-soft:   #D8BE7A;
--gold-deep:   #A8843A;
--cream:       #F4EADE;  /* texto principal */
--slate:       #8FA39B;  /* texto secundario */
--hairline:    rgb(244 234 222 / 0.10);
```

**Tipografía:** League Spartan (display) · DM Sans (cuerpo/UI) · JetBrains Mono (datos, etiquetas, kickers).

**Logo:** brújula-escudo, versión crema sobre verde. No modificar.

**Voz:** confiada, concisa, en seco. Mantenerla; borrar cualquier línea que ruegue o sobre-explique.

---

## 3 · REFERENCIAS DE CALIBRACIÓN (el listón)

Nivel de craft de: **Linear, Vercel, Resend, Anduril, Palantir, Stripe.** Oscuro, denso en sustancia, tipografía editorial, cero relleno, técnico pero sin hype, premium, micro-movimiento de alta factura.
**NO** debe sentirse como plantilla de startup, landing de agencia, ni secciones grandes y vacías con un heading gigante y dos líneas.
Mantra: **peso pesado = denso en prueba, no aireado en claims.**

---

## 4 · ARQUITECTURA DE PÁGINA (orden, propósito, copy real)

Jerarquía: **prueba-primero**, no menú-primero.

### 4.1 — HERO
- **Kicker (mono):** `SOFTWARE · SEGURIDAD · DESDE EL SUR`
- **H1** (elegir; recomendado el 1º — eco del hero actual que ya funciona):
  - **"Construimos software que aguanta. Y lo rompemos antes que nadie."**
  - "El software que mueve a tu empresa. Construido para resistir."
  - "No prometemos software. Lo enviamos."
- **Subhead:** "Software a la medida y seguridad ofensiva, bajo un mismo equipo —del diseño al pentest. En México y el mundo, desde San Cristóbal de las Casas."
- **CTAs:** `Ver lo que construimos →` (ancla a Prueba) · `Iniciar proyecto`
- **Barra de stats bajo el hero (mono, separadas por hairlines):**
  `7 productos en producción · Reportes en programas de Tesla · Odoo · Dstny · Respuesta <48 h · Hecho en Chiapas`
  > Usar números REALES, nunca inventados (un dato inflado que un cliente cache mata el "peso pesado"). El "7" = conteo de productos vivos; ajustar al número defendible. Los demás datos ya son ciertos.

### 4.2 — PRUEBA / PORTAFOLIO (el corazón)
Hed: **"No lo decimos. Está en producción."**
Subhead: "Productos propios de Norte, vivos hoy. La mejor muestra de lo que construimos para alguien más."

**Muro de 3 product cards** (calidad > cantidad — 3 fuertes con captura real, sin relleno). Cada una:
- Nombre + estado `● EN VIVO`
- Una línea de qué hace (outcome en humano, **sin jerga técnica**)
- **Captura real del dashboard** en device frame discreto (las provee Chris)
- Link `Abrir →` al dominio en vivo

```
NorteCampo   · nortecampo.com   · Mira qué pasa en tu campo sin estar ahí
NortePrevent · norteprevent.com · Detecta el incendio y la tala antes de que crezcan
Ollin        · ollin.lat        · Datos sísmicos reales, en vivo. Cero pánico
```
> Cenit, NorteVision y SecAgent: NO van como card. SecAgent se menciona en §4.3.

### 4.3 — SEGURIDAD (quiet, honesto)
Hed: **"Construimos como ingenieros. Rompemos como atacantes."**
Copy (plano): "Hacemos pentesting. Por eso construimos distinto desde el inicio. Todo lo que entregamos, lo atacamos primero —con nuestro propio motor de detección, SecAgent, como parte del arsenal."
**Track record — UNA línea de texto, sobria, sin logos grandes** (los hallazgos son modestos; inflarlos se nota):
> "Con reportes reconocidos en programas de divulgación responsable (Tesla, Odoo, Dstny) y contribuciones a herramientas de seguridad como Suricata."
- **NO incluir** muestra de reporte de pentest (son privados/NDA).
- Opcional, si Chris puede: un diagrama de arquitectura segura sanitizado. Si no, omitir — mejor nada que algo falso.

### 4.4 — SERVICIOS (breve, desde la autoridad — NO menú)
Hed: **"Lo que construimos para ti."**
Prosa densa, outcomes con seguridad como hilo. Máximo 4, **sin rejilla de "todo lo que podemos"**:
- **Software a la medida** que nace endurecido (Python · TypeScript · Next.js · FastAPI).
- **Seguridad ofensiva**: pentest de apps y APIs, reporte ejecutivo accionable.
- **IA aplicada** integrada a procesos reales *(mencionar plano, sin euforia — es una herramienta, no el discurso).*
- **Consultoría / CTO-as-a-Service** para empresas que necesitan dirección técnica.

### 4.5 — NOSOTROS (el fundador como FORTALEZA)
Hed: **"Fundado por alguien que construye y rompe."**
Copy: ingeniero full-stack + investigador de seguridad, base en ingeniería química/biotecnología. Construye los productos que ves. Desde San Cristóbal de las Casas, estándar global. **El portafolio es el equipo.** Incluir "el norte no es un lugar, es una dirección" (ya existe, es bueno). Tono plano, sin inflar el tamaño del equipo.

### 4.6 — INDUSTRIAS (matar la rejilla de 8)
**Eliminar** el grid de 8. Reemplazar por una línea + máx. 2:
Hed: **"Donde el software es crítico."**
"Salud privada y fintech: sistemas donde un dato filtrado o un sistema caído no son opción." (Contexto, no menú.)

### 4.7 — CTA FINAL
Hed: **"Construyamos algo que resista."** *(ya existe — mantener)*
"Cuéntanos del proyecto. Respondemos en menos de 48 horas con alcance, tiempos y costo — sin rodeos."
CTAs: `Iniciar proyecto` · `WhatsApp`

### 4.8 — FOOTER
Mantener estructura. Tagline: **"El norte de tu tecnología."** Reparar el correo ofuscado → clickeable y legible.

---

## 5 · RECURSOS VISUALES / ILUSTRACIÓN

**Regla dura:** lo pro viene de **artefactos reales** + textura de marca con mesura. **PROHIBIDO** el look "tech" falso (circuitos brillando, partículas, cerebros de IA, gradientes neón) — ese es el look vibecoder que estamos matando.

En orden de impacto:
1. **Mapa de operaciones (prioridad alta):** mapa oscuro de México/Chiapas con puntos de dato reales —parcelas de NorteCampo, sensores de Ollin, zonas de NortePrevent—. Varios productos SON geográficos → auténtico, no decorativo. Candidato a pieza central del hero o de la sección de Prueba. Construir con datos/ubicaciones reales o representativas (no puntos al azar).
2. **Lineup de logos de producto:** las marcas ya hechas (NortePrevent, NorteCampo, Ollin) en fila limpia y pareja = "la familia Norte". Enseña amplitud como sistema diseñado. (Chris las tiene.)
3. **Capturas en marcos:** las 4 en device/browser frames sutiles, ligeramente superpuestas o en perspectiva ligera. Que se vean intencionales.
4. **Textura topográfica de los Altos de Chiapas:** curvas de nivel finas como fondo/divisores de sección, en verde/oro tenue (`--hairline`). Ata el "desde el sur", técnico y crafteado, cero hype.
5. **(Bonus inversionistas) Diagrama del ecosistema Norte:** Norte Software al centro, productos alrededor. Limpio, tipo system-map.
6. **Números grandes en mono** como elemento gráfico (las stats).

---

## 6 · COPY — TONO Y REGLAS

**Voz:** confiada, concisa, en seco. Frases cortas. Verbos fuertes. Técnico solo cuando suma, **nunca para presumir**.

**Checklist — borrar cualquier línea que…:**
- [ ] Ruegue o sobre-explique ("por favor", "nos encantaría", "apasionados").
- [ ] Afirme grandeza sin prueba al lado.
- [ ] Liste todo lo que *podrías* hacer (menús / 8 industrias).
- [ ] Use buzzwords o euforia tech ("revolucionamos", "vanguardia", "IA de última generación", "transformación digital", "soluciones inteligentes").
- [ ] Hable en aspiracional/futuro cuando ya existe la prueba en presente.

**Regla maestra:** por cada afirmación, un hecho. Si no hay hecho, no hay afirmación. Y si suena a euforia, reescríbelo en seco.

---

## 7 · ESPECIFICACIONES TÉCNICAS

- **Stack:** Next.js (App Router) + TypeScript. Mantener.
- **Performance:** Lighthouse ≥ 95 en las 4. LCP < 2.0s. `next/image`, AVIF/WebP, lazy-load fuera de viewport.
- **Accesibilidad:** WCAG 2.1 AA. Contraste verificado (oro sobre verde solo en texto grande/acentos, nunca en cuerpo). HTML semántico, foco visible, `alt` reales, navegación por teclado, `prefers-reduced-motion`.
- **SEO:** metadatos por página, OG/Twitter (ya hay), `sitemap.xml`, `robots.txt`, JSON-LD de Organización + productos.
- **Responsive:** mobile-first. Stats y grids colapsan elegante. Probar 360 / 768 / 1280px.
- **Tema:** dark nativo (ya es `color-scheme: dark`).
- **Motion:** reveal sutil on-scroll (fade + 8–12px), micro-interacción en cards (lift + borde oro al hover). Nada flashy ni parallax pesado.

---

## 8 · LO QUE CHRIS PROVEE

1. **Capturas reales** de: **NorteCampo (mapa NDVI), NortePrevent, Ollin (mapa en vivo).** *(Cenit, NorteVision y SecAgent no se incluyen como card.)*
2. **Números exactos** para la StatBar: # de productos en producción, SLA real de respuesta.
3. **Logos de producto** ya diseñados (NortePrevent, NorteCampo, Ollin) para el lineup y el mapa.
4. (Si las tiene) ubicaciones reales/representativas para el mapa de operaciones.
> El reporte de pentest NO se provee (privado/NDA). El track record de seguridad va solo como la línea de texto de §4.3.

---

## 9 · CRITERIOS DE ACEPTACIÓN (Definition of Done)

- [ ] **Prueba antes que claims:** ninguna afirmación importante sin su prueba en el mismo scroll.
- [ ] **Cero hype/buzzwords.** Lenguaje en seco. Si una línea suena a euforia tech, está mal.
- [ ] **No hay menú** de capacidades ni rejilla de 8 industrias.
- [ ] **Los productos lideran**, con capturas reales en marcos.
- [ ] Track record de seguridad presente pero **sobrio** (texto, sin logos inflados).
- [ ] **Oro escaso** (≤3 toques por viewport).
- [ ] **Cero fotos de stock** ni ilustraciones tech falsas cargando credibilidad.
- [ ] Lighthouse ≥ 95, AA, responsive impecable.
- [ ] Pasa el test del inversionista/CISO: *"¿se ve peso pesado en un scroll?"* → sí.

---

## 10 · ANTI-OBJETIVOS

- ❌ Rebrand / cambiar logo o paleta.
- ❌ Buzzwords, euforia tech, "IA de vanguardia", lenguaje vibecoder.
- ❌ Menús de servicios/industrias al frente.
- ❌ Ilustraciones "tech" falsas (circuitos, partículas, neón, cerebros de IA).
- ❌ Fotos de stock o logos inflados haciéndose pasar por prueba.
- ❌ Secciones grandes y vacías; oro como decoración; motion con confeti.

---

*Resumen de todo: **la grandeza se demuestra, no se proclama.** Enseña el trabajo y cállate. El peso lo cargan los productos en producción y los hechos —no los adjetivos ni los buzzwords.*
