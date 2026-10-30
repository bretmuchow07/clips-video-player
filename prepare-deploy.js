const fs = require('fs');
const path = require('path');

const DEPLOY_DIR = path.join(__dirname, '.deploy');
const DEMO_FILE = path.join(__dirname, 'demo', 'index.html');
const DIST_DIR = path.join(__dirname, 'dist');
const ASSETS_DIR = path.join(__dirname, 'demo', 'assets');

// 1. Clean .deploy
if (fs.existsSync(DEPLOY_DIR)) {
    fs.rmSync(DEPLOY_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DEPLOY_DIR);
console.log('Created .deploy directory');

// 2. Copy index.html and update paths
let indexContent = fs.readFileSync(DEMO_FILE, 'utf8');
// Replace ../dist with ./dist to match flat structure in deployment
indexContent = indexContent.replace(/\.\.\/dist/g, './dist');

fs.writeFileSync(path.join(DEPLOY_DIR, 'index.html'), indexContent);
console.log('Copied and updated index.html');

// 2b. Copy demo runtime scripts and styles
['floating-lines.js', 'cursor-grid.js', 'cursor-grid.css'].forEach(file => {
    const src = path.join(__dirname, 'demo', file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(DEPLOY_DIR, file));
        console.log(`Copied ${file}`);
    }
});

// 3. Copy dist folder
if (fs.existsSync(DIST_DIR)) {
    const destDist = path.join(DEPLOY_DIR, 'dist');
    if (fs.cpSync) {
        fs.cpSync(DIST_DIR, destDist, { recursive: true });
    } else {
        fs.mkdirSync(destDist);
        fs.readdirSync(DIST_DIR).forEach(file => {
            const srcPath = path.join(DIST_DIR, file);
            const destPath = path.join(destDist, file);
            if (fs.lstatSync(srcPath).isFile()) {
                fs.copyFileSync(srcPath, destPath);
            }
        });
    }
    console.log('Copied dist folder');
} else {
    console.warn('WARNING: dist folder not found. Make sure to build first.');
}

// 4. Copy assets if they exist
const demoAssets = path.join(__dirname, 'demo', 'assets');
if (fs.existsSync(demoAssets)) {
    const destAssets = path.join(DEPLOY_DIR, 'assets');
    if (fs.cpSync) {
        fs.cpSync(demoAssets, destAssets, { recursive: true });
    } else {
        fs.mkdirSync(destAssets);
        fs.readdirSync(demoAssets).forEach(file => {
            const srcPath = path.join(demoAssets, file);
            const destPath = path.join(destAssets, file);
            if (fs.lstatSync(srcPath).isFile()) {
                fs.copyFileSync(srcPath, destPath);
            }
        });
    }
    console.log('Copied assets folder');
}

// 5. Create .nojekyll to bypass Jekyll processing
fs.writeFileSync(path.join(DEPLOY_DIR, '.nojekyll'), '');
console.log('Created .nojekyll file');
