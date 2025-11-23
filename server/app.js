const express = require('express');
require('dotenv').config()
const db = require('./database/db')
const news = require('./routes/newsRoutes')
const hotels = require('./routes/hotelRoutes')
const flight = require('./routes/flightRoutes')
const cors = require('cors')
const app = express ()


app.use(cors)
app.use(news)
app.use(hotels)
app.use(flight)



const PORT = process.env.PORT 
app.listen(PORT, ()=>{
    console.log(`Listening at ${PORT}`)
})