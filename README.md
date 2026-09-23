# Antigravity ECC Concierge 🎩⚡

> **Asesor interlocutor ligero y descargador quirúrgico de habilidades de ECC para Google Antigravity.**  
> Consulta más de 290 skills, 68 agentes y 120 reglas de ingeniería de [affaan-m/ECC](https://github.com/affaan-m/ECC) sin clonar repositorios pesados ni sobrecargar tu contexto.

---

## 💡 ¿Por qué existe este proyecto?

El repositorio oficial de **ECC** es una mina de oro de buenas prácticas de software (TDD, seguridad, arquitecturas limpias, convenciones por framework), pero pesa cientos de megabytes e instalar todas sus skills satura la ventana de contexto de los agentes de IA.

**Antigravity ECC Concierge** soluciona esto con una arquitectura **Just-in-Time (Bajo Demanda)**:
1. **Pesa menos de 400 KB:** Solo almacena un índice ligero estructurado de ECC.
2. **Actúa como interlocutor:** Hablas con Antigravity en lenguaje natural (*"Oye, voy a hacer una API con FastAPI y quiero TDD y seguridad, ¿qué tenemos?"*).
3. **Descarga quirúrgica:** El asistente busca en el catálogo, te recomienda exactamente las 2 o 3 skills necesarias y, tras tu visto bueno, descarga **únicamente** esos archivos directamente a `.agents/` en tu proyecto actual.

---

## 🚀 Instalación Rápida (Global para cualquier PC)

Para que el Asesor esté disponible en **todos los proyectos** que abras con Antigravity en tu máquina:

### En Windows (PowerShell)
```powershell
git clone https://github.com/agujaseo/antigravity-ecc-concierge.git "$HOME\.gemini\config\plugins\ecc-concierge"
```
*(O clona en cualquier carpeta y ejecuta `.\install-global.ps1`)*

### En Linux / macOS
```bash
git clone https://github.com/agujaseo/antigravity-ecc-concierge.git ~/.gemini/config/plugins/ecc-concierge
```
*(O clona y ejecuta `./install-global.sh`)*

---

## 💬 Cómo Usarlo en Antigravity

Una vez instalado globalmente, abre cualquier proyecto en Antigravity y habla con el asistente como con un colega:

> **Tú:** *"Quiero implementar autenticación JWT en TypeScript con buenas prácticas de seguridad. ¿Qué tenemos en ECC para esto?"*
> 
> **Antigravity (ECC Advisor):**
> *"En ECC tenemos los siguientes componentes ideales para esto:*
> - **Skill:** `mcp-server-patterns` *(patrones de integración)*
> - **Regla:** `typescript/security.md` *(guía contra inyecciones y validaciones estrictas)*
> - **Agente:** `security-auditor` *(revisión de vulnerabilidades OWASP)*
> 
> *¿Quieres que los descargue e instale en el proyecto actual?"*
> 
> **Tú:** *"Sí, descárgalos."*
> 
> **Antigravity:** *(Ejecuta la descarga quirúrgica y coloca los archivos en `.agents/skills/` y `.agents/rules/`)*  
> *"Listo, ya he inyectado los archivos en `.agents/`. Antigravity los ha detectado y podemos empezar a programar con ellos."*

---

## 🛠️ Uso Manual desde Terminal (CLI)

También puedes usar las herramientas por línea de comandos si lo prefieres:

### 1. Buscar en el catálogo
```bash
node scripts/search.js "tdd python"
node scripts/search.js "security nextjs"
node scripts/search.js --category database
```

### 2. Descargar e instalar directamente en tu proyecto
```bash
# Descargar una skill en el proyecto actual
node scripts/fetch.js --skill tdd-workflow

# Descargar varias cosas a la vez indicando la carpeta del proyecto
node scripts/fetch.js --skill fastapi-patterns --rule python/fastapi --target "C:\mi-proyecto"

# Modo simulación (para ver qué descargaría sin tocar disco)
node scripts/fetch.js --skill tdd-workflow --dry-run
```

### 3. Actualizar el catálogo desde el repo oficial de ECC
```bash
node scripts/build-catalog.js
```

---

## 📂 Estructura del Repositorio

```text
antigravity-ecc-concierge/
├── plugin.json               # Manifiesto oficial de plugin de Antigravity 2.0
├── data/
│   └── ecc-catalog.json      # Catálogo indexado ligero (~340 KB) con metadata de ECC
├── scripts/
│   ├── build-catalog.js      # Genera/actualiza el catálogo desde affaan-m/ECC
│   ├── search.js             # Motor de búsqueda CLI por keywords, categorías y tipos
│   └── fetch.js              # Descargador quirúrgico directo desde GitHub a .agents/
├── skills/
│   └── ecc-advisor/
│       └── SKILL.md          # Skill conversacional que guía al agente en la asesoría
├── install-global.ps1        # Instalador rápido para Windows PowerShell
├── install-global.sh         # Instalador rápido para Linux/macOS
└── README.md
```

---

## 📄 Licencia

MIT © [agujaseo](https://github.com/agujaseo).  
Basado en los recursos abiertos de [affaan-m/ECC](https://github.com/affaan-m/ECC).
