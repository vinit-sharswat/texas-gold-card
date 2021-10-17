const mongoose = require("mongoose");

const otp = mongoose.model(
    "OTP",
    new mongoose.Schema({
        otp: String,
        created_at: Date,
        expiration_time: Date,
        validation_type: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = otp;