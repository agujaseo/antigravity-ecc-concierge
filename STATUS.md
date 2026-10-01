# STATUS.md — antigravity-ecc-concierge

> **Lectura obligatoria al arrancar cualquier sesión.** Este documento es la fuente de verdad del estado del proyecto. No borrar secciones; solo actualizar in-place.

---

## 1. Identidad del proyecto

| Campo | Valor |
|---|---|
| **Nombre** | `antigravity-ecc-concierge` |
| **Rol** | Plugin oficial de Antigravity |
| **Función** | Asesoría y descarga bajo demanda de recursos del catálogo ECC (`affaan-m/ECC`) |
| **Catálogo** | 68 agentes · +290 skills · +120 reglas |
| **Stack** | Node.js · PowerShell / Bash · JSON / Markdown |
| **Estado global** | 🟡 Fase inicial — scaffold funcional, expansión de contenido en curso |

---

## 2. Último commit de referencia

```
8f11473  feat: add hallmark-wp skill for Blocksy, Greenshift, Stackable and Novamira
```

Historial reciente:

| SHA | Tipo | Descripción |
|---|---|---|
| `8f11473` | feat | Add `hallmark-wp` skill (Blocksy, Greenshift, Stackable, Novamira) |
| `85ea354` | docs | Add `AGENTS.md` master agent directory + startup guide |
| `7633872` | feat | Initial commit for Antigravity ECC Concierge |

**Rama de trabajo:** `main` (local).
**Push a producción:** ⛔ bloqueado sin confirmación explícita.

---

## 3. Estructura de directorios (actual)

```
antigravity-ecc-concierge/
├── AGENTS.md                  # Directorio maestro de agentes + guía de arranque
├── STATUS.md                  # Este archivo
├── package.json
├── install-global.ps1         # Instalador Windows
├── install-global.sh          # Instalador Linux/macOS
├── scripts/
│   └── fetch.js               # Fetch on-demand desde catálogo ECC
├── skills/                    # Skills desplegables
│   └── hallmark-wp/           # Blocksy, Greenshift, Stackable, Novamira
├── rules/                     # Reglas ECC
└── data/                      # Índices JSON/Markdown del catálogo
```

---

## 4. Tareas completadas recientes

- [x] Scaffold inicial del repositorio (`7633872`).
- [x] Definición de stack y estructura base (`scripts/`, `skills/`, `rules/`, `data/`).
- [x] `AGENTS.md` maestro con guía de arranque y reglas operativas (`85ea354`).
- [x] Skill `hallmark-wp` para ecosistema WordPress: Blocksy, Greenshift, Stackable, Novamira (`8f11473`).
- [x] Instaladores cross-platform: `install-global.ps1` (Windows) y `install-global.sh` (POSIX).

---

## 5. Tareas pendientes inmediatas

Prioridad ordenada (P0 = bloqueante, P1 = siguiente, P2 = backlog cercano).

### P0 — Bloqueantes antes de ampliar catálogo
- [ ] Verificar paridad funcional entre `install-global.ps1` y `install-global.sh` (rutas, permisos, variables de entorno).
- [ ] Añadir validación de esquema a `scripts/fetch.js` para entradas de `data/` (fallo temprano ante JSON corrupto).
- [ ] Documentar contrato de entrada/salida de `scripts/fetch.js` en `AGENTS.md`.

### P1 — Expansión de contenido
- [ ] Poblar índice de agentes (objetivo: 68 entradas en `data/agents.json`).
- [ ] Poblar índice de skills (objetivo: +290 en `data/skills.json`).
- [ ] Poblar índice de reglas (objetivo: +120 en `data/rules/`).
- [ ] Añadir skill `hallmark-wp` a `data/skills.json` (pendiente de registrar en el índice).
- [ ] Definir convención de nombres y versionado para nuevas skills.

### P2 — Calidad y DX
- [ ] Suite mínima de tests para `scripts/fetch.js` (Node test runner o similar).
- [ ] Linter/formatter unificado (ESLint + Prettier) para `scripts/` y `data/` schemas.
- [ ] CI local pre-commit: lint + test + verificación de `STATUS.md` actualizado.
- [ ] Ejemplos de uso end-to-end en `README.md` (asesoría → selección → descarga).

---

## 6. Restricciones técnicas clave

### 6.1 Reglas operativas de agentes (obligatorias)
1. **Leer `STATUS.md` al arrancar** cualquier sesión o tarea. Sin excepciones.
2. **Prohibido borrar código funcional previo.**
3. **Prohibido dejar placeholders o TODOs** en el árbol de código entregado.
4. Comunicación **concisa, técnica y directa**.
5. Tras cada hito: **actualizar `STATUS.md`** + **commit local descriptivo**.
6. **Sin `git push` automático a producción** sin confirmación explícita.

### 6.2 Restricciones de plataforma
- **Cross-platform obligatorio:** todo script nuevo debe tener equivalente `.ps1` y `.sh`, o ser Node puro.
- **Node.js:** usar APIs estables; evitar dependencias nativas que rompan en Windows sin build tools.
- **Rutas:** nunca hardcodear separadores; usar `path.join` / `Join-Path`.
- **Codificación:** UTF-8 sin BOM en `.json`, `.md`, `.js`; los `.ps1` pueden requerir BOM para acentos en PS 5.1 — documentar decisión.

### 6.3 Restricciones de datos
- `data/` es **índice agregado**, nunca fuente duplicada de verdad: los archivos reales viven en `skills/`, `rules/` y `agents/`.
- Toda entrada de índice debe referenciar una ruta existente; `fetch.js` debe abortar si no.
- Esquema de `data/*.json` debe ser versionado (`schemaVersion`) para migraciones futuras.

### 6.4 Restricciones de red / fetch
- `scripts/fetch.js` opera **bajo demanda**; nunca descarga masiva al instalar.
- El catálogo remoto referencia `affaan-m/ECC`; asumir disponibilidad intermitente y cachear localmente.
- Respetar rate-limits: backoff exponencial ante 429/5xx.

### 6.5 Prohibiciones explícitas
- ❌ No introducir telemetría sin opt-in explícito.
- ❌ No añadir dependencias de runtime >5 en `package.json` sin justificación en commit.
- ❌ No commitear credenciales, tokens ni rutas absolutas de usuario.

---

## 7. Convención de commits

Formato: `<tipo>(<scope>): <descripción imperativa>`

Tipos aceptados: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`.

Ejemplos válidos:
```
feat(skills): add hallmark-wp for Blocksy stack
docs(status): mark P0 installer parity as in-progress
fix(fetch): abort on missing index target path
```

---

## 8. Registro de actualizaciones de este archivo

| Fecha | Commit base | Cambio |
|---|---|---|
| _init_ | `8f11473` | Creación inicial de `STATUS.md` con estado al último commit funcional. |

> **Al cerrar un hito:** añadir fila en esta tabla, actualizar §2 y §4/§5, y commitear con `docs(status): ...`.
