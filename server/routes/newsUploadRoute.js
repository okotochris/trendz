const express = require('express');
const db = require('../database/db');
const upload = require('../utilities/multer');
const cloudinary = require('../utilities/cloudinary');

const router = express.Router();

router.post('/api/news/upload', upload.array('images'), async (req, res) => {
  const { title, source, author, description, content, url, date } = req.body;

  try {
    const files = req.files;

    // Handle case with no files
    const imageUrls = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    }

    // Insert into DB (always 1D array)
    const query = `
      INSERT INTO news(title, source, author, description, content, url, publishedAt, urltoimage)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    const result = await db.query(query, [
      title,
      source,
      author,
      description,
      content,
      url,
      date,
      imageUrls, // <- must be flat array
    ]);

    res.json({
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});


module.exports = router;
