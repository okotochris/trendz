const pg = require('pg')
const createHoteldb = require('./hotel')
const createFlightTable = require('./flight')
const createNewsTable = require('./news')

const isProduction = process.env.NODE_ENV === "production"
const db =
isProduction 
?
new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl:{
         rejectUnauthorized :false
    }
})
:
new pg.Client({
    user:process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_BASE,
    port: process.env.DB_PORT,
    password:process.env.DB_PASSWORD
})
db.connect()
.then(result=>{
    console.log("connected to database ✅")
    createFlightTable()
    createHoteldb()
    createNewsTable()
})
.catch(err=>{
    console.log(err)
})


module.exports = db;