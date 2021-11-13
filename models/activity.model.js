const mongoose = require("mongoose");

const activity = mongoose.model(
    "Activity",
    new mongoose.Schema({
        activity: String,
        first_name: String,
        last_name: String,
        email: String,
        created_at: Date,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        roles: "string"
    })
);

module.exports = activity;