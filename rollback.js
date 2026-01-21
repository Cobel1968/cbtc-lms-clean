const fs = require('fs');
const path = require('path');

/**
 * COBEL ENGINE: PEDAGOGICAL LOGIC ROLLBACK
 * Innovation Type: Computer-Implemented Pedagogical Logic
 * Author: Abel C.
 * * Purpose: 
 * Reverts the 'force-dynamic' segment configurations and restores the 
 * original source state from the .doctor-backups directory to maintain
 * technical integrity for patent baseline testing.
 */

const BACKUP_DIR = path.join(process.cwd(), '.doctor-backups');

// 1. Initial Safety Check
if (!fs.existsSync(BACKUP_DIR)) {
  console.log("❌ [Cobel Engine] CRITICAL: No backup directory found. Rollback aborted.");
  process.exit(1);
}

console.log("\n--- 🛡️ Starting Cobel Engine Global Rollback ---");
console.log("Target: Restoring Original Pedagogical Logic State...\n");

const files = fs.readdirSync(BACKUP_DIR);

if (files.length === 0) {
  console.log("⚠️ [Cobel Engine] Warning: Backup directory is empty. Nothing to restore.");
  process.exit(0);
}

let restoreCount = 0;
let errorCount = 0;

// 2. Execution Loop
files.forEach(file => {
  // Mapping the flat backup filename back to its original OS-specific path
  const originalPath = file.replace(/_/g, path.sep);
  const backupFilePath = path.join(BACKUP_DIR, file);

  try {
    if (fs.existsSync(backupFilePath)) {
      const content = fs.readFileSync(backupFilePath, 'utf8');
      
      // Ensure the destination directory exists (Pedagogical Path Preservation)
      const targetDir = path.dirname(originalPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Restore the file
      fs.writeFileSync(originalPath, content);
      console.log(`✅ [RESTORED]: ${originalPath}`);
      restoreCount++;
    }
  } catch (error) {
    console.error(`❌ [ROLLBACK ERROR]: Failed to restore ${originalPath}:`, error.message);
    errorCount++;
  }
});

// 3. Final Technical Audit
console.log("\n--- 🏁 Rollback Audit Summary ---");
console.log(`Successfully Restored: ${restoreCount} files`);
if (errorCount > 0) {
  console.log(`Failed Restorations:  ${errorCount} files`);
}
console.log("Status: Build environment reset to original configuration.");
console.log("--------------------------------------------------\n");