const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
const path = require('path');

const url = process.argv[2];
if (!url) {
    console.error('❌ Fehler: Keine URL übergeben!');
    process.exit(1);
}

const domain = new URL(url).hostname;
const outputDir = path.resolve(__dirname, 'clones', domain);

console.log(`🚀 Starte Klonen von: ${url}`);

scrape({
    urls: [url],
    directory: outputDir,
    plugins: [
        new PuppeteerPlugin({
            launchOptions: { 
                args: ['--no-sandbox', '--disable-setuid-sandbox'] 
            }
        })
    ]
}).then(() => {
    console.log("✅ Klonen erfolgreich abgeschlossen!");
}).catch((err) => {
    console.error("❌ CRITICAL ERROR:", err);
    process.exit(1);
});
