const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// TikTok Downloader Route
app.get('/api/download', async (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Using a public TikTok API proxy for demonstration.
        // For a real premium site, I recommend using a RapidAPI TikTok Downloader key.
        const response = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(videoUrl)}`);
        const data = response.data;

        if (data.code === 0) {
            res.json({
                success: true,
                title: data.data.title,
                cover: data.data.cover,
                video_no_watermark: 'https://tikwm.com' + data.data.play,
                video_watermark: 'https://tikwm.com' + data.data.wmplay,
                music: 'https://tikwm.com' + data.data.music
            });
        } else {
            res.status(400).json({ success: false, error: 'Invalid TikTok URL or video not found' });
        }
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ success: false, error: 'Server error occurred while fetching video' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Tiktik Server running at http://localhost:${PORT}`);
});
 {
    "version": 2,
    "rewrites": [
      { "source": "/api/(.*)", "destination": "/api/download" },
      { "source": "/(.*)", "destination": "/public/index.html" }
    ]
  }
