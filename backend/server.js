console.log('Henlo world uwu')

const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000;
const connectDB = require('./config/db')
var bodyParser = require("body-parser");

const cors = require('cors');




connectDB()
const app = express()

// middle wear to be able to use json bodys from post rquests
app.use(cors()); // cross orgiong graage

app.use(express.json({limit: '5mb'})) // need to set(increase) json size limit here for images



app.use('/api/posts', require('./routes/postRoute'))


app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port}`)
})