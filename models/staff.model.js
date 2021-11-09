const mongoose = require("mongoose");

const Staff = mongoose.model(
    "Staff",
    new mongoose.Schema({
        email: String,
        password: String,
        phoneNumber: String,
        firstName: String,
        lastName: String,
        profilePicture: {
            data: Buffer,
            contentType: String
        },
        dob: String,
        address: String,
        city: String,
        state: String,
        zipCode: String,
        emailAuth: Boolean,
        phoneAuth: Boolean,
        permissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Permissions"
            }
        ]
    })
);

module.exports = Staff;