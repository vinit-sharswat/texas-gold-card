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
        profilePicture: String,
        dob: String,
        address: String,
        city: String,
        state: String,
        zipCode: String,
        emailAuth: Boolean,
        phoneAuth: Boolean,
        referredBy: String,
        numberOfCards: Number,
        groupAffiliations: String,
        typeOfBusiness: String,
        numberOfEmployees: String,
        numberOfLocations: Number,
        roles: String
    })
);

module.exports = User;