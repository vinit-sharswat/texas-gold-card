const mongoose = require("mongoose");

const otp = mongoose.model(
    "Activity",
    new mongoose.Schema({
        activity: String,
        created_at: Date,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = otp;