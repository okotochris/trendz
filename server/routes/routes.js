const express = require('express')
const db = require('../database/db')

const router = express.Router();


router.get('/api/home', async(req, res)=>{
   try {
    const [hotelRes, flightRes, newsRes] =  await Promise.all([
        await db.query('SELECT * FROM hotels ORDER BY created_at DESC LIMIT 5'),
        await db.query('SELECT * FROM flights ORDER BY created_at DESC LIMIT 5'),
        await db.query('SELECT * FROM news ORDER BY create_at DESC LIMIT 5')
    ])
    const hotel = hotelRes.rows
    const flight = flightRes.rows
    const news = newsRes.rows

    res.status(200).json({hotel, flight, news})
   } catch (err) {
    console.log(err)
    res.status(500).json({msg:"Server error"})
   }
    
})

// GET /api/hotels?page=1&limit=10
router.get('/api/hotels', async (req, res) => {

  try {
    // Extract pagination params with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    if (page < 1 || limit < 1) {
      return res.status(400).json({ 
        error: "Invalid pagination parameters",
        page,
        limit 
      });
    }

    const offset = (page - 1) * limit;

    // Query with pagination
    const result = await db.query(
      `SELECT 
        id,
        hotelbeds_code,
        name,
        city,
        country_code,
        images,
        wildcards,
        facilities,
        ranking,
        web_url
       FROM hotels 
       ORDER BY ranking ASC NULLS LAST, name ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const hotels = result.rows;

    // Optional: Get total count for frontend (useful for UI)
    const countResult = await db.query(`SELECT COUNT(*) FROM hotels`);
    const totalHotels = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalHotels / limit);

    // Success response
    res.status(200).json({
      hotels,
      pagination: {
        page,
        limit,
        totalHotels,
        totalPages,
        hasMore: page < totalPages
      }
    });

  } catch (err) {
    console.error("Database error in /api/hotels:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: process.env.NODE_ENV === 'development' ? err.message : "Something went wrong"
    });
  }
});

// GET /api/flight?page=1


router.get('/api/flight', async (req, res) => {
  try {
    // CORRECT WAY IN JAVASCRIPT
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Fetch current page
    const result = await db.query(
      `SELECT 
         id, origin, destination, departure_date, 
         airline_name, airline_logo, flight_number, price, booking_link
       FROM flights 
       ORDER BY id DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const flights = result.rows;

    // Get total count
    const totalResult = await db.query(`SELECT COUNT(*) FROM flights`);
    const totalFlights = parseInt(totalResult.rows[0].count, 10);

    const hasMore = offset + flights.length < totalFlights;
    const totalPages = Math.ceil(totalFlights / limit);

    res.status(200).json({
      flights,
      pagination: {
        page,
        pageSize: limit,
        totalFlights,
        totalPages,
        hasMore,
        returnedCount: flights.length
      }
    });

  } catch (err) {
    console.error("Error in /api/flight:", err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

const PAGE_SIZE = 10;

router.get("/api/news", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page  || "1", 10));
    const offset = (page - 1) * PAGE_SIZE;

    // Fetch news for this page
    const result = await db.query(
      `SELECT *
       FROM news
       ORDER BY "publishedat" DESC
       LIMIT $1 OFFSET $2`,
      [PAGE_SIZE, offset]
    );

    // Total number of articles
    const totalResult = await db.query(`SELECT COUNT(*) FROM news`);
    const total = parseInt(totalResult.rows[0].count, 10);

    const totalPages = Math.ceil(total / PAGE_SIZE);
    const hasMore = page < totalPages;

    res.status(200).json({
      articles: result.rows,
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total,
        totalPages,
        hasMore,
      },
    });
  } catch (err) {
    console.error("Error in /api/news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});


router.get('/api/news/:id', async (req, res) => {
  try {
    const id = req.params.id; 
    // Fetch selected news + random related news
    const [newsRes, moreNewsRes] = await Promise.all([
      db.query('SELECT * FROM news WHERE id = $1', [id]),

      // Randomize the moreNews by ordering randomly
      db.query(`SELECT * FROM news 
                WHERE id <> $1 
                ORDER BY RANDOM() 
                LIMIT 3`, [id])
    ]);

    const news = newsRes.rows[0];
    const moreNews = moreNewsRes.rows;

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    res.status(200).json({ news, moreNews });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

 

module.exports = router
