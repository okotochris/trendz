const express = require('express');
require('dotenv').config()
const db = require('./database/db')
const router = require('./routes/routes')
const getBlogs = require("./utilities/getHotel")
const saveFlightToDb = require('./utilities/getFlight')
const saveTrendingNews = require('./utilities/getNews')
const iterateOverArticles = require('./utilities/geNewsData')
const cron = require("node-cron");
const cors = require('cors')
const app = express ()


app.use(cors())
app.use(router)
function runTask() {
  getBlogs()
  saveFlightToDb()
  iterateOverArticles()
}
cron.schedule("0 0,4,8,12,16 * * *", () => {
  runTask();
});

const PORT = process.env.PORT 
app.listen(PORT, async ()=>{
    console.log(`Listening at ${PORT}`)
   
})