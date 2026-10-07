
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { client } = require("../config/db");

async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message: "Authentication configuration error"
            });
        }

        const db = client.db("shikkha_hub");
        const admins = db.collection("admins");

        const admin = await admins.findOne({
            email: email.trim().toLowerCase()
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (admin.status === "inactive") {
            return res.status(403).json({
                message: "This admin account is inactive"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                sub: admin._id.toString(),
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        return res.status(200).json({
            message: "Admin login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: "admin"
            }
        });

    } catch (error) {
        console.error("Admin login error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = {
    loginAdmin
};