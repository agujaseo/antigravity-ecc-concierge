#!/usr/bin/env node
/**
 * search.js
 * Search through the lightweight ECC catalog.
 * 
 * Usage:
 *   node scripts/search.js "query terms" [--type skill|agent|rule] [--category cat] [--json] [--limit N]
 */

const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.join(__dirname, '..', 'data', 'ecc-catalog.json');

function parseArgs(args) {
  const result = {
    query: [],
    type: null,
    category: null,
    json: false,
    limit: 10
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--type' && args[i + 1]) {
      result.type = args[++i].toLowerCase();
    } else if (arg === '--category' && args[i + 1]) {
      result.category = args[++i].toLowerCase();
    } else if (arg === '--limit' && args[i + 1]) {
      result.limit = parseInt(args[++i], 10) || 10;
    } else if (arg === '--json') {
      result.json = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
ECC Concierge Search
Usage:
  node scripts/search.js <query> [options]

Options:
  --type <skill|agent|rule>   Filter by item type
  --category <category>       Filter by category (e.g. testing, security, python, frontend)
  --limit <number>            Max results (default: 10)
  --json                      Output raw JSON results
`);
      process.exit(0);
    } else {
      result.query.push(arg);
    }
  }

  result.queryString = result.query.join(' ').trim().toLowerCase();
  return result;
}

function scoreItem(item, tokens) {
  if (tokens.length === 0) return 1;

  let score = 0;
  const name = (item.name || '').toLowerCase();
  const desc = (item.description || '').toLowerCase();
  const cat = (item.category || '').toLowerCase();
  const tags = (item.tags || []).map(t => t.toLowerCase());

  for (const token of tokens) {
    if (name === token) {
      score += 50;
    } else if (name.includes(token)) {
      score += 25;
    }

    if (tags.includes(token)) {
      score += 15;
    } else if (tags.some(t => t.includes(token))) {
      score += 8;
    }

    if (cat.includes(token)) {
      score += 10;
    }

    if (desc.includes(token)) {
      score += 5;
    }
  }

  return score;
}

function searchCatalog() {
  if (!fs.existsSync(CATALOG_PATH)) {
    console.error(`Error: Catalog not found at ${CATALOG_PATH}. Run 'node scripts/build-catalog.js' first.`);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  const opts = parseArgs(process.argv.slice(2));
  const tokens = opts.queryString.split(/\s+/).filter(Boolean);

  let pool = [];
  if (!opts.type || opts.type === 'skill') {
    pool = pool.concat(catalog.skills.map(s => ({ ...s, itemType: 'skill' })));
  }
  if (!opts.type || opts.type === 'agent') {
    pool = pool.concat(catalog.agents.map(a => ({ ...a, itemType: 'agent' })));
  }
  if (!opts.type || opts.type === 'rule') {
    pool = pool.concat(catalog.rules.map(r => ({ ...r, itemType: 'rule' })));
  }

  if (opts.category) {
    pool = pool.filter(item => (item.category || '').toLowerCase().includes(opts.category));
  }

  const scored = pool
    .map(item => ({ item, score: scoreItem(item, tokens) }))
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, opts.limit)
    .map(res => res.item);

  if (opts.json) {
    console.log(JSON.stringify(scored, null, 2));
    return;
  }

  if (scored.length === 0) {
    console.log(`No se encontraron elementos para la búsqueda: "${opts.queryString}"`);
    return;
  }

  console.log(`\nEncontrados ${scored.length} resultados para "${opts.queryString}":\n`);
  scored.forEach((it, idx) => {
    const typeLabel = it.itemType.toUpperCase();
    console.log(`[${idx + 1}] (${typeLabel}) ${it.name} [Categoría: ${it.category}]`);
    if (it.description) {
      console.log(`    ${it.description}`);
    }
    if (it.itemType === 'skill') {
      console.log(`    Instalar con: node scripts/fetch.js --skill ${it.name}`);
    } else if (it.itemType === 'agent') {
      console.log(`    Instalar con: node scripts/fetch.js --agent ${it.name}`);
    } else if (it.itemType === 'rule') {
      console.log(`    Instalar con: node scripts/fetch.js --rule ${it.name}`);
    }
    console.log('');
  });
}

searchCatalog();
