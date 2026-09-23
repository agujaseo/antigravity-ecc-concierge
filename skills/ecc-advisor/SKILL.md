---
name: ecc-advisor
description: Interlocutor y asesor interactivo del ecosistema ECC (affaan-m/ECC). Consulta cuando el usuario pregunte qué skills, agentes, reglas o workflows existen para una tecnología (Python, React, Go, FastAPI, Docker, etc.) o tarea de ingeniería (TDD, seguridad, refactorización, optimización), o cuando quiera incorporar buenas prácticas bajo demanda de forma quirúrgica.
---

# ECC Advisor (Asesor Quirúrgico de ECC para Antigravity)

Esta skill permite al asistente actuar como un **interlocutor técnico** entre el usuario y la amplia biblioteca de ingeniería de software de **ECC** (+290 skills, +60 agentes, +120 reglas), descargando de forma quirúrgica solo lo necesario en el proyecto actual sin sobrecargar el contexto.

---

## Cuándo Activar esta Skill

Actívate cuando:
- El usuario pregunte: *"¿Qué hay en ECC para...?"*, *"¿Tenemos alguna skill o regla para...?"*, *"¿Cómo recomienda ECC hacer X tarea?"*
- El usuario vaya a empezar un nuevo desarrollo (por ejemplo: *"Voy a crear una API con FastAPI y quiero buenas prácticas y TDD"*).
- El usuario pida explícitamente instalar o buscar recursos de ECC en su espacio de trabajo.

---

## Flujo de Trabajo del Asesor

### Paso 1: Búsqueda en el Catálogo Ligero
Cuando el usuario mencione una tecnología, marco de trabajo o tarea, busca componentes relevantes ejecutando el script de búsqueda:

```bash
node scripts/search.js "<términos de búsqueda>"
```
*(O buscando directamente en `data/ecc-catalog.json` si se requiere filtrado avanzado por tipo o categoría).*

### Paso 2: Interlocución y Asesoría Técnica
Responde al usuario en un tono conversacional, técnico y propositivo:
1. Explica brevemente qué componentes existen en ECC para su caso.
2. Agrupa los componentes sugeridos por:
   - **Skills:** Guías paso a paso para la IA (ej. `tdd-workflow`, `fastapi-patterns`).
   - **Reglas:** Estándares de código y seguridad (ej. `python/security.md`, `typescript/react.md`).
   - **Agentes:** Prompts de roles especializados si son necesarios (ej. `python-reviewer`, `security-auditor`).
3. Pregunta claramente al usuario si desea descargarlos e instalarlos en su proyecto actual:
   > *"¿Quieres que descargue e instale estas [N] piezas en el proyecto actual?"*

### Paso 3: Instalación Quirúrgica Bajo Demanda
Una vez que el usuario confirme, ejecuta el descargador quirúrgico apuntando a la raíz del proyecto activo:

```bash
node scripts/fetch.js --skill <nombre-skill> --rule <nombre-regla> --target "<ruta-del-proyecto>"
```

### Paso 4: Confirmación y Activación
Informa al usuario de los archivos descargados dentro de `.agents/` y confirma que Antigravity los ha reconocido automáticamente. Ya podéis empezar a programar con esas guías activas.
