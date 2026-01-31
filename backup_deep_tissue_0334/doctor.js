const fs = require('fs');
const path = require('path');

/**
 * COBEL ENGINE - DOCTOR v6.1
 * Strategy: Structural Route Validation & Hydration Preservation
 */

const rules = [
  {
    name: "Hydration Guard & Preservation",
    apply: (content, filePath) => {
      // Skip logic for APIs and non-page/layout files
      if (!filePath.endsWith('page.tsx') && !filePath.endsWith('layout.tsx')) return content;
      if (filePath.includes('api') || (filePath.endsWith('layout.tsx') && filePath.includes('app' + path.sep + 'layout'))) return content;
      
      // PRESERVATION CHECK: If the file already has the advanced 'isMounted' shield, 
      // we do NOT overwrite the top headers to avoid breaking the build.
      if (content.includes('isMounted') || content.includes('mounted')) {
        return content; 
      }
      
      let newContent = content.replace(/^['"]use client['"];?\s*/gm, "");
      newContent = newContent.replace(/^export\s+const\s+dynamic\s*=\s*['"].*['"];?\s*/gm, "");
      return `'use client';\nexport const dynamic = 'force-dynamic';\n${newContent.trim()}`;
    }
  },
  {
    name: "Syntax & Ghost Purge",
    apply: (content) => {
      // Removes invisible characters that cause build "u is not a function" errors
      let cleaned = content.replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\u00A0/g, " ");
      let lines = cleaned.split(/\r?\n/);
      let last = lines.length - 1;
      while (last >= 0 && lines[last].trim() === "") last--;
      
      // Fixes common dangling colon/syntax errors from accidental edits
      if (lines[last] && (lines[last].trim() === ":" || lines[last].trim() === "); :")) {
        lines[last] = "}";
      }
      return lines.join('\n').trim();
    }
  }
];

// --- ROUTE INTEGRITY AUDIT ---
function checkRouteIntegrity() {
  console.log("🔍 Checking Route Integrity...");
  const failingPaths = [
    'about', 'admin/assessments', 'admin/audit', 'admin/dashboard', 
    'admin/diagnostic', 'admin/ingestion', 'admin/students', 'cart', 
    'checkout', 'contact', 'courses', 'dashboard', 'diagnostic', 
    'login', 'profile', 'register', 'student/dashboard', 'trainer/dashboard',
    'diagnostic-test' // Added your new route
  ];

  failingPaths.forEach(route => {
    const fullPath = path.join(process.cwd(), 'app', route, 'page.tsx');
    if (!fs.existsSync(fullPath)) {
      console.warn(`🚨 MISSING FILE: The route /${route} is active but page.tsx was not found at ${fullPath}`);
    }
  });
}

const BACKUP_DIR = path.join(process.cwd(), '.doctor-backups');
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

function runGlobalAudit() {
  console.log("🕵️‍♂️ COBEL ENGINE: Initiating Audit v6.1 (Shield Aware)...");
  checkRouteIntegrity();
  
  ['app', 'lib', 'components'].forEach(target => {
    const targetDir = path.join(process.cwd(), target);
    if (!fs.existsSync(targetDir)) return;
    
    getFilesRecursively(targetDir).forEach(filePath => {
      if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
      
      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;
      
      rules.forEach(rule => { 
        content = rule.apply(content, filePath); 
      });
      
      if (content !== original) {
        const relPath = path.relative(process.cwd(), filePath).replace(/\\|\//g, '_');
        fs.writeFileSync(path.join(BACKUP_DIR, relPath), original);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✨ Optimized: ${path.relative(process.cwd(), filePath)}`);
      }
    });
  });
  console.log("\n🏁 Audit Complete. Build Shields Preserved.");
}

runGlobalAudit();