const express = require('express');
require('dotenv').config()
const db = require('./database/db')
const router = require('./routes/routes')
const getBlogs = require("./utilities/getHotel")
const saveFlightToDb = require('./utilities/getFlight')
const fetchRandomFlight = require('./utilities/getFlight')
const saveTrendingNews = require('./utilities/getNews')
const cors = require('cors')
const app = express ()


app.use(cors())
app.use(router)


const PORT = process.env.PORT 
app.listen(PORT, ()=>{
    console.log(`Listening at ${PORT}`)
   // getBlogs()
   //saveFlightToDb()
 saveTrendingNews()

})