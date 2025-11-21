const pg = require('pg')

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
    console.log("connected to database")
})
.catch(err=>{
    console.log(err)
})