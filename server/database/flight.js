async function createFlightTable(){
    const db = require('./db')
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS flights(
            id SERIAL PRIMARY KEY,
            origin TEXT,
            destination TEXT,
            departure_date TEXT,
            airline_name TEXT,
            airline_logo TEXT,
            flight_number TEXT,
            price TEXT,
            booking_link TEXT,
            created_at TIMESTAMP DEFAULT NOW()
            )`)
        console.log("flight table created ✅")
    } catch (err) {
        console.log(err)
    }
}

module.exports = createFlightTable;