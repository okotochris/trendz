// fetchAndSaveNews.js
require('dotenv').config();
const { EventRegistry, QueryArticlesIter, ReturnInfo, ArticleInfoFlags } = require("eventregistry");
const db = require('../database/db'); // Adjust path if needed

// Use your real env variable name
const apiKey = process.env.NEWSAPI_AI_KEY || process.env.EVENT_REGISTRY_API_KEY;
if (!apiKey) {
    throw new Error("Set NEWSAPI_AI_KEY or EVENT_REGISTRY_API_KEY in .env");
}

const er = new EventRegistry({ apiKey });

async function fetchAndSaveNews() {
    console.log("Fetching latest news from Event Registry...\n");

    const q = new QueryArticlesIter(er, {
        keywords: "news",           // Keeps free tier happy
        sortBy: "date",
        sortByAsc: false,
        lang: ["eng"],
        maxItems: 50,               // Pull more, we'll dedupe anyway
        returnInfo: new ReturnInfo({
            articleInfo: new ArticleInfoFlags({
                body: true,         // Full article body when available
                concepts: true,
                categories: true,
                image: true,        // For urltoimage
                shares: true
            })
        })
    });

    let savedCount = 0;
    let skippedCount = 0;

    try {
        for await (const article of q) {
            const {
                title,
                url,
                date: publishedAt,
                source,
                body: content = "",
                summary: description = "",
                image: urltoimage = "",
                concepts = []
            } = article;

            // Clean & prepare data
            const cleanTitle = title?.trim();
            const cleanUrl = url?.trim();
            const cleanSource = source?.title || "Unknown Source";
            const cleanImage = urltoimage || "https://via.placeholder.com/400x200?text=No+Image"; // fallback

            if (!cleanTitle || !cleanUrl) {
                skippedCount++;
                continue;
            }

            try {
                await db.query(
                    `INSERT INTO news (
                        title, source, author, description, url, 
                        urltoimage, content, publishedAt
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (title) DO NOTHING`,  // Prevents duplicates
                    [
                        cleanTitle,
                        cleanSource,
                        null, // author usually not in Event Registry
                        description?.slice(0, 1000) || null,
                        cleanUrl,
                        cleanImage,
                        content?.slice(0, 10000) || null, // Limit size
                        publishedAt
                    ]
                );

                // Check if row was actually inserted
                const { rowCount } = await db.query(
                    `SELECT 1 FROM news WHERE title = $1 LIMIT 1`,
                    [cleanTitle]
                );

                if (rowCount > 0) {
                    console.log(`Saved: ${cleanTitle.substring(0, 60)}...`);
                    savedCount++;
                } else {
                    skippedCount++;
                }
            } catch (dbErr) {
                if (dbErr.code === '23505') { // Unique violation (fallback)
                    skippedCount++;
                } else {
                    console.error("DB Error:", dbErr.message);
                }
            }
        }

        console.log("\nFinished!");
        console.log(`Saved: ${savedCount} new articles`);
        console.log(`Skipped: ${skippedCount} (duplicates or invalid)`);
        if (savedCount + skippedCount === 0) {
            console.warn("Zero articles processed — check API key or internet");
        }

    } catch (err) {
        console.error("Event Registry API Error:", err.message);
    }
}

// Run directly if called with node fetchAndSaveNews.js
if (require.main === module) {
    fetchAndSaveNews().catch(console.error);
}

module.exports = fetchAndSaveNews;