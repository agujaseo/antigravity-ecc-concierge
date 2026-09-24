---
name: hallmark-wp
description: Criterio de diseño y maquetación anti-slop para WordPress con Blocksy Pro, Greenshift, Stackable y Novamira Pro. Utiliza esta skill cuando el usuario quiera diseñar, crear, auditar o rediseñar páginas, plantillas o bloques en WordPress, o cuando pida generar código Gutenberg a través de Novamira evitando la apariencia genérica de IA.
---

# Hallmark WordPress (Blocksy Pro + Greenshift + Stackable + Novamira)

Esta skill dota al agente de Antigravity del criterio de diseño editorial y anti-slop de **Hallmark** adaptado específicamente al ecosistema de bloques modernos de **WordPress**.

Convierte a la IA en un **director de arte y maquetador senior de WordPress**, capaz de estructurar páginas con personalidad, tipografía refinada, proporciones asimétricas y rendimiento impecable sin caer en las plantillas predecibles de los LLMs.

---

## 🛠️ El Stack de Trabajo

1. **Blocksy Pro (Sistema de Diseño Global):**
   - Rige los tokens de color (`--theme-palette-color-1` a `--theme-palette-color-8`), anchos de contenedor y tipografías globales.
   - Consulta [`references/blocksy-tokens.md`](references/blocksy-tokens.md).
2. **Greenshift (Maquetación Dinámica & Animaciones):**
   - CSS Grid nativo, Flexbox avanzado y microinteracciones de scroll ultraligeras.
   - Consulta [`references/greenshift-patterns.md`](references/greenshift-patterns.md).
3. **Stackable Pro (Estructura de Columnas & Componentes):**
   - Columnas asimétricas (60/40, 70/30), tarjetas editoriales y botones jerárquicos.
   - Consulta [`references/stackable-patterns.md`](references/stackable-patterns.md).
4. **Novamira Pro (Puente MCP):**
   - Servidor MCP que recibe el marcado de bloques Gutenberg generado por Antigravity e inyecta las páginas o plantillas en el WordPress en tiempo real.

---

## 🚦 Los 4 Modos de Trabajo en WordPress

### 1. Creación (Modo por Defecto)
Cuando el usuario te pida crear una nueva landing page, página de inicio, sección de servicios o componentes en WordPress:
1. **Analiza el brief:** Define el tono y selecciona una **macroestructura** (Bento Grid, Editorial Split, Narrative Scroll).
2. **Elige la paleta:** Respeta los tokens de Blocksy (`var(--theme-palette-color-*)`) asegurando que haya un único color ancla.
3. **Genera los bloques:** Redacta el marcado limpio de bloques Gutenberg (Greenshift y/o Stackable) con contenido específico y copy de alta calidad.
4. **Pasa las Slop Gates:** Revisa internamente que el código no contenga ninguno de los 25 antipatrones de [`references/slop-gates-wp.md`](references/slop-gates-wp.md).
5. **Entrega o Inyecta:** Presenta el marcado estructurado o invoca la herramienta de **Novamira Pro** para publicarlo directamente en el sitio.

### 2. Auditoría (`hallmark audit`)
Cuando el usuario te pida evaluar una página o bloque existente en su WordPress:
- Revisa el código contra las 25 compuertas de [`references/slop-gates-wp.md`](references/slop-gates-wp.md).
- Emite un informe categorizado:
  - 🚨 **Antipatrones Críticos:** Cliches evidentes de IA (ej. Hero con degradado morado, 3 tarjetas gemelas).
  - ⚠️ **Mejoras de Jerarquía:** Espaciados, contraste de lectura o tamaños de titulares.
  - 💡 **Recomendación de Macroestructura:** Cómo reorganizar la información para que gane impacto visual.

### 3. Rediseño (`hallmark redesign`)
- Conserva el contenido textual, la propuesta de valor y la arquitectura de información de la página.
- Rompe la estructura anterior y maquetala de nuevo usando contenedores Greenshift o columnas asimétricas de Stackable con un acabado premium.

### 4. Inyección vía Novamira Pro (`hallmark inject`)
Cuando el usuario confirme la creación o actualización de una página conectada a Novamira Pro:
- Formatea el código de bloques con delimitadores HTML válidos de Gutenberg:
  ```html
  <!-- wp:greenshift-blocks/container ... -->
  ...
  <!-- /wp:greenshift-blocks/container -->
  ```
- Llama a la herramienta MCP correspondiente de Novamira para insertar o actualizar el post/página en la base de datos de WordPress.

---

## 🛡️ Reglas de Oro Obligatorias

1. **PROHIBIDO el degradado violeta/azul cósmico en el Hero.**
2. **PROHIBIDO generar siempre 3 columnas idénticas de tarjetas con icono en caja arriba.** Rompe la rejilla con proporciones dispares (60/40, 70/30) o Bento Grid.
3. **PROHIBIDO usar colores hexadecimales en línea.** Usa siempre las variables globales de Blocksy (`var(--theme-palette-color-*)`).
4. **PROHIBIDO el anidamiento "muñeca rusa".** No metas contenedores dentro de contenedores sin necesidad semántica.
5. **CUIDA EL COPY:** Prohibido el texto de relleno tipo *"Potencia tu negocio con nuestra solución de IA"*. Escribe beneficios claros, específicos y persuasivos para el sector del cliente.
