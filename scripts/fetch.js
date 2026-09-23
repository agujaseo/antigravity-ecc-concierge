#!/usr/bin/env node
/**
 * fetch.js
 * Surgically download specific skills, rules, or agents from affaan-m/ECC
 * directly into the target project's .agents/ directory.
 * 
 * Usage:
 *   node scripts/fetch.js --skill <name> [--target <projectDir>] [--dry-run]
 *   node scripts/fetch.js --agent <name> [--target <projectDir>] [--dry-run]
 *   node scripts/fetch.js --rule <name>  [--target <projectDir>] [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const CATALOG_PATH = path.join(__dirname, '..', 'data', 'ecc-catalog.json');
const RAW_BASE_URL = 'https://raw.githubusercontent.com/affaan-m/ECC/main';

function parseArgs(args) {
  const result = {
    skills: [],
    agents: [],
    rules: [],
    targetDir: process.cwd(),
    dryRun: false,
    overwrite: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--skill' && args[i + 1]) {
      result.skills.push(args[++i]);
    } else if (arg === '--agent' && args[i + 1]) {
      result.agents.push(args[++i]);
    } else if (arg === '--rule' && args[i + 1]) {
      result.rules.push(args[++i]);
    } else if (arg === '--target' && args[i + 1]) {
      result.targetDir = path.resolve(args[++i]);
    } else if (arg === '--dry-run') {
      result.dryRun = true;
    } else if (arg === '--overwrite') {
      result.overwrite = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
ECC Concierge Fetch (Surgical Downloader)
Usage:
  node scripts/fetch.js [options]

Options:
  --skill <name>       Skill to download (can be repeated)
  --agent <name>       Agent to download (can be repeated)
  --rule <name>        Rule to download (can be repeated, e.g. python/fastapi)
  --target <dir>       Destination project root (defaults to CWD)
  --dry-run            Preview files without downloading
  --overwrite          Overwrite existing files
`);
      process.exit(0);
    }
  }

  return result;
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => resolve(destPath));
      });
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(CATALOG_PATH)) {
    console.error(`Error: Catalog not found at ${CATALOG_PATH}. Run 'node scripts/build-catalog.js' first.`);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

  if (opts.skills.length === 0 && opts.agents.length === 0 && opts.rules.length === 0) {
    console.error('Error: specify at least one --skill, --agent, or --rule to fetch.');
    process.exit(1);
  }

  const filesToDownload = []; // { sourceUrl, destPath, type, name }

  // 1. Process Skills
  for (const skillName of opts.skills) {
    const item = catalog.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (!item) {
      console.warn(`[WARN] Skill not found in catalog: ${skillName}`);
      continue;
    }

    if (item.files && item.files.length > 0) {
      for (const relPath of item.files) {
        const destRel = relPath.replace(`skills/${item.name}/`, `.agents/skills/${item.name}/`);
        filesToDownload.push({
          sourceUrl: `${RAW_BASE_URL}/${relPath}`,
          destPath: path.join(opts.targetDir, destRel),
          type: 'skill',
          name: item.name
        });
      }
    } else {
      // Fallback to SKILL.md
      filesToDownload.push({
        sourceUrl: `${RAW_BASE_URL}/skills/${item.name}/SKILL.md`,
        destPath: path.join(opts.targetDir, '.agents', 'skills', item.name, 'SKILL.md'),
        type: 'skill',
        name: item.name
      });
    }
  }

  // 2. Process Agents
  for (const agentName of opts.agents) {
    const item = catalog.agents.find(a => a.name.toLowerCase() === agentName.toLowerCase());
    if (!item) {
      console.warn(`[WARN] Agent not found in catalog: ${agentName}`);
      continue;
    }

    filesToDownload.push({
      sourceUrl: `${RAW_BASE_URL}/${item.filePath}`,
      destPath: path.join(opts.targetDir, '.agents', 'agents', `${item.name}.md`),
      type: 'agent',
      name: item.name
    });
  }

  // 3. Process Rules
  for (const ruleName of opts.rules) {
    const cleanRule = ruleName.replace(/^rules\//, '').replace(/\.md$/, '');
    const item = catalog.rules.find(r => r.name.toLowerCase() === cleanRule.toLowerCase() || r.id === `rule:${cleanRule.replace('/', '-')}`);
    if (!item) {
      console.warn(`[WARN] Rule not found in catalog: ${ruleName}`);
      continue;
    }

    const safeFileName = item.name.replace('/', '-') + '.md';
    filesToDownload.push({
      sourceUrl: `${RAW_BASE_URL}/${item.filePath}`,
      destPath: path.join(opts.targetDir, '.agents', 'rules', safeFileName),
      type: 'rule',
      name: item.name
    });
  }

  if (filesToDownload.length === 0) {
    console.log('No valid items found to download.');
    return;
  }

  console.log(`\nPreparados ${filesToDownload.length} archivo(s) para instalar en: ${opts.targetDir}\n`);

  if (opts.dryRun) {
    console.log('--- MODO SIMULACIÓN (--dry-run) ---');
    filesToDownload.forEach(f => {
      console.log(`[${f.type.toUpperCase()}] ${f.name} -> ${f.destPath}`);
      console.log(`       URL: ${f.sourceUrl}`);
    });
    console.log('\nEjecuta sin --dry-run para aplicar los cambios.');
    return;
  }

  let successCount = 0;
  for (const file of filesToDownload) {
    if (fs.existsSync(file.destPath) && !opts.overwrite) {
      console.log(`[OMITIDO] ${file.destPath} ya existe (usa --overwrite para reemplazar)`);
      continue;
    }

    process.stdout.write(`Descargando [${file.type}] ${file.name} ... `);
    try {
      await downloadFile(file.sourceUrl, file.destPath);
      console.log('✓ OK');
      successCount++;
    } catch (err) {
      console.log(`✗ ERROR: ${err.message}`);
    }
  }

  console.log(`\n✓ Instalación quirúrgica completada: ${successCount} archivo(s) instalados.`);
  console.log(`Ubicación: ${path.join(opts.targetDir, '.agents')}`);
  console.log('Antigravity descubrirá automáticamente las nuevas skills y reglas en esta carpeta.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
