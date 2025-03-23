const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load scraped data
const dataDir = path.join(__dirname, '../data/scraped_data');
const videos = JSON.parse(fs.readFileSync(path.join(dataDir, 'tiktok_videos.json')));

// Directory to save videos
const saveDir = path.join(__dirname, '../data/downloaded_videos');
if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
}

// Download videos
(async () => {
    for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const videoUrl = video.videoUrl; // Adjust based on your data structure
        try {
            const response = await axios({
                url: videoUrl,
                method: 'GET',
                responseType: 'stream',
            });

            const filePath = path.join(saveDir, `video_${i}.mp4`);
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            console.log(`Downloaded video ${i}`);
        } catch (error) {
            console.error(`Error downloading video ${i}:`, error.message);
        }
    }
})();