const { ObjectId } = require("mongodb");

function createUserModel(db) {
    const users = db.collection("users");

    return {
        collection: users,
        ObjectId
    };
}

module.exports = createUserModel;