const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect("mongodb+srv://yt-backend:6aOR5ZNKGyyBD5Jn@yt-backend.blyubnb.mongodb.net/halley");
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        // process.exit(1);
    }
}

module.exports = connectDb;