const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongodb_uri");

const connectDb = async () => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB connected success");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDb;