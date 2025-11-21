const express = require('express');
require('dotenv').config()
const db = require('./database/db')
const app = express ()

const PORT = process.env.PORT 

app.listen(PORT, ()=>{
    console.log(`Listening at ${PORT}`)
})