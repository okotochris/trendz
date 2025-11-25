async function createNews(){
    const db = require('./db');
    try {
         db.query(`CREATE TABLE IF NOT EXISTS news(
        id SERIAL PRIMARY KEY,
        title TEXT UNIQUE,
        source TEXT,
        author TEXT,
        description TEXT,
        url TEXT,
        urltoimage TEXT NOT NULL,
        content TEXT,
        publishedAt TEXT,
        create_at TIMESTAMP DEFAULT NOW()
    )`)
    console.log('news table created ✅')
    } catch (err) {
        console.log(err)
    }
}

module.exports = createNews;