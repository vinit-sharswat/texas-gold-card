const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        applicationType: String,
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
        referredBy: String,
        numberOfCards: Number,
        groupAffliations: String,
        typeOfBusiness: String,
        numberOfEmployees: String,
        numberOfLocations: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = User;