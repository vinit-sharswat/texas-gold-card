const mongoose = require("mongoose");

const Permissions = mongoose.model(
    "Permissions",
    new mongoose.Schema({
        name: String
    })
);

module.exports = Permissions;