const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000;
const connectDB = require('./config/db')
var bodyParser = require("body-parser");
const cors = require('cors');

const Posts = require('./models/postModel')
const Threads = require('./models/threadModel')


// need to invalidate old CloudFront paths with (all is /*) when restarting the server otherwise 
// images will display as old images if their post/thread numbers are the same

connectDB()
const app = express()

app.use(cors());
app.use(express.json({limit: '5mb'})) // need to set(increase) json size limit here for images
app.use('/api/posts', require('./routes/postRoute'))
app.use('/api/threads', require('./routes/threadRoutes'))


// get most recent post and thread to set env variable on start up b/c heroku doesnt save that );
const mostRecentPost =  await Posts.find().limit(1).sort({$natural:-1})
                   
const mostRecentThread =  await Threads.find().limit(1).sort({$natural:-1})

if (!mostRecentPost[0]){
    process.env.POSTCOUNT = 1
    
}else{
    process.env.POSTCOUNT =  (mostRecentPost[0].postID)
}

if (!mostRecentThread[0]){
    process.env.THREADCOUNT = 1
    
}else{
    process.env.THREADCOUNT = (mostRecentThread[0].threadID)
}


app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port}`)
})