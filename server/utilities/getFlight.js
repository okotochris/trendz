const axios = require("axios");
const db = require('../database/db')
// Map airline codes to names/logos (partial list, add more as needed)
const airlineLogos = {
  "LH": { name: "Lufthansa", logo: "https://content.airhex.com/content/logos/airlines_90x90/LH.png" },
  "BA": { name: "British Airways", logo: "https://content.airhex.com/content/logos/airlines_90x90/BA.png" },
  "AF": { name: "Air France", logo: "https://content.airhex.com/content/logos/airlines_90x90/AF.png" },
  "KL": { name: "KLM", logo: "https://content.airhex.com/content/logos/airlines_90x90/KL.png" },
  "SQ": { name: "Singapore Airlines", logo: "https://content.airhex.com/content/logos/airlines_90x90/SQ.png" },
  "DX": { name: "Emirates", logo: "https://content.airhex.com/content/logos/airlines_90x90/DX.png" }
};

async function getAccessToken() {
  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return response.data.access_token;
}

const airports = ["LHR","JFK","LAX","DXB","CDG","AMS","FRA","MAD","HND","SIN","LOS","CPT","NBO","ACC","IST"];

function getRandomAirportPair() {
  let origin = airports[Math.floor(Math.random() * airports.length)];
  let destination = airports[Math.floor(Math.random() * airports.length)];
  while(destination === origin) {
    destination = airports[Math.floor(Math.random() * airports.length)];
  }
  return { origin, destination };
}

function getRandomDate() {
  const start = new Date();
  const end = new Date();
  end.setMonth(end.getMonth() + 6);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

async function fetchRandomFlight() {
  const token = await getAccessToken();
  const { origin, destination } = getRandomAirportPair();
  const departureDate = getRandomDate();

  const response = await axios.get(
    "https://test.api.amadeus.com/v2/shopping/flight-offers",
    {
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        adults: 1,
        max: 3
      },
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  // Map response to a display-friendly format
  const flights = response.data.data.map(f => {
    const itinerary = f.itineraries[0]; // first itinerary
    const segment = itinerary.segments[0]; // first segment

    const airlineCode = segment.carrierCode;
    const airline = airlineLogos[airlineCode] || { name: airlineCode, logo: "https://via.placeholder.com/90" };

    return {
      origin: segment.departure.iataCode,
      destination: segment.arrival.iataCode,
      departureDate: segment.departure.at.split("T")[0],
      airlineName: airline.name,
      airlineLogo: airline.logo,
      flightNumber: segment.number,
      price: f.price.total,
      bookingLink: `https://www.kayak.com/flights/${segment.departure.iataCode}-${segment.arrival.iataCode}/${segment.departure.at.split("T")[0]}?sort=bestflight_a`
    };
  });

  return flights;
}

// Example usage


async function saveFlightToDb() {
  try {
    const flights = await fetchRandomFlight(); // fetchRandomFlight already returns an array

    for (const flight of flights) {
      const {
        origin,
        destination,
        departureDate,
        airlineName,
        airlineLogo,
        flightNumber,
        price,
        bookingLink,
      } = flight;

      const query = `
        INSERT INTO flights (
          origin, destination, departure_date, airline_name, airline_logo,
          flight_number, price, booking_link, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       
      `;

      const values = [
        origin,
        destination,
        departureDate,
        airlineName,
        airlineLogo,
        flightNumber,
        price,
        bookingLink,
      ];

      await db.query(query, values); // ✅ await the insert
    }

    console.log("Flights saved to DB ✅");
  } catch (err) {
    console.error("Error saving flights:", err);
  }
}

module.exports = saveFlightToDb


