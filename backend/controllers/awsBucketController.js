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


    // add object to bucket
    s3.putObject(
    {
        Bucket: process.env.BUCKET_NAME,
        Key: `post${imageNumber}.png`, // s3 key / name of object
        Body: base64Data,
        ContentEncoding: 'base64',
        ContentType: "image/png", 
    },
    (err, data) => {
        if(err) {
        reject(err)
        return;
        }
        console.log("UPLOAD SUCCESSFULLY:") 
        console.log(data) 
        resolve(data); 
    })

    
}


function addThreadImageToBucket(imageData, threadNumber){
    const base64Data = new Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });

    s3.putObject(
    {
        Bucket: process.env.BUCKET_NAME,
        Key: `thread${threadNumber}.png`, 
        Body: base64Data,
        ContentEncoding: 'base64', 
        ContentType: "image/png", 
    },
    (err, data) => {
        if(err) {
        reject(err)
        return;
        }
        console.log("UPLOAD SUCCESSFULLY:") 
        console.log(data) 
        resolve(data); 
    })
    
}

function deleteBucketItem(item){
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });

    var params = {  Bucket: process.env.BUCKET_NAME, Key: item };
    
    console.log(params)
    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack);  
      else     console.log();                 
    });

}


module.exports = { addPostImageToBucket, addThreadImageToBucket, deleteBucketItem }