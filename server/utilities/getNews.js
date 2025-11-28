require("dotenv").config();
const axios = require("axios");
const db = require("../database/db"); // adjust path if needed

const API_KEY = process.env.NEWS_API_KEY || "5cda70f084224569922342b33f26e769"; 
const PAGE_SIZE = 10;

async function fetchTrendingNews() {
  try {
    const res = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: { country: "us", pageSize: PAGE_SIZE, apiKey: API_KEY },
    });

    return res.data.articles || [];
  } catch (err) {
    console.error("Error fetching news:", err.message);
    return [];
  }
}

async function saveTrendingNews() {
  try {
    const articles = await fetchTrendingNews();

    if (!articles.length) {
      console.log("No news fetched to save.");
      return;
    }

    for (const article of articles) {
      const {
        title,
        source,
        author,
        description,
        url,
        urlToImage,
        content,
        publishedAt,
      } = article;

      await db.query(
        `
        INSERT INTO news 
          (title, source, author, description, url, urltoimage, content, publishedat)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        
        `,
        [
          title || null,
          source?.name || null,
          author || null,
          description || null,
          url || null,
          urlToImage || null,
          content || null,
          publishedAt || null,
        ]
      );
    }
  } catch (err) {
    console.error("Error saving news:", err);
  }
}

// Run immediately
module.exports = saveTrendingNews