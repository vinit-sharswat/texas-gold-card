const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.otp = require("./otp.model");
db.staff = require("./staff.model");
db.permissions = require("./permissions.model");
db.activity = require("./activity.model");

db.ROLES = ["user", "admin", "moderator"];
db.PERMISSIONS = [];

module.exports = db;