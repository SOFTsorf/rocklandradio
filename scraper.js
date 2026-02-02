const scrapeRaw = require('website-scraper');
const PuppeteerPluginRaw = require('website-scraper-puppeteer');
const path = require('path');

// Diese beiden Zeilen regeln das "not a function" und "not a constructor" Problem
const scrape = scrapeRaw.default || scrapeRaw;
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
        console.log("✅ ERFOLG! Seite wurde komplett kopiert.");
    } catch (err) {
        console.error("❌ Fehler beim Klonen:", err);
        process.exit(1);
    }
}

startClone();
