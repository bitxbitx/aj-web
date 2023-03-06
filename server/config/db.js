const mongoose = require('mongoose')
const AutoIncrementFactory = require('mongoose-sequence');
require('dotenv').config()

const connectDB = async () => {
    try{
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected : ${conn.connection.host}`)
        const AutoIncrement = AutoIncrementFactory(conn);

    } catch (error) { 
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB