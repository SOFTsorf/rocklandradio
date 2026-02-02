const scrape = require('website-scraper');
const PuppeteerPluginRaw = require('website-scraper-puppeteer');
const path = require('path');

// Fix für den "Constructor"-Fehler: Prüft, wo das Plugin steckt
const PuppeteerPlugin = PuppeteerPluginRaw.default || PuppeteerPluginRaw;

const url = process.argv[2];
if (!url) {
    console.error('❌ Keine URL angegeben');
    process.exit(1);
}

const domain = new URL(url).hostname;
const outputDir = path.resolve(__dirname, 'clones', domain);

async function startClone() {
    console.log(`🚀 Starte Klonen von: ${url}`);
    try {
        await scrape({
            urls: [url],
            directory: outputDir,
            plugins: [
                new PuppeteerPlugin({
                    launchOptions: { 
                        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
                    },
                    scrollToBottom: { timeout: 10000, viewportN: 5 }
                })
            ]
        });
        console.log("✅ Klonen erfolgreich abgeschlossen!");
    } catch (err) {
        console.error("❌ Fehler beim Klonen:", err);
        process.exit(1);
    }
}

startClone();
