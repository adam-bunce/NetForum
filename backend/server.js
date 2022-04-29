const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000;
const connectDB = require('./config/db')
var bodyParser = require("body-parser");
const cors = require('cors');

const checkPosts = require('./config/checkEnviromentVar')


// need to invalidate old CloudFront paths with (all is /*) when restarting the server otherwise 
// images will display as old images if their post/thread numbers are the same

connectDB()
const app = express()

app.use(cors());
app.use(express.json({limit: '5mb'})) // need to set(increase) json size limit here for images
app.use('/api/posts', require('./routes/postRoute'))
app.use('/api/threads', require('./routes/threadRoutes'))


// get most recent post and thread to set env variable on start up b/c heroku doesnt save that );
checkPosts();


app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port}`)
})