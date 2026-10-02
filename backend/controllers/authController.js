const bcrypt = require("bcrypt");
const { client } = require("../config/db");

async function registerStudent(req, res) {
    try {
        const db = client.db("shikkha_hub");
        const students = db.collection("students");

        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingStudent = await students.findOne({ email });

        if (existingStudent) {
            return res.status(409).json({
                message: "Student already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = {
            name,
            email,
            phone,
            password: hashedPassword,
            role: "student",
            createdAt: new Date()
        };

        const result = await students.insertOne(newStudent);

        res.status(201).json({
            message: "Student registered successfully",
            studentId: result.insertedId
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
}


async function loginStudent(req, res) {
    try {
        const db = client.db("shikkha_hub");
        const students = db.collection("students");

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const student = await students.findOne({ email });

        if (!student) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            student.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                role: student.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
}


module.exports = {
    registerStudent,
    loginStudent
};