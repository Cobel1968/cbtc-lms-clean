'use strict';
/**
 * Detect case-mismatches and missing targets for imports.
 * Updated to handle root-level migrations and ignore deleted folders.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Get tracked files from Git
let tracked = [];
try {
  tracked = execSync('git ls-files', { encoding: 'utf8' })
    .split(/\r?\n/)
    .filter(Boolean);
} catch (e) {
  console.error("Git error: Ensure you are in a git repository.");
  process.exit(1);
}

const trackedMap = tracked.reduce((m, p) => {
  m[p.toLowerCase()] = m[p.toLowerCase()] || [];
  m[p.toLowerCase()].push(p);
  return m;
}, {});

// 2. Filter files to scan, checking that they actually exist on disk
const srcFiles = tracked.filter(p => {
  return /\.(t|j)sx?$/.test(p) && fs.existsSync(p);
});

const importRegex = /from\s+['"](@\/(lib|components|app\/lib|app\/components)\/[^'"]+|(\.\.\/components|\.\/components)\/[^'"]+)['"]/g;

function candidatesFor(candidate) {
  const exts = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];
  const cands = [];
  exts.forEach(e => cands.push(candidate + e));
  // Also check for directory index files
  exts.forEach(e => cands.push(path.posix.join(candidate, 'index' + e)));
  return cands;
}

function scanFiles() {
  const issues = [];
  srcFiles.forEach((file) => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      let m;
      while ((m = importRegex.exec(content)) !== null) {
        const importPath = m[1];
        
        // Normalize: strip leading '@/app/' or '@/'
        let candidate = importPath.replace(/^@\/app\//, '').replace(/^@\//, '');
        
        // Convert relative components to absolute components/ path for comparison
        if (importPath.startsWith('../components/')) {
            candidate = importPath.replace(/^\.\.\/components\//, 'components/');
        } else if (importPath.startsWith('./components/')) {
            candidate = path.posix.join(path.dirname(file), importPath).replace(/^app\//, '');
        }

        const cands = candidatesFor(candidate);
        const foundExact = cands.find(c => tracked.includes(c));
        
        if (foundExact) continue;

        const match = cands.map(c => trackedMap[c.toLowerCase()]).find(Boolean);
        if (match) {
          issues.push({ file, import: importPath, tracked: match[0], kind: 'case-mismatch' });
        } else {
          issues.push({ file, import: importPath, tracked: null, kind: 'not-found' });
        }
      }
    } catch (err) {
      // If a file was recently deleted/moved, skip it
      if (err.code !== 'ENOENT') throw err;
    }
  });
  return issues;
}

const issues = scanFiles();

if (!issues.length) {
  console.log('✅ OK — Cobel Engine alignment verified. No case-mismatches found.');
  process.exit(0);
}

console.log('❌ Detected issues:');
issues.forEach(it => {
  if (it.kind === 'case-mismatch') {
    console.log(`- ${it.file}: import '${it.import}' -> should be '${it.tracked}'`);
  } else {
    console.log(`- ${it.file}: import '${it.import}' -> target NOT FOUND among tracked files`);
  }
});

process.exit(1);