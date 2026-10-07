const { client } = require("../config/db");

async function getDashboardStats(req, res) {
    try {
        const db = client.db("shikkha_hub");

        const students = db.collection("students");
        const teachers = db.collection("teachers");
        const courses = db.collection("courses");
        const lectures = db.collection("lectures");

        const [
            totalStudents,
            totalTeachers,
            totalCourses,
            totalLectures
        ] = await Promise.all([
            students.countDocuments(),
            teachers.countDocuments(),
            courses.countDocuments(),
            lectures.countDocuments()
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalStudents,
                totalTeachers,
                totalCourses,
                totalLectures
            }
        });

    } catch (error) {
        console.error("Dashboard stats error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load dashboard statistics"
        });
    }
}

module.exports = {
    getDashboardStats
};