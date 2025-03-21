const mongoose = require("mongoose");

const MONGO_URL = 'mongodb://127.0.0.1:27017/StayFit';



const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Database connection error:", err);
        process.exit(1); // Exit the app if DB connection fails
    }
};

module.exports = connectDB; // Export function
