const fs = require('fs');
const path = require('path');

// 1. Files to rename to strictly lowercase
const filesToRename = [
  'lib/CartContext.tsx',
  'lib/LanguageContext.tsx',
  'lib/CoursesData.ts',
  'components/admin/AuditDashboard.tsx'
];

// 2. Map of "Old Import Path" to "New Lowercase Path"
const importReplacements = {
  '@/lib/CartContext': '@/lib/cartcontext',
  '@/lib/LanguageContext': '@/lib/languagecontext',
  '@/lib/CoursesData': '@/lib/coursesdata',
  '@/components/admin/AuditDashboard': '@/components/admin/auditdashboard'
};

function fixCasing() {
  const root = process.cwd();

  // Rename the physical files on your disk
  filesToRename.forEach(fileRelPath => {
    const oldPath = path.join(root, 'app', fileRelPath);
    const newPath = path.join(root, 'app', fileRelPath.toLowerCase());

    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renamed: ${fileRelPath} -> ${fileRelPath.toLowerCase()}`);
    }
  });

  // Update all imports in your codebase
  const appDir = path.join(root, 'app');
  updateImportsRecursively(appDir);
}

function updateImportsRecursively(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      updateImportsRecursively(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;

      Object.entries(importReplacements).forEach(([oldImp, newImp]) => {
        if (content.includes(oldImp)) {
          content = content.split(oldImp).join(newImp);
          changed = true;
        }
      });

      if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`📝 Updated imports in: ${file}`);
      }
    }
  });
}

fixCasing();
console.log('🏁 All files and imports have been synchronized to lowercase.');