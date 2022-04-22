const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongo db connected: ${conn.connection.host}`)

    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}

// export the function that connects to the database
module.exports = connectDB;