const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
const path = require('path');
const url = process.argv[2];

if (!url) {
    console.error('Bitte eine URL angeben!');
    process.exit(1);
}

const domain = new URL(url).hostname;

scrape({
    urls: [url],
    directory: path.resolve(__dirname, 'clones', domain),
    plugins: [
        new PuppeteerPlugin({
            launchOptions: { headless: "new" },
            scrollToBottom: { timeout: 10000, viewportN: 10 }
        })
    ],
    recursive: false, // Auf 'true' setzen für Unterseiten (Achtung: dauert lange!)
    requestConcurrency: 5,
    filenameGenerator: 'byType', // Erstellt Ordner wie /css, /js, /images
    subdirectories: [
        {directory: 'img', extensions: ['.jpg', '.png', '.svg', '.gif', '.webp']},
        {directory: 'js', extensions: ['.js']},
        {directory: 'css', extensions: ['.css']},
        {directory: 'fonts', extensions: ['.woff', '.woff2', '.ttf']}
    ]
}).then((result) => {
    console.log("✅ Klonen abgeschlossen! Ordnerstruktur erstellt.");
}).catch((err) => {
    console.error("❌ Fehler:", err);
});
