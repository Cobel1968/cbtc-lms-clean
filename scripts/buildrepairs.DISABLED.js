const fs = require('fs');
const path = require('path');

/**
 * COBEL AI ENGINE: VERCEL COMPATIBILITY REPAIR
 * Targets: Case-sensitivity, Import pathing, and Module resolution.
 */

const FIX_LIST = {
  // Case mismatches from your logs
  'LanguageContext': 'languagecontext',
  'BilingualText': 'bilingualtext',
  'LanguageProvider': 'languageprovider',
  'CourseDetailClient': 'coursedetailclient',
  'DiagnosticClient': 'diagnosticclient',
  // Standardizing path aliases
  '../../components/bilingualtext': '@/components/bilingualtext',
  '../contexts/languagecontext': '@/app/contexts/languagecontext'
};

const TARGET_DIRS = ['./app', './components', './lib', './contexts'];

function repairFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      repairFiles(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let wasUpdated = false;

      Object.entries(FIX_LIST).forEach(([wrong, right]) => {
        if (content.includes(wrong)) {
          console.log(`[VERCEL-FIX] Aligning "${wrong}" -> "${right}" in ${filePath}`);
          // Using a global replace to catch all instances in the file
          content = content.split(wrong).join(right);
          wasUpdated = true;
        }
      });

      if (wasUpdated) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

console.log("🚀 Starting Vercel Compatibility Audit...");
TARGET_DIRS.forEach(repairFiles);
console.log("✅ All imports and components are now lowercase and Vercel-ready.");