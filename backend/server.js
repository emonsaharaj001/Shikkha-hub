
require("dotenv").config();

const express = require("express");
const path = require("path");
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Parse JSON requests
app.use(express.json());

// Serve frontend files
app.use(express.static("C:/Sikkha hub"));

// Directly serve login page
app.get("/login.html", (req, res) => {
    res.sendFile(path.join("C:/Sikkha hub", "login.html"));
});

// Student Authentication routes
app.use("/api/auth", authRoutes);

// Admin Authentication routes
app.use("/api/admin/auth", adminAuthRoutes);

// API home
app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to Shikkha Hub API",
        status: "success"
    });
});
// API health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Shikkha Hub backend is working"
    });
});

// Connect MongoDB and start server
async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Shikkha Hub server running on http://127.0.0.1:${PORT}`
            );
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}

startServer();