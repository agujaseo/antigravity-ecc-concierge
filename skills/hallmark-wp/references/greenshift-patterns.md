# Patrones de Diseño con Greenshift (Gutenberg)

**Greenshift** es el motor de construcción más performante y avanzado para Gutenberg en WordPress. Destaca por su generación de CSS puro, arquitectura basada en Flexbox/CSS Grid y microinteracciones de scroll ultraligeras.

---

## 🏗️ 1. Macroestructuras Hallmark con Greenshift

Hallmark exige **variedad estructural**. Evita generar siempre la misma sección con 3 tarjetas iguales. Con Greenshift construimos:

### A. Bento Grid Asimétrico (CSS Grid)
En lugar de 3 columnas iguales, una cuadrícula de 4 elementos con jerarquía de pesos:

```html
<!-- wp:greenshift-blocks/container {"containerType":"grid","gridColumns":"repeat(12, 1fr)","gap":"24px","margin":{"bottom":"64px"}} -->
<div class="wp-block-greenshift-blocks-container gs-grid">
  <!-- Elemento Principal Destacado (8 columnas de ancho, 2 filas de alto) -->
  <!-- wp:greenshift-blocks/container {"gridColumnSpan":"span 8","gridRowSpan":"span 2","background":"var(--theme-palette-color-6)","padding":"40px","borderRadius":"16px","border":{"width":"1px","style":"solid","color":"var(--theme-palette-color-5)"}} -->
  <div class="wp-block-greenshift-blocks-container bento-feature">
    <!-- Contenido jerárquico -->
  </div>
  <!-- /wp:greenshift-blocks/container -->

  <!-- Tarjeta Secundaria 1 (4 columnas) -->
  <!-- wp:greenshift-blocks/container {"gridColumnSpan":"span 4","background":"var(--theme-palette-color-7)","padding":"32px","borderRadius":"16px"} -->
  <div class="wp-block-greenshift-blocks-container bento-stat">
    <!-- Métrica o dato clave -->
  </div>
  <!-- /wp:greenshift-blocks/container -->

  <!-- Tarjeta Secundaria 2 (4 columnas) -->
  <!-- wp:greenshift-blocks/container {"gridColumnSpan":"span 4","background":"var(--theme-palette-color-6)","padding":"32px","borderRadius":"16px"} -->
  <div class="wp-block-greenshift-blocks-container bento-quote">
    <!-- Testimonio editorial o insight -->
  </div>
  <!-- /wp:greenshift-blocks/container -->
</div>
<!-- /wp:greenshift-blocks/container -->
```

### B. Hero Asimétrico (Editorial Split 60/40)
El 60% se dedica a una tipografía grande, anclada a la izquierda, con jerarquía y espaciado de respiro; el 40% es un elemento visual interactivo, no una ilustración genérica de stock.

---

## ⚡ 2. Microinteracciones y Animaciones de Greenshift

El error común de la IA es saturar la web con animaciones tipo "bounce", "zoom" o transiciones lentas de 1 segundo.

### Reglas Hallmark para Greenshift:
* **Distancia de desplazamiento sutil:** Máximo `16px` a `24px` en `translateY`.
* **Duración ágil:** Entre `0.35s` y `0.5s` (nunca más de 0.6s).
* **Curva de aceleración:** `cubic-bezier(0.16, 1, 0.3, 1)` (curva natural de amortiguación).
* **Escalonado (Stagger):** Entre `0.06s` y `0.1s` entre elementos hermanos.

---

## 🚫 3. Errores Prohibidos en Greenshift (Slop Gates)

1. **Evitar la "muñeca rusa" de contenedores:**  
   Nunca anidar un `Container` dentro de otro `Container` que a su vez tiene un `Container` solo para añadir un padding. Usa las propiedades de espaciado y flexbox del contenedor padre.
2. **Prohibido el hover con escala exagerada (`scale(1.15)`):**  
   Los micro-estados hover deben ser elegantes: cambio de color de borde a `var(--theme-palette-color-1)` o un ligero `translateY(-2px)`.
3. **Nunca ignores el responsive:**  
   En Greenshift, todo CSS Grid o Flexbox horizontal debe apilarse a 1 columna en pantallas `< 768px` (`gridColumnsTablet: "1fr"`).
