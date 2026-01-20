const fs = require('fs');
const path = require('path');

const FIX_LIST = {
  'LanguageContext': 'languagecontext',
  'BilingualText': 'bilingualtext',
  'LanguageProvider': 'languageprovider',
  'CourseDetailClient': 'coursedetailclient',
  'DiagnosticClient': 'diagnosticclient'
};

const TARGET_DIRS = ['./app', './components', './lib'];

function repairFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      repairFiles(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;
      Object.entries(FIX_LIST).forEach(([wrong, right]) => {
        if (content.includes(wrong)) {
          content = content.split(wrong).join(right);
          updated = true;
        }
      });
      if (updated) {
        console.log(`[FIXED] ${filePath}`);
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

TARGET_DIRS.forEach(repairFiles);
console.log("✅ All imports aligned to lowercase.");