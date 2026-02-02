const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
const path = require('path');
const fs = require('fs');

const url = process.argv[2];
if (!url) {
    console.error('Keine URL angegeben!');
    process.exit(1);
}

const domain = new URL(url).hostname.replace('www.', '');
const outputDir = path.resolve(__dirname, 'clones', domain);

if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
}

scrape({
    urls: [url],
    directory: outputDir,
    plugins: [
        new PuppeteerPlugin({
            launchOptions: { 
                headless: "new",
                args: ['--no-sandbox', '--disable-setuid-sandbox'] 
            },
            scrollToBottom: { timeout: 10000, viewportN: 5 }
        })
    ],
    recursive: false,
    filenameGenerator: 'byType',
    subdirectories: [
        {directory: 'img', extensions: ['.jpg', '.png', '.svg', '.gif', '.webp']},
        {directory: 'js', extensions: ['.js']},
        {directory: 'css', extensions: ['.css']}
    ]
}).then(() => {
    console.log(`✅ Erfolg: ${domain} wurde geklont.`);
}).catch((err) => {
    console.error("❌ Fehler:", err);
    process.exit(1);
});
