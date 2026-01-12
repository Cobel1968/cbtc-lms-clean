'use strict';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Folders where case-sensitivity issues usually break Vercel
const folders = ['lib', 'components'];

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Recursive call to handle nested folders like components/dashboard
            processDirectory(fullPath);
        } else {
            const lowerName = item.toLowerCase();
            if (item !== lowerName) {
                const oldPath = fullPath.replace(/\\/g, '/');
                const newPath = path.join(dir, lowerName).replace(/\\/g, '/');
                
                console.log(`Renaming: ${oldPath} -> ${newPath}`);
                try {
                    // Windows Git needs a 2-step move to recognize a case change
                    execSync(`git mv "${oldPath}" "${oldPath}-tmp"`);
                    execSync(`git mv "${oldPath}-tmp" "${newPath}"`);
                } catch (e) {
                    console.log(`Failed or already fixed: ${oldPath}`);
                }
            }
        }
    });
}

console.log('Starting Global Case Normalization...');
folders.forEach(processDirectory);
console.log('Normalization complete. Now run your PowerShell command to fix the code imports.');