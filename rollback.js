const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(process.cwd(), '.doctor-backups');

if (!fs.existsSync(BACKUP_DIR)) {
  console.log("❌ No backup points found.");
  process.exit(1);
}

fs.readdirSync(BACKUP_DIR).forEach(file => {
  const originalPath = file.replace(/_/g, path.sep);
  if (fs.existsSync(path.dirname(originalPath))) {
    const content = fs.readFileSync(path.join(BACKUP_DIR, file), 'utf8');
    fs.writeFileSync(originalPath, content);
    console.log(`🔄 Restored: ${originalPath}`);
  }
});