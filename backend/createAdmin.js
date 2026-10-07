require("dotenv").config();

const bcrypt = require("bcrypt");
const { client, connectDB } = require("./config/db");

async function createAdmin() {
    try {
        await connectDB();

        const db = client.db("shikkha_hub");
        const admins = db.collection("admins");

        const email = "admin@shikkhahub.com";
        const password = "Admin@12345";

        const existingAdmin = await admins.findOne({ email });

        if (existingAdmin) {
            console.log("Admin account already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = {
            name: "Shikkha Hub Admin",
            email: email,
            password: hashedPassword,
            role: "admin",
            status: "active",
            createdAt: new Date()
        };

        const result = await admins.insertOne(admin);

        console.log("Admin account created successfully!");
        console.log("Admin ID:", result.insertedId.toString());
        console.log("Email:", email);
        console.log("Password:", password);

    } catch (error) {
        console.error("Admin creation failed:", error);
    } finally {
        await client.close();
    }
}

createAdmin();