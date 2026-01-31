import Tesseract from 'tesseract.js';
import sharp from 'sharp';

async function runInkRecovery(imagePath: string) {
    console.log(" Cobel AI Engine: Recovering Faint Technical Ink...");

    const recoveredPath = "./recovered-ink.png";
    
    try {
        await sharp(imagePath)
            .resize(3000) // Super-scale to see fine lines
            .modulate({ brightness: 0.8, contrast: 2.0 }) // Darken and sharpen
            .threshold(160) // Force everything to be either pure black or pure white
            .toFile(recoveredPath);

        const result = await Tesseract.recognize(recoveredPath, 'fra+eng', {
            tessedit_pageseg_mode: '6' as any // Assume a single uniform block of text
        });

        console.log(" Recovered Text:", result.data.text.substring(0, 150).replace(/\n/g, ' '));
        
        const text = result.data.text.toLowerCase();
        const techTerms = ["carb", "pelle", "site", "chan", "bus"];
        const found = techTerms.filter(t => text.includes(t));

        if (found.length > 0) {
            console.log(` SUCCESS: Found technical markers: ${found.join(', ')}`);
        } else {
            console.log("ℹ Content is still too abstract. Suggest manual verification or higher-res scan.");
        }
    } catch (err) {
        console.error(" Recovery Error:", err);
    }
}

runInkRecovery("./1000156455.jpg");