require("dotenv").config();

const express = require("express");
const path = require("path");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Parse JSON requests
app.use(express.json());

// Serve frontend files
app.use(express.static("C:/Sikkha hub"));

// Directly serve login page
app.get("/login.html", (req, res) => {
    res.sendFile("C:/Sikkha hub/login.html");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// API home
app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to Shikkha Hub API",
        status: "success"
    });
});

// Connect MongoDB and start server
async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(
            `Shikkha Hub server running on http://127.0.0.1:${PORT}`
        );
    });
}

startServer();