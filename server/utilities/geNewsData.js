const { EventRegistry, QueryArticlesIter } = require("eventregistry");

const apiKey = "833104698-c0a1-4b93-86ad-9e23bc51f07a"
if (!apiKey) throw new Error("NEWSAPI_AI_KEY required.");

const er = new EventRegistry({ apiKey });

async function fetchLatestNews() {
    try {
        console.log("Fetching latest global news...\n");

        const query = new QueryArticlesIter(er, {
            sortBy: "date",
            sortByAsc: false,         // newest first
            lang: "eng",
            dateStart: "2025-11-20",  // last 5–7 days recommended
            maxItems: 20,
            requestedResult: QueryArticlesIter.ARTICLE_INFO
        });

        let i = 0;
        for await (const article of query) {
            i++;

            console.log(`\n--- Article ${i} ---`);
            console.log("Title:", article.title);
            console.log("URL:", article.url);
            console.log("Date:", article.date);
            console.log("Source:", article.source?.title);
            console.log("Summary:", (article.summary || "").slice(0, 200));
        }

        if (i === 0) {
            console.warn("\n❌ No recent articles returned — your API key may be rate-limited.");
        }

    } catch (err) {
        console.error("❌ Error fetching latest news:", err.message);
    }
}

module.exports = fetchLatestNews;
