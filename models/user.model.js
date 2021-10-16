const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        phoneNumber: String,
        fullName: String,
        profilePicture: {
            data: Buffer,
            contentType: String
        },
        dob: String,
        address: String,
        city: String,
        state: String,
        zipCode: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = User;