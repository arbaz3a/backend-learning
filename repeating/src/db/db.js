const mongoose = require('mongoose');
require('dotenv').config();

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDb;