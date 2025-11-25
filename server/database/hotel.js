async function createHoteldb() {
    const db = require('./db')
    try {
    await db.query(`CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    hotelbeds_code INT UNIQUE NOT NULL,    -- Hotelbeds hotel code
    name TEXT NOT NULL,
    description TEXT,
    accommodation_type_code VARCHAR(10),
    address TEXT,
    city TEXT,
    state_code VARCHAR(10),
    country_code CHAR(2),
    postal_code VARCHAR(20),
    ranking INT,
    email TEXT,
    phone TEXT[],                          -- Array of phone numbers
    web_url TEXT,
    wildcards TEXT[],                       -- Array of tags/wildcards
    images TEXT[],                          -- Array of image URLs
    rooms TEXT[],                           -- Array of room names or codes
    facilities TEXT[],                      -- Array of facility names
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);

`)
    console.log('hotel table created ✅')
    } catch (error) {
       console.log(error) 
    }
}

module.exports = createHoteldb;