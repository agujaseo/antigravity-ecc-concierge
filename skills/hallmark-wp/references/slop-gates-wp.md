# Slop Gates para WordPress y Gutenberg (25 Antipatrones Prohibidos)

Toda maquetación generada para WordPress con Blocksy, Greenshift o Stackable debe superar estas **25 compuertas de control** antes de ser entregada o inyectada con Novamira Pro.

Si una interfaz cumple con 2 o más de estos puntos, suspende la prueba y delata que fue generada por una IA genérica.

---

## 🚫 Las 25 Señales Delatoras (Tells)

### Estructura y Composición
1. **La triple tarjeta gemela:** 3 columnas idénticas de Stackable o Greenshift con la misma altura, mismo icono y misma longitud de texto.
2. **Card-in-Card (Anidamiento innecesario):** Un contenedor con borde de Greenshift que contiene tarjetas con borde de Stackable, creando marcos dentro de marcos.
3. **Píldora flotante cliché:** Un badge redondeado sobre el H1 con textos como *"✨ Nueva versión"* o *"La plataforma #1 impulsada por IA"*.
4. **Centrado indiscriminado:** Centrar bloques de texto largos de más de 3 líneas (el ojo humano pierde la referencia al leer).
5. **Falta de ritmo vertical:** Secciones separadas todas con exactamente el mismo padding de 80px sin variación de densidad.

### Color y Superficie
6. **El Hero morado cósmico:** Fondo oscuro con degradado radial de morado a azul o fucsia. (Prohibido. Usa color ancla único con neutro entintado).
7. **Hexadecimales sueltos:** Escribir `#6366F1` o `#3B82F6` en estilos en línea en lugar de usar `var(--theme-palette-color-1)`.
8. **Sombras sucias flotantes:** Sombras CSS oscuras difuminadas (`box-shadow: 0 20px 25px rgba(0,0,0,0.2)`). Usa bordes limpios de 1px con `var(--theme-palette-color-5)`.
9. **Gris frío por defecto:** Fondos `#111827` o textos `#9CA3AF` planos y desvinculados de la temperatura del color de marca.
10. **Botones neón idénticos:** Dos botones primarios compitiendo en el mismo viewport con colores saturados.

### Tipografía y Jerarquía
11. **Inter en todo:** La misma fuente sin contraste para titulares H1 y para el texto de pie de página.
12. **Titulares sin presencia:** H1 de tamaño pequeño o con el mismo grosor que un subtítulo.
13. **Subtítulos vacíos:** Subtítulos que repiten lo mismo que el H1 con palabras sinónimas.
14. **Espaciado de líneas (Line-height) desproporcionado:** Titulares con interlineado de texto corrido (`line-height: 1.6`) o textos de párrafo pegados (`line-height: 1.1`).
15. **Uso de mayúsculas agresivas:** Secciones enteras en `uppercase` sin justificación de diseño de etiqueta.

### Iconografía y Componentes
16. **La trilogía de emojis/iconos cliché:** El cohete 🚀, el rayo ⚡ y la varita mágica ✨ como iconos de características.
17. **Icono en caja redondeada:** Icono centrado flotando dentro de un contenedor cuadrado con `border-radius: 12px` de fondo de color translúcido.
18. **Checkmarks verdes repetitivos:** Listas de características donde cada línea empieza con un check verde idéntico.
19. **Testimonios con fotos circulares flotantes:** Cajas de testimonios idénticas con avatares genéricos de Unsplash y 5 estrellas amarillas.
20. **Tablas de precios clónicas:** Tres tarjetas de precio donde la del medio tiene un reborde morado y dice *"Más Popular"*.

### Redacción y Contenido (Copywriting)
21. **Frases hechas de IA:** *"Lleva tu negocio al siguiente nivel"*, *"Potencia tu flujo de trabajo con nuestra solución"*.
22. **Verbos pasivos y abstractos:** *"Transforma", "Revoluciona", "Optimiza"* sin explicar *qué* hace exactamente el producto.
23. **Falsas estadísticas sin fuente:** Tarjetas con *"99.9% de satisfacción"* o *"10x más rápido"* sin contexto técnico verificable.
24. **Falta de especificidad de dominio:** Un texto que podría servir igual para una clínica dental, un SaaS o una panadería.
25. **Llamadas a la acción (CTA) ambiguas:** Botones con texto *"Empezar ahora"* o *"Saber más"* cuando deberían decir *"Ver catálogo de cursos"*, *"Solicitar demo de 15 min"*.
