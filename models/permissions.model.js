const mongoose = require("mongoose");

const Permissions = mongoose.model(
    "Permissions",
    new mongoose.Schema({
        name: String,
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = Permissions;