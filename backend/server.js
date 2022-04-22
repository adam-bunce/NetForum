const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000;
const connectDB = require('./config/db')
var bodyParser = require("body-parser");
const cors = require('cors');

connectDB()
const app = express()

app.use(cors());
app.use(express.json({limit: '5mb'})) // need to set(increase) json size limit here for images
app.use('/api/posts', require('./routes/postRoute'))
app.use('/api/threads', require('./routes/threadRoutes'))

app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port}`)
})