const { ApifyClient } = require('apify-client');
const fs = require('fs');
const path = require('path');

// Initialize the Apify client
const client = new ApifyClient({
    token: 'apify_api_z1dAL5tmnyB36LX5S9onH2zVaCq9Q20F89f3', // Replace with your Apify API key
});

// Prepare the scraper input
const input = {
    hashtag: '#fitness',
    resultsLimit: 1000,
};

// Run the scraper
(async () => {
    try {
        const run = await client.actor('clockworks/free-tiktok-scraper').call(input);
        console.log('Scraping started. Run ID:', run.id);

        // Fetch the results
        const dataset = await client.dataset(run.defaultDatasetId).listItems();
        console.log(`Fetched ${dataset.length} videos.`);

        // Save the data to a file
        const dataDir = path.join(__dirname, '../data/scraped_data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(path.join(dataDir, 'tiktok_videos.json'), JSON.stringify(dataset, null, 2));
        console.log('Scraping complete! Data saved to data/scraped_data/tiktok_videos.json');
    } catch (error) {
        console.error('Error during scraping:', error);
    }
})();