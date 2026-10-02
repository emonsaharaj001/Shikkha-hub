const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
    tls: true,
    serverSelectionTimeoutMS: 15000
});

async function connectDB() {
    try {
        await client.connect();
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

module.exports = { client, connectDB };