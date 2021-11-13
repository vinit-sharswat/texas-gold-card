const mongoose = require("mongoose");

const permissions = mongoose.model(
    "Permissions",
    new mongoose.Schema({
        activity: String,
        addedAt: Date,
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = permissions;