const db = require('../database/db')
const  axios = require('axios')
const crypto = require('crypto')

const apiKey = process.env.HOTEL_BED_API_KEY;
const secret = process.env.HOTEL_BEDS_SECRET;

function signature() {
  const timestamp = Math.floor(Date.now() / 1000);
  return crypto.createHash("sha256")
    .update(apiKey + secret + timestamp)
    .digest("hex");
}


async function getBlogs() {
  try {
    const response = await axios.get(
      "https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels",
      {
        params: { from: 1, to: 50 },
        headers: {
          "Api-Key": apiKey,
          "X-Signature": signature(),
          "Accept": "application/json"
        }
      }
    );

    const hotels = response.data.hotels;

    for (const hotel of hotels) {
      const title = hotel.name?.content || null;
      const images = (hotel.images || []).map(img => `https://photos.hotelbeds.com/giata/${img.path}`);
      const description = hotel.description?.content || null;
      const accommodationTypeCode = hotel.accommodationTypeCode || null;
      const address = hotel.address?.content || null;
      const rooms = (hotel.rooms || []).map(r => r.name || r.code || null).filter(Boolean);
      const city = hotel.city?.content || null;
      const ranking = hotel.ranking || null;
      const phone = (hotel.phones || []).map(p => p.phone || p.number).filter(Boolean);
      const email = hotel.email || null;
      const wildcards = (hotel.wildcards || []).map(w => w).filter(Boolean);
      const facilities = (hotel.facilities || []).map(f => f.name || f.facility_name).filter(Boolean);
      const url = hotel.web || null;

      // Insert into PostgreSQL
      const query = `
        INSERT INTO hotels (
          hotelbeds_code, name, description, accommodation_type_code,
          address, city, state_code, country_code, postal_code, ranking,
          email, phone, web_url, wildcards, images, rooms, facilities, created_at
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,NOW()
        )
        ON CONFLICT (hotelbeds_code) 
        DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          accommodation_type_code = EXCLUDED.accommodation_type_code,
          address = EXCLUDED.address,
          city = EXCLUDED.city,
          state_code = EXCLUDED.state_code,
          country_code = EXCLUDED.country_code,
          postal_code = EXCLUDED.postal_code,
          ranking = EXCLUDED.ranking,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone,
          web_url = EXCLUDED.web_url,
          wildcards = EXCLUDED.wildcards,
          images = EXCLUDED.images,
          rooms = EXCLUDED.rooms,
          facilities = EXCLUDED.facilities,
          updated_at = NOW()
      `;

      const values = [
        hotel.code,
        title,
        description,
        accommodationTypeCode,
        address,
        city,
        hotel.stateCode || null,
        hotel.countryCode || null,
        hotel.postalCode || null,
        ranking,
        email,
        phone,        // ✅ now plain array
        url,
        wildcards,    // ✅ plain array
        images,       // ✅ plain array
        rooms,        // ✅ plain array
        facilities    // ✅ plain array
      ];

      await db.query(query, values);

      console.log(`Saved hotel: ${title}`);
    }

  } catch (err) {
    console.error("API ERROR / DB ERROR:", err.response?.data || err.message);
  }
}


module.exports = getBlogs