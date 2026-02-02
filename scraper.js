const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
const path = require('path');

const url = process.argv[2];
if (!url) {
    console.error('❌ Keine URL angegeben');
    process.exit(1);
}

const domain = new URL(url).hostname;
const outputDir = path.resolve(__dirname, 'clones', domain);

async function startClone() {
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
