// this isnt really a controller but idk where to put it

//import AWS from "@aws-sdk/client-s3"

var AWS = require("@aws-sdk/client-s3");

//despite this being set up for .png it works with gifs and other images formats :?
function addPostImageToBucket(imageData, imageNumber){

    const base64Data = new Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');


    // initalize s3 interface, the thing that gives us access to our account
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });



    // STEP 2: CALL PUT OBJECT
    s3.putObject(
    {
        Bucket: process.env.BUCKET_NAME,
        Key: `post${imageNumber}.png`, // the key for S3 location 
        Body: base64Data,
        ContentEncoding: 'base64', // important to tell that the incoming buffer is base64
        ContentType: "image/png", // e.g. "image/jpeg" or "image/png"
    },
    (err, data) => {
        if(err) {
        reject(err)
        return;
        }
        console.log("UPLOAD SUCCESSFULLY:") //optional  
        console.log(data) //optional
        resolve(data); // if this is in a promise, then include
    })

    
}


function addThreadImageToBucket(imageData, threadNumber){
    const base64Data = new Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    // initalize s3 interface, the thing that gives us access to our account
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });

    // STEP 2: CALL PUT OBJECT
    s3.putObject(
    {
        Bucket: process.env.BUCKET_NAME,
        Key: `thread${threadNumber}.png`, // the key for S3 location 
        Body: base64Data,
        ContentEncoding: 'base64', // important to tell that the incoming buffer is base64
        ContentType: "image/png", // e.g. "image/jpeg" or "image/png"
    },
    (err, data) => {
        if(err) {
        reject(err)
        return;
        }
        console.log("UPLOAD SUCCESSFULLY:") //optional  
        console.log(data) //optional
        resolve(data); // if this is in a promise, then include
    })

    
}

module.exports = { addPostImageToBucket, addThreadImageToBucket }