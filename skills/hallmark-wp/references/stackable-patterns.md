# Patrones de Diseño con Stackable Pro (Gutenberg)

**Stackable Pro** proporciona bloques de construcción visuales estructurados y sólidos para WordPress. Cuando se usa con criterio Hallmark, se convierte en una herramienta editorial de gran precisión.

---

## 📐 1. Rompiendo la Rejilla Simétrica de Stackable

La mayoría de los sitios generados por IA usan la plantilla automática de Stackable: 3 columnas de idéntico ancho con un icono arriba centrado. **Eso es AI-Slop.**

### Regla Hallmark: Variación de Columnas y Proporciones
* Usa proporciones **60/40**, **70/30** o **50/25/25** en lugar de 33/33/33.
* En una sección de 3 elementos, rompe la uniformidad:
  - Columna 1 (50% de ancho): Titular editorial grande, manifiesto o problema central.
  - Columna 2 (25% de ancho): Característica técnica detallada.
  - Columna 3 (25% de ancho): Métrica cuantitativa verificable o caso de uso.

```html
<!-- wp:stackable/columns {"columnLayout":"custom","columnWidths":[55,45],"columnGap":"48px"} -->
<div class="wp-block-stackable-columns">
  <!-- wp:stackable/column -->
  <div class="wp-block-stackable-column">
    <!-- wp:stackable/heading {"level":2} -->
    <h2 class="wp-block-stackable-heading">Arquitectura sin concesiones técnicas.</h2>
    <!-- /wp:stackable/heading -->
    <!-- wp:paragraph -->
    <p>Construido sobre bloques nativos y variables globales sin capas innecesarias de abstracción.</p>
    <!-- /wp:paragraph -->
  </div>
  <!-- /wp:stackable/column -->

  <!-- wp:stackable/column -->
  <div class="wp-block-stackable-column">
    <!-- Componente complementario con borde sutil -->
  </div>
  <!-- /wp:stackable/column -->
</div>
<!-- /wp:stackable/columns -->
```

---

## 🎴 2. Tarjetas Editoriales vs Tarjetas Cliché

### ❌ La Tarjeta Cliché de IA en Stackable:
- Fondo gris oscuro o blanco puro con sombra flotante pesada (`box-shadow: 0 20px 25px rgba(0,0,0,0.2)`).
- Icono centrado en una caja redondeada de color morado o azul.
- Título centrado de 2 líneas.
- Texto centrado de 3 líneas que empieza con *"Disfruta de..."* o *"Potencia tu..."*.

### ✅ La Tarjeta con Criterio Hallmark:
- **Alineación a la izquierda:** Mayor legibilidad y orden visual.
- **Borde sutil en vez de sombra exagerada:** `border: 1px solid var(--theme-palette-color-5)`.
- **Iconos integrados o tipografía funcional:** El icono va en línea con el titular o se sustituye por un contador numérico monoespaciado (`01`, `02`, `03`).
- **Superficie armónica:** `background: var(--theme-palette-color-6)`.
- **Copy con sustancia:** Explica el beneficio real y específico del producto.

---

## 🔘 3. Botones y Llamadas a la Acción (CTA)

* En un bloque de botones de Stackable, debe haber **un solo botón primario** con `var(--theme-palette-color-1)`.
* Si hay un botón secundario, debe ser de tipo fantasma (*ghost/outline*) o simplemente un enlace de texto con flecha tipográfica (`Ver documentación →`), nunca dos botones sólidos idénticos compitiendo en jerarquía.
