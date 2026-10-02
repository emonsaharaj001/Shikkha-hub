const express = require("express");
const {
    registerStudent,
    loginStudent
} = require("../controllers/authController");

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        message: "Auth route is working",
        status: "success"
    });
});

router.post("/register", registerStudent);

router.post("/login", loginStudent);

module.exports = router;