# Tokens y Variables de Diseño de Blocksy Pro

Blocksy Pro cuenta con uno de los sistemas de diseño más limpios y sólidos del ecosistema WordPress, gobernado por variables CSS nativas (*CSS Custom Properties*) en `:root`.

Al diseñar con criterio **Hallmark**, está **estrictamente prohibido usar valores hexadecimales aleatorios o colores hardcodeados**. Todo el marcado y estilos en línea deben apoyarse en los tokens de Blocksy para garantizar coherencia, facilidad de edición desde el Personalizador y soporte nativo para modos oscuro/claro.

---

## 🎨 Paleta Global de Blocksy (`--theme-palette-color-*`)

Blocksy organiza su paleta en 8 colores fundamentales:

| Variable CSS | Rol Semántico | Criterio Hallmark |
| :--- | :--- | :--- |
| `var(--theme-palette-color-1)` | **Color Ancla / Marca Primario:** Usado para el acento visual clave, botones primarios (CTA), enlaces activos. | Un solo tono saturado y distintivo. Nunca degradado genérico. |
| `var(--theme-palette-color-2)` | **Acento Secundario / Estado Hover:** Variación del acento para interacciones y estados activos. | Ligeramente más oscuro o cálido que el color 1. |
| `var(--theme-palette-color-3)` | **Texto del Cuerpo (Body):** Neutro de lectura principal con contraste WCAG AAA. | Tinteado con la temperatura del color ancla (no gris frío plano). |
| `var(--theme-palette-color-4)` | **Títulos y Encabezados (H1-H6):** Máxima jerarquía y profundidad visual. | Neutro profundo con presencia tipográfica. |
| `var(--theme-palette-color-5)` | **Bordes Sutiles y Líneas Divisorias:** Separadores, bordes de inputs, tarjetas con borde sutil. | Borde de 1px con opacidad suave; nunca sombras artificiales pesadas. |
| `var(--theme-palette-color-6)` | **Fondo de Superficie / Tarjetas:** Superficies elevadas sobre el fondo principal. | Neutro claro cálido o superficie sutilmente contrastada. |
| `var(--theme-palette-color-7)` | **Fondo Secundario / Secciones Alternas:** Fondos de franjas, banners o pie de página. | Variación armónica respecto al fondo principal. |
| `var(--theme-palette-color-8)` | **Fondo Principal de la Web:** El lienzo base de la página. | Lienzo limpio (ej. blanco cálido, crema, o neutro oscuro profundo). |

---

## 📐 Dimensiones y Contenedores

Blocksy define el ancho de página mediante:

* `--theme-normal-container-max-width`: Ancho estándar del contenido (por defecto `1290px`).
* `--theme-narrow-container-max-width`: Ancho para artículos de lectura o formularios de foco (`750px`).
* `--theme-container-padding`: Espaciado horizontal responsivo para evitar que el contenido toque los bordes en móviles.

Al maquetar con Greenshift o Stackable:
* Las secciones principales deben tener `width: 100%` con contenedor interno centrado limitado a `var(--theme-normal-container-max-width)`.
* Para héroes de alto impacto tipo *Editorial Split*, se permite extender elementos visuales a sangre (*full-width breakout*) mientras el texto se mantiene dentro del contenedor.

---

## 🔤 Jerarquía Tipográfica de Blocksy

Blocksy aplica fuentes globales para titulares y cuerpo:

```css
/* Títulos */
font-family: var(--theme-font-headings-family);
font-weight: var(--theme-font-headings-weight, 700);
line-height: var(--theme-font-headings-line-height, 1.2);

/* Cuerpo */
font-family: var(--theme-font-family);
font-weight: var(--theme-font-weight, 400);
line-height: var(--theme-font-line-height, 1.6);
```

### Parejas Tipográficas Recomendadas (Criterio Hallmark en Blocksy):
1. **Editorial Contemporáneo:**
   - Títulos: *Fraunces* o *Playfair Display* (Serif cálida con personalidad).
   - Cuerpo: *Plus Jakarta Sans* o *Outfit* (Sans limpia de lectura rápida).
2. **Técnico Elegante:**
   - Títulos: *Syne* o *Clash Display* (Display geométrico moderno).
   - Cuerpo: *Inter* o *Cabinet Grotesk* (neutro estricto).
3. **Artesanal / Brutalista Cálido:**
   - Títulos: *Cormorant Garamond* o *Cinzel*.
   - Cuerpo: *Manrope*.
