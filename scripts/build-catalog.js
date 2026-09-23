/**
 * build-catalog.js
 * Generates data/ecc-catalog.json by querying the official affaan-m/ECC repo via GitHub API / raw.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUT_PATH = path.join(__dirname, '..', 'data', 'ecc-catalog.json');

async function fetchJsonFromGh(endpoint) {
  const output = execSync(`gh api ${endpoint}`, {
    encoding: 'utf8',
    maxBuffer: 15 * 1024 * 1024
  });
  return JSON.parse(output);
}

async function fetchRawContent(rawPath) {
  try {
    const raw = execSync(`gh api repos/affaan-m/ECC/contents/${rawPath} --jq .content`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
    return Buffer.from(raw.trim(), 'base64').toString('utf8');
  } catch (err) {
    return null;
  }
}

function deriveCategory(name, dir) {
  const n = name.toLowerCase();
  if (n.includes('tdd') || n.includes('test') || n.includes('eval') || n.includes('verification') || n.includes('qa')) return 'testing';
  if (n.includes('sec') || n.includes('shield') || n.includes('auth') || n.includes('audit')) return 'security';
  if (n.includes('python') || n.includes('django') || n.includes('fastapi') || n.includes('flask')) return 'python';
  if (n.includes('react') || n.includes('vue') || n.includes('angular') || n.includes('frontend') || n.includes('nextjs') || n.includes('vite') || n.includes('ui')) return 'frontend';
  if (n.includes('node') || n.includes('typescript') || n.includes('javascript') || n.includes('bun')) return 'typescript-javascript';
  if (n.includes('golang') || n.includes('go-')) return 'golang';
  if (n.includes('rust')) return 'rust';
  if (n.includes('java') || n.includes('spring') || n.includes('kotlin') || n.includes('quarkus')) return 'java-kotlin';
  if (n.includes('csharp') || n.includes('dotnet') || n.includes('fsharp')) return 'dotnet';
  if (n.includes('sql') || n.includes('postgres') || n.includes('mysql') || n.includes('db') || n.includes('database') || n.includes('prisma') || n.includes('redis') || n.includes('clickhouse')) return 'database';
  if (n.includes('docker') || n.includes('k8s') || n.includes('kubernetes') || n.includes('cloud') || n.includes('deploy') || n.includes('infra') || n.includes('terminal')) return 'devops-infra';
  if (n.includes('architect') || n.includes('clean') || n.includes('hexagonal') || n.includes('pattern') || n.includes('design')) return 'architecture';
  if (n.includes('perf') || n.includes('latency') || n.includes('optimiz') || n.includes('benchmark')) return 'performance';
  if (n.includes('agent') || n.includes('council') || n.includes('orchestrat') || n.includes('team')) return 'multi-agent';
  if (n.includes('plan') || n.includes('workflow') || n.includes('review') || n.includes('git')) return 'workflow';
  return 'general';
}

function generateTags(name, category, extra = '') {
  const parts = name.toLowerCase().split(/[-_/\s.]+/).filter(Boolean);
  const tagSet = new Set([...parts, category]);
  if (extra) {
    extra.toLowerCase().split(/[-_/\s.]+/).filter(w => w.length > 2).forEach(w => tagSet.add(w));
  }
  return Array.from(tagSet);
}

async function main() {
  console.log('Fetching ECC manifest and tree data from GitHub (affaan-m/ECC)...');

  // 1. Fetch manifests
  console.log('- Fetching install-components.json');
  const componentsJson = JSON.parse(await fetchRawContent('manifests/install-components.json'));

  console.log('- Fetching install-modules.json');
  const modulesJson = JSON.parse(await fetchRawContent('manifests/install-modules.json'));

  console.log('- Fetching install-profiles.json');
  const profilesJson = JSON.parse(await fetchRawContent('manifests/install-profiles.json'));

  // 2. Fetch repo tree
  console.log('- Fetching full git tree');
  const treeData = await fetchJsonFromGh('repos/affaan-m/ECC/git/trees/main?recursive=1');
  const tree = treeData.tree;

  // Map module definitions
  const moduleMap = new Map();
  for (const m of modulesJson.modules) {
    moduleMap.set(m.id, m);
  }

  // 3. Collect Skills
  console.log('- Indexing skills...');
  const skillDirs = new Set();
  tree.forEach(item => {
    if (item.path.startsWith('skills/') && item.path.endsWith('/SKILL.md')) {
      const parts = item.path.split('/');
      skillDirs.add(parts[1]);
    }
  });

  // Find module descriptions for skills
  const skillToModule = new Map();
  for (const mod of modulesJson.modules) {
    if (mod.paths) {
      for (const p of mod.paths) {
        if (p.startsWith('skills/')) {
          const sName = p.replace('skills/', '');
          skillToModule.set(sName, mod);
        }
      }
    }
  }

  const skills = [];
  for (const skillName of Array.from(skillDirs).sort()) {
    const mod = skillToModule.get(skillName);
    const category = deriveCategory(skillName, 'skills');
    const description = mod ? mod.description : `Skill for ${skillName.replace(/-/g, ' ')}`;
    const tags = generateTags(skillName, category, description);

    // List all files in this skill folder from tree
    const files = tree
      .filter(t => t.path.startsWith(`skills/${skillName}/`))
      .map(t => t.path);

    skills.push({
      id: `skill:${skillName}`,
      name: skillName,
      type: 'skill',
      category,
      moduleId: mod ? mod.id : null,
      description,
      tags,
      files,
      sourceDir: `skills/${skillName}`,
      targetDir: `.agents/skills/${skillName}`
    });
  }

  // 4. Collect Agents
  console.log('- Indexing agents...');
  const agents = [];
  tree
    .filter(t => t.path.startsWith('agents/') && t.path.endsWith('.md'))
    .forEach(item => {
      const fileName = path.basename(item.path, '.md');
      const category = deriveCategory(fileName, 'agents');
      agents.push({
        id: `agent:${fileName}`,
        name: fileName,
        type: 'agent',
        category,
        description: `ECC specialized agent: ${fileName.replace(/-/g, ' ')}`,
        tags: generateTags(fileName, category, 'agent specialist'),
        filePath: item.path,
        targetPath: `.agents/agents/${fileName}.md`
      });
    });

  // 5. Collect Rules
  console.log('- Indexing rules...');
  const rules = [];
  tree
    .filter(t => t.path.startsWith('rules/') && t.path.endsWith('.md'))
    .forEach(item => {
      const relative = item.path.replace('rules/', '');
      const parts = relative.split('/');
      const ruleCat = parts.length > 1 ? parts[0] : 'common';
      const fileName = path.basename(item.path, '.md');
      const idName = `${ruleCat}-${fileName}`;
      rules.push({
        id: `rule:${idName}`,
        name: `${ruleCat}/${fileName}`,
        type: 'rule',
        category: deriveCategory(ruleCat + '-' + fileName, 'rules'),
        subCategory: ruleCat,
        tags: generateTags(`${ruleCat} ${fileName}`, ruleCat),
        filePath: item.path,
        targetPath: `.agents/rules/${idName}.md`
      });
    });

  // 6. Profiles & Components
  const profiles = profilesJson.profiles || [];
  const components = componentsJson.components || [];

  const catalog = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    sourceRepo: 'affaan-m/ECC',
    counts: {
      skills: skills.length,
      agents: agents.length,
      rules: rules.length,
      components: components.length,
      profiles: profiles.length
    },
    profiles,
    components,
    skills,
    agents,
    rules
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(catalog, null, 2), 'utf8');
  const stats = fs.statSync(OUT_PATH);

  console.log(`\nCatalog generated successfully at: ${OUT_PATH}`);
  console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`Indexed:`);
  console.log(`- ${catalog.counts.skills} skills`);
  console.log(`- ${catalog.counts.agents} agents`);
  console.log(`- ${catalog.counts.rules} rules`);
  console.log(`- ${catalog.counts.components} components`);
}

main().catch(err => {
  console.error('Error generating catalog:', err);
  process.exit(1);
});
