function createStudentModel(db) {
    const students = db.collection("students");

    return {
        collection: students
    };
}

module.exports = createStudentModel;