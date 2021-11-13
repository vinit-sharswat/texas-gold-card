const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.otp = require("./otp.model");
db.activity = require("./activity.model");

module.exports = db;